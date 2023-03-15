import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Productentity } from 'src/products/product.entity';
import { EntityManager, Repository } from 'typeorm';
import { OrderItemsEntity } from '../models/orderitems.entity';
import { OrdersEntity } from '../models/orders.entity';
import { orderDto } from '../orders.dto';
import dataSource from 'typeOrm.config';

@Injectable()
// export class OrderRepo extends Repository<OrdersEntity> {
export class OrderRepo {
  //   constructor(private dataSource: DataSource) {
  //     super(OrdersEntity, dataSource.createEntityManager());
  //   }
  constructor(
    @InjectRepository(OrdersEntity)
    private readonly orders: Repository<OrdersEntity>,
    @InjectRepository(OrderItemsEntity)
    private readonly orderItems: Repository<OrderItemsEntity>,
    @InjectRepository(Productentity)
    private readonly productsEntity: Repository<Productentity>,
  ) {}

  private readonly entityManager: EntityManager;

  async findAll(): Promise<OrdersEntity[]> {
    const allOrders = await this.orders.query(`SELECT * FROM orders`);

    return allOrders;
  }
  async findoneOrder(id: number): Promise<any> {
    return this.orders.findOne({ where: { id: id } });
  }
  async getItemPrice() {
    // return this.productsEntity.findOne({ where: { productId: id } });
    return this.productsEntity.find();
  }
  async createOrder(order: orderDto, item: any): Promise<any> {
    const entityManager = dataSource.createEntityManager();
    await entityManager.transaction(async (transactionalEntityManager) => {
      const orderDetails = new OrdersEntity();
      orderDetails.qty = order.qty;
      orderDetails.price = order.price;
      orderDetails.status = order.status;
      orderDetails.createdAt = order.createdAt;
      orderDetails.updatedAt = order.updatedAt;

      await transactionalEntityManager.save(orderDetails);

      //   const orderDetails = transactionalEntityManager.create(
      //     OrdersEntity,
      //     order,
      //   );
      //   console.log('orderDetails', orderDetails);
      //   await transactionalEntityManager.save(orderDetails);
      // const orderItems = transactionalEntityManager.create(OrderItemsEntity, {
      //   productId: item.productId,
      //   qty: item.qty,
      //   price: item.price,
      //   createdAt: item.createdAt,
      //   updatedAt: item.updatedAt,
      // });
      // await transactionalEntityManager.save(orderItems);
    });
    // await EntityManager.transaction(async (transactionalEntityManager) => {
    //   transactionalEntityManager.save(order);
    // });

    // return this.orders.save(order);
  }
}
