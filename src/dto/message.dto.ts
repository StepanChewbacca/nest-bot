import {
  IsNotEmpty, IsNumber, IsString,
} from 'class-validator';
import { IMessage } from '../interface/message.interface';

export class MessageDto implements IMessage {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsNumber()
  @IsNotEmpty()
  chat_id: number;
}
