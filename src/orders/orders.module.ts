import { Module } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';

@Module({
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
