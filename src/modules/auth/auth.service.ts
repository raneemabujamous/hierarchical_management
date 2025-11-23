import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthEmailLoginDto } from '@/packages/dto/auth/auth-email-login.dto';
import { CreateUserDto } from '../../packages/dto/user';
import { UsersService } from '../user/user.service';
import { LoginResponseType } from './types/login-response.type';
import * as bcrypt from 'bcrypt';
import { Role } from '../user/infrastructure/persistence/relational/entities/role.enum';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto): Promise<any> {
    const email = dto.email.trim().toLowerCase();
    const password = dto.password.trim();

    const existingUser = await this.usersService.findOne({ email });
    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("::::",dto)
    const role = dto.role?.trim().toLowerCase() as Role || Role.EMPLOYEE;
console.log("role:",role)
    const newUser = await this.usersService.create({
      ...dto,
      email,
      password: hashedPassword,
      role
    });

    return newUser;
  }

  async login(loginDto: AuthEmailLoginDto): Promise<LoginResponseType> {
    const email = loginDto.email.trim().toLowerCase();
    const password = loginDto.password.trim();

    const user = await this.usersService.findOne({ email });
    if (!user || !user.password) {
      throw new UnauthorizedException('User not found');
    }
console.log("password, user.password",password, user.password)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { user_id: user.user_id, email: user.email,role: user.role };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
    });

    return {
      token,
      refreshToken: null,
      tokenExpires: null,
      user,
    };
  }


  
}
