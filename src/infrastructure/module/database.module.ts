import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('USERNAME'),
        password: configService.get('PASSWORD'),
        database: configService.get('DATABASE'),
        // entities: [
        //   __dirname +
        //     'infrastructure/persistence/typeorm/entity/*.entity{.ts,.js}',
        // ],
        autoLoadEntities: true,
        //synchronize: true, // mode develop [The problem with this is that data is lost, so it is only for development. Do not use in production ]
      }),
    }),
  ],
})
export class DatabaseModule {}
