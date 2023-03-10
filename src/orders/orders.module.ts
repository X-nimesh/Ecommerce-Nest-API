import { Module } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersEntity } from './models/orders.entity';
import { OrderRepo } from './repo/orderRepo.repo';

@Module({
  imports: [TypeOrmModule.forFeature([OrdersEntity])],
  providers: [OrdersService, OrderRepo],
  controllers: [OrdersController],
})
export class OrdersModule {}
