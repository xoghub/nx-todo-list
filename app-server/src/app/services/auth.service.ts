import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../model/user.model';
import { Session } from '../model/session.model';
import { LoginDto, RegisterDto, AuthResponseDto } from '@nx-todo-list/shared';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const { email, password, fullName } = registerDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      fullName,
      userCode,
      is_verified: false, // User needs to verify email
    });

    return this.userRepository.save(user);
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    // Save session
    const session = this.sessionRepository.create({
      idUser: user.id,
      accessToken,
      refreshToken,
    });
    await this.sessionRepository.save(session);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        userCode: user.userCode,
      },
    };
  }

  async logout(userId: number, accessToken: string): Promise<void> {
    await this.sessionRepository.delete({ idUser: userId, accessToken });
  }

  async verifyEmail(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      user.is_verified = true;
      await this.userRepository.save(user);
    }
  }
}
