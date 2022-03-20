import { IsInt, IsNotEmpty } from 'class-validator';
import { IDeleteUser } from '../interface/detele-user.interface';

export class DeleteUserDto implements IDeleteUser {
  @IsInt()
  @IsNotEmpty()
  user_id: number;
}
