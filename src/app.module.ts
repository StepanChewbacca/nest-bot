import { Module } from '@nestjs/common';
import { TelegramProvider } from './telegram-bot/telegram-bot.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigService } from './config/config.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserModule } from './user/user.module';
import { UserRepository } from './user/user.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegrafModule.forRoot({
      token: ConfigService.getCustomKey('TELEGRAM_BOT_TOKEN'),
    }),
    MongooseModule.forRoot(ConfigService.getCustomKey('MONGODB_LINK'), {
      autoIndex: true,
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
  ],
  controllers: [],
  providers: [TelegramProvider, UserRepository],
})
export class AppModule {}
