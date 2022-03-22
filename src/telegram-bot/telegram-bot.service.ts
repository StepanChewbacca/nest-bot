import { Injectable, UseFilters } from '@nestjs/common';
import {
  Ctx, Hears, On, Start, Update,
} from 'nestjs-telegraf';
import { TelegramExceptionsFilter } from '../filters/telegram-exception.filter';
import { IContext } from '../interface/context-telegram.interface';
import { UserRepository } from '../user/user.repository';

@Injectable()
@Update()
@UseFilters(TelegramExceptionsFilter)
export class TelegramProvider {
  constructor(private userRepository: UserRepository) {}

  @Start()
  async createUser(@Ctx() ctx: IContext): Promise<void> {
    const user = {
      user_id: ctx.update.message.from.id,
      username: ctx.update.message.from.username,
      chat_id: ctx.update.message.chat.id,
    };

    await this.userRepository.createUser(user);

    const { username } = ctx.update.message.from;

    if (username) {
      await ctx.reply(`Hello ${username}`);
    } else {
      await ctx.reply('Hello my friend');
    }
  }

  @Hears('Слава Україні')
  async sayGloryUkraine(@Ctx() ctx: IContext): Promise<void> {
    await ctx.reply('Героям Слава');
  }

  @On('text')
  async getHello(@Ctx() ctx: IContext): Promise<void> {
    const { username } = ctx.update.message.from;

    if (username) {
      await ctx.reply(`Hello ${username}`);
    } else {
      await ctx.reply('Hello my friend');
    }
  }
}
