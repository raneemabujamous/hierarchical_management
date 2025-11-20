import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Get
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { UsersService } from './user.service';

import {
  CreateUserDto,
  UpdateUserDto,
} from '@/packages/dto/user';
import { User } from '@/packages/domins';
import { UserEntity } from './infrastructure/persistence/relational/entities/user.entity';

@ApiBearerAuth()
@ApiTags('Users')
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly usersService: UsersService,
  ) {}

  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // create(@Body() createProfileDto: CreateUserDto): Promise<User> {
  //   return this.usersService.create(createProfileDto);

  // }

 @Get(':user_id')
  @ApiParam({
    name: 'user_id',
    type: Number,
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  async get(
    @Param('user_id') user_id: number,

  ): Promise<UserEntity> {
    let data = await this.usersService.findOne({user_id:user_id});
    return data;
  }
}
