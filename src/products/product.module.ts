import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database.module';
import { productController } from './product.contoller';
import { Productentity } from './product.entity';
import { ProductProviders } from './product.providers';
import { ProductsService } from './product.services';

@Module({
  imports: [TypeOrmModule.forFeature([Productentity])],
  providers: [...ProductProviders, ProductsService],
  controllers: [productController],
})
export class ProductModule {}
