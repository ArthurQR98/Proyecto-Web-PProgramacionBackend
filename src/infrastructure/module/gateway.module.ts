import { SocketGateway } from '@app/gateways/socket.gateway';
import { PrismaModule } from '@infrastructure/prisma/prisma.module';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  providers: [SocketGateway, PrismaService],
  controllers: [],
  exports: [],
})
export class GatewayModule {}
