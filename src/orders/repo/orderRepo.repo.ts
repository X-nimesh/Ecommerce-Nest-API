import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { OrdersEntity } from '../models/orders.entity';

@Injectable()
export class OrderRepo extends Repository<OrdersEntity> {
  constructor(private dataSource: DataSource) {
    super(OrdersEntity, dataSource.createEntityManager());
  }
  async findoneOrder(id: number): Promise<any> {
    // console.log('id: ', id);
    return this.findOne({ where: { id: id } });
  }
}
