import { Injectable, UseFilters } from '@nestjs/common';
import { Ctx, Hears, On, Start, Update } from 'nestjs-telegraf';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { TelegramExceptionsFilter } from '../filters/telegram-exception.filter';
import { IContext } from '../interface/context-telegram.interface';

@Injectable()
@Update()
@UseFilters(TelegramExceptionsFilter)
export class TelegramProvider {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  @Start()
  async createUser(@Ctx() ctx: IContext) {
    const user = {
      user_id: ctx.update.message.from.id,
      username: ctx.update.message.from.username,
      chat_id: ctx.update.message.chat.id,
    };

    const createdUser = new this.userModel(user);
    await createdUser.save();

    const username = ctx.update.message.from.username;
    if (username) {
      await ctx.reply(`Hello ${username}`);
    } else {
      await ctx.reply(`Hello my friend`);
    }
  }

  @Hears('Слава Україні')
  async sayGloryUkraine(@Ctx() ctx: IContext) {
    await ctx.reply(`Героям Слава`);
  }

  @On('text')
  async getHello(@Ctx() ctx: IContext) {
    const username = ctx.update.message.from.username;

    if (username) {
      await ctx.reply(`Hello ${username}`);
    } else {
      await ctx.reply(`Hello my friend`);
    }
  }
}
