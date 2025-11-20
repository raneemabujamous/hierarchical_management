import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  Post,
  UseGuards,
  Patch,
  Delete,
  SerializeOptions,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthEmailLoginDto } from '@/packages/dto/auth/auth-email-login.dto';
import { AuthRegisterDto } from '@/packages/dto/auth/auth-register-login.dto';
import { LoginResponseType } from './types/login-response.type';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../../packages/dto/user';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly service: AuthService) {}


  
  
  @Post('email/login')
  @HttpCode(HttpStatus.OK)
  public login(
    @Body() loginDto: AuthEmailLoginDto
  ): Promise<LoginResponseType> {


    return this.service.login(loginDto);
  }



  @Post('email/register')
  @HttpCode(HttpStatus.OK)
  async register(
    @Body() createProfileDto: CreateUserDto


  ): Promise<any> {
   
    let data = this.service.register(createProfileDto
    );
    return data
  }




}
