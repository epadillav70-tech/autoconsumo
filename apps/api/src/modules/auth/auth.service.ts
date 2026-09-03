import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  private getJwtConfig() {
    return {
      secret: this.config.get<string>('JWT_SECRET') || 'changeme',
      expiresIn: this.config.get<string>('JWT_EXPIRATION') || '1h',
    };
  }

  async register(registerDto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: registerDto.email } });
    if (existing) {
      throw new UnauthorizedException('Email already in use');
    }
    const passwordHash = await bcrypt.hash(registerDto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        password: passwordHash,
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
        phoneNumber: registerDto.phoneNumber,
      },
    });

    const tokens = await this.generateTokens(user.id, user.role);
    return { user: { id: user.id, email: user.email }, tokens };
  }

  async validateUser(email: string, plainPassword: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    const valid = await bcrypt.compare(plainPassword, user.password);
    if (!valid) return null;
    const { password, ...rest } = user as any;
    return rest;
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: loginDto.email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const valid = await bcrypt.compare(loginDto.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const tokens = await this.generateTokens(user.id, user.role);
    return { user: { id: user.id, email: user.email }, tokens };
  }

  async generateTokens(userId: string, role: string) {
    const jwtCfg = this.getJwtConfig();
    const accessToken = await this.jwtService.signAsync(
      { sub: userId, role },
      { secret: jwtCfg.secret, expiresIn: jwtCfg.expiresIn },
    );

    const refreshTtl = this.config.get<number>('REFRESH_TOKEN_TTL') || 60 * 60 * 24 * 30; // seconds
    const refreshToken = await this.jwtService.signAsync(
      { sub: userId, type: 'refresh' },
      { secret: jwtCfg.secret, expiresIn: `${refreshTtl}s` },
    );

    const refreshHash = await bcrypt.hash(refreshToken, 10);
    const expiresAt = new Date(Date.now() + refreshTtl * 1000);

    await this.prisma.refreshToken.create({
      data: {
        userId,
        tokenHash: refreshHash,
        expiresAt,
      },
    });

    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    try {
      const jwtCfg = this.getJwtConfig();
      const payload: any = await this.jwtService.verifyAsync(refreshToken, { secret: jwtCfg.secret });
      if (!payload || payload.type !== 'refresh') throw new UnauthorizedException('Invalid token');

      const userId = payload.sub as string;
      const tokens = await this.prisma.refreshToken.findMany({ where: { userId } });
      for (const t of tokens) {
        const match = await bcrypt.compare(refreshToken, t.tokenHash);
        if (match) {
          // delete used refresh token
          await this.prisma.refreshToken.delete({ where: { id: t.id } });
          const newTokens = await this.generateTokens(userId, payload.role || 'CONSUMER');
          return newTokens;
        }
      }
      throw new UnauthorizedException('Refresh token not found');
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string) {
    await this.prisma.refreshToken.deleteMany({ where: { userId } });
    return { ok: true };
  }
}
