import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { IMessage } from '../interface/message.interface';

export class MessageDto implements IMessage {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsInt()
  @IsNotEmpty()
  user_id: number;
}
