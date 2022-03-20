import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  static getCustomKey(key: string, throwOnMissing = true): string {
    const env = process.env[key];
    if (!env && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return env;
  }
}
