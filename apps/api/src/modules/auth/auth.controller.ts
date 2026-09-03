import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refresh(refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Req() req: any) {
    const user = req.user;
    return this.authService.logout(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: any) {
    return req.user;
  }
}
