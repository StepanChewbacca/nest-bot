import { IUser } from './user.interface';

export interface IMessage {
  message: string;
  user_id: IUser['user_id'];
}
