import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Productentity } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Productentity)
    private readonly productRepo: Repository<Productentity>,
  ) {}
  async findAll(): Promise<Productentity[]> {
    console.log('this.productRepo.find()', this.productRepo.find());
    return this.productRepo.find();
  }
  async create(
    name: string,
    decs: string,
    price: number,
    qty: number,
  ): Promise<{ productId: number }> {
    const product = { name, decs, price, qty };

    // find all products
    const products = await this.productRepo.find();

    // check if product already exists
    products.forEach((element) => {
      if (element.name == name) {
        throw new BadRequestException('Product already exists', {
          cause: new Error(),
          description: `Product with name:${name} already exists`,
        });
      }
    });
    const res = (await this.productRepo.save(product)).productId;
    return { productId: res };
  }

  async update(
    productId: number,
    name: string,
    decs: string,
    qty: number,
    price: number,
  ): Promise<{ productId: number; message: string }> {
    // check if product exists
    const product = await this.findProductById(productId);
    if (!product) {
      throw new NotFoundException('Product not found', {
        cause: new Error(),
        description: `Product with id:${productId} not found`,
      });
    }

    // check if productname already exists
    const products = await this.productRepo.find();

    products.forEach((element) => {
      if (element.name == name) {
        throw new BadRequestException('Product already exists', {
          cause: new Error(),
          description: `Product with name:${name} already exists`,
        });
      }
    });
    await this.productRepo.update(productId, { name, decs, qty, price });
    return { productId: productId, message: 'updated successfully' };
  }

  async delete(
    productId: number,
  ): Promise<{ productId: number; message: string }> {
    const deleted = (await this.productRepo.delete(productId)).affected;
    if (!deleted) {
      throw new NotFoundException('Product not found', {
        cause: new Error(),
        description: `Product with id:${productId} not found`,
      });
    }
    return { productId: productId, message: 'deleted successfully' };
  }
  async findProductById(productId: number): Promise<Productentity> {
    const product = await this.productRepo.findOne({ where: { productId } });
    if (!product) {
      throw new NotFoundException('Product not found', {
        cause: new Error(),
        description: `Product with id:${productId} not found`,
      });
    }
    return product;
  }
}
