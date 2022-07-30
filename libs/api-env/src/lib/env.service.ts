import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { env } from './env.schema';

/**
 * This service adds type-safety to accessing of environment variables
 */
@Injectable()
export class EnvService {
  constructor(private configService: ConfigService) {}
  get(path: keyof typeof env) {
    const value = this.configService.get(path);

    if (!value)
      throw Error(
        'EnvService - tried to access env key ' +
          path +
          ' but it is not in the environment.',
      );

    return value;
  }
}
