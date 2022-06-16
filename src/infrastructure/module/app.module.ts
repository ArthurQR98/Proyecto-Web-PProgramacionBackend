import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '@app/interceptor/http-exception-filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        HOST: Joi.string().required(),
        USERNAME: Joi.string().required(),
        PASSWORD: Joi.string().required(),
        DATABASE: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        PORT: Joi.number(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.number(),
        AWS_REGION: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_PUBLIC_BUCKET_NAME: Joi.string().required(),
      }),
    }),
  ],
  controllers: [],
  providers: [{ provide: APP_FILTER, useClass: HttpExceptionFilter }],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get('PORT');
  }
}
