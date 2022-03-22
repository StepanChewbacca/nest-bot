import { IUser } from './user.interface';

export interface ICreateUser {
  chat_id: IUser['chat_id'];
  user_id: IUser['user_id'];
  username?: IUser['username'];
}
