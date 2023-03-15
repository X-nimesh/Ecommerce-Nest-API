import { Module } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersEntity } from './models/orders.entity';
import { OrderRepo } from './repo/orderRepo.repo';
import { OrderItemsEntity } from './models/orderitems.entity';
import { Productentity } from 'src/products/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdersEntity, OrderItemsEntity, Productentity]),
  ],
  providers: [OrdersService, OrderRepo],
  controllers: [OrdersController],
})
export class OrdersModule {}
