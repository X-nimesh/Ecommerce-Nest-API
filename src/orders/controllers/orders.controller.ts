import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ordersDto } from 'src/orders/orders.dto';
import { Productentity } from 'src/products/product.entity';
import { OrdersEntity } from '../models/orders.entity';
import { OrdersService } from '../services/orders.service';
@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}
  @Get()
  async getAll(): Promise<OrdersEntity[]> {
    return await this.orderService.findAll();
  }

  @Post()
  async createOrder(
    @Body() body: ordersDto,
    @Request() req: any,
  ): Promise<any> {
    return await this.orderService.createOrderService(req.user.userId, body);
  }
}
