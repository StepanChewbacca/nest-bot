import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IUser } from '../interface/user.interface';

export type UserDocument = User & Document;

@Schema({ versionKey: false })
export class User implements IUser {
  @Prop({ required: true, unique: true, type: Number })
  user_id: number;

  @Prop({ default: null, type: String })
  username: string;

  @Prop({ default: Date.now(), type: Date })
  start_at: Date;

  @Prop({ required: true, unique: true, type: Number })
  chat_id: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
