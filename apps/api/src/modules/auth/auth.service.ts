import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(registerDto: RegisterDto) {
    // TODO: Hash password with bcrypt
    // TODO: Create user in database
    // TODO: Generate JWT token
    return {
      message: 'User registered successfully',
      user: null,
      token: null,
    };
  }

  async login(loginDto: LoginDto) {
    // TODO: Find user by email
    // TODO: Verify password
    // TODO: Generate JWT token
    return {
      message: 'User logged in successfully',
      user: null,
      token: null,
    };
  }

  async refresh(refreshToken: string) {
    // TODO: Verify refresh token
    // TODO: Generate new access token
    return {
      token: null,
    };
  }

  async logout() {
    // TODO: Invalidate token if needed
    return {
      message: 'User logged out successfully',
    };
  }
}
