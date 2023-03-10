import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Repository } from 'typeorm';
import { OrderItemsEntity } from '../models/orderitems.entity';
import { OrdersEntity } from '../models/orders.entity';
import { ordersDto } from '../orders.dto';
import { OrderRepo } from '../repo/orderRepo.repo';

@Injectable()
export class OrdersService {
  constructor(private orderRepo: OrderRepo) {}

  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<OrdersEntity[]> {
    return this.orderRepo.find();
  }

  async createOrderService(userId: number, orderItem: ordersDto): Promise<any> {
    // console.log('userId: ', userId);
    // console.log('orderItem: ', orderItem);
    const id = await this.orderRepo.findoneOrder(userId);
    console.log(id);
    // return this.orderRepo.save(order);
  }
}
