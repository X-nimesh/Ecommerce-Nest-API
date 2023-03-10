import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { productController } from './product.contoller';
import { Productentity } from './product.entity';
import { ProductsService } from './product.services';

@Module({
  imports: [TypeOrmModule.forFeature([Productentity])],
  providers: [ProductsService],
  controllers: [productController],
})
export class ProductModule {}
