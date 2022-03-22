import { IsNotEmpty, IsNumberString } from 'class-validator';
import { IDeleteUser } from '../interface/detele-user.interface';

export class DeleteUserDto implements IDeleteUser {
  @IsNumberString()
  @IsNotEmpty()
  user_id: number;
}
