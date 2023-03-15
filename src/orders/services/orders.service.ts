import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { transaction } from 'src/decorator/transaction.decorator';
import { Repository } from 'typeorm';
import { OrderItemsEntity } from '../models/orderitems.entity';
import { OrdersEntity } from '../models/orders.entity';
import { orderDto, ordersDto } from '../orders.dto';
import { OrderRepo } from '../repo/orderRepo.repo';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRepo: OrderRepo) {}

  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<OrdersEntity[]> {
    return this.orderRepo.findAll();
  }
  filterItems = (items: any) => {
    const filteredItems = [];
    items.forEach((element) => {
      const item = filteredItems.find(
        (item) => item.productId === element.productId,
      );
      if (item) {
        item.quantity += element.quantity;
      } else {
        filteredItems.push(element);
      }
    });
    return filteredItems;
  };
  priceCheck = async (item: any) => {
    const products = await this.orderRepo.getItemPrice();
    item.forEach((prod) => {
      const price = products.find(
        (product) => product.productId === prod.productId,
      );
      if (price) {
        prod.price = price.price;
      }
    });
    return item;
  };
  //   @transaction()
  async createOrderService(userId: number, orderItem: ordersDto): Promise<any> {
    const orderDetails: orderDto = {
      qty: 0,
      price: 0,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),

      userId: userId,
    };
    const products = this.filterItems(orderItem.products);
    const updatedProduct = await this.priceCheck([...products]);
    // add total qty n price
    updatedProduct.forEach((element) => {
      orderDetails.qty += element.quantity;
      orderDetails.price += element.price * element.quantity;
    });

    // const order = await this.orderRepo.createOrder(
    //   orderDetails,
    //   updatedProduct,
    // );

    return {
      details: orderDetails,
      items: products,
    };
  }
}
