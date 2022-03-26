import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/module/app.module';
import * as compression from 'compression';
import helmet from 'helmet';
import { config } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { ExcludeNullInterceptor } from '@libs/common/excludeNull.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  config.update({
    accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    region: configService.get('AWS_REGION'),
  });
  app.use(compression);
  app.use(helmet);
  app.enableCors();
  app.useGlobalInterceptors(new ExcludeNullInterceptor());
  app.setGlobalPrefix('v1/api');
  await app.listen(AppModule.port);
}
bootstrap();
