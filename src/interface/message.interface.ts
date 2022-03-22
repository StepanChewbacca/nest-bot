import { IUser } from './user.interface';

export interface IMessage {
  message: string;
  chat_id: IUser['chat_id'];
}
