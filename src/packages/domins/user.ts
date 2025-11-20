import { Role } from '@/modules/user/infrastructure/persistence/relational/entities/role.enum';
import { Exclude, Expose } from 'class-transformer';

export class User {
  user_id: number;
  @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  @Exclude({ toPlainOnly: true })
  password?: string;


  @Expose({ groups: ['me', 'admin'] })
  first_name: string | null;
  last_name: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  role?: Role;

}
