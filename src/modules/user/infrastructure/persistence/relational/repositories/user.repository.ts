import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity'
import { NullableType } from '../../../../../../utils/types/nullable.type';
import { User } from '../../../../../../packages/domins';
import { UserRepository } from '../../user.repository';
import { UserMapper } from '../mappers/user.mapper';
import { EntityCondition } from '../../../../../../utils/types/entity-condition.type';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersRelationalRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {}

  async create(data: User): Promise<User> {
    const persistenceModel = UserMapper.toPersistence(data);
    const newEntity = await this.usersRepository.save(
      this.usersRepository.create(persistenceModel)
    );
    return UserMapper.toDomain(newEntity);
  }
  async findOne(fields: EntityCondition<User>): Promise<NullableType<UserEntity>> {
    console.log("fields::",fields)
    const entity = await this.usersRepository.findOne({
      where: fields as FindOptionsWhere<UserEntity>,
    });
    console.log("entity::",entity)
    return plainToInstance(UserEntity,entity )
  }

}
