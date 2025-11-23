import {
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from '../../packages/dto/user';
import { UserRepository } from './infrastructure/persistence/user.repository';
import { User } from '../../packages/domins'
import { NullableType } from '@/utils/types/nullable.type';
import { EntityCondition } from '@/utils/types/entity-condition.type';
import { Role } from './infrastructure/persistence/relational/entities/role.enum';
import { UserEntity } from './infrastructure/persistence/relational/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository) {}

  async create(createProfileDto: CreateUserDto): Promise<User> {
    const clonedPayload = {
      provider: createProfileDto.email,
      ...createProfileDto,
    };
    if (clonedPayload.password) {
      clonedPayload.password = clonedPayload.password
    }

    if (clonedPayload.email) {
      const userObject = await this.usersRepository.findOne({
        email: clonedPayload.email,
      });
      if (userObject) {

        return  userObject
      }
    }

    return this.usersRepository.create(clonedPayload);
  }
  findOne(fields: EntityCondition<User>): Promise<NullableType<UserEntity>> {
    return this.usersRepository.findOne(fields);
  }


  async isAdmin(userId: number ,) {
    const u = await this.usersRepository.findOne( {user_id: userId});
    return u?.role === Role.ADMIN;
    }
    
    
    async findByIds(ids: Array<number | string>,role:any): Promise<UserEntity[]> {
      if (!ids || !Array.isArray(ids) || ids.length === 0) return [];
        const normalized = Array.from(
        new Set(
          ids
            .map((i) => Number(i))
            .filter((n) => Number.isFinite(n) && n > 0),
        ),
      );
  
      if (normalized.length === 0) return [];
  
      const users = await this.usersRepository.findByIds(normalized , role);
  
      return users;
    }
  
   
}
