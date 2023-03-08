import { Delete, Param } from '@nestjs/common';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Productentity } from './product.entity';
import { ProductsService } from './product.services';

@Controller('products')
export class productController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  async findAll(): Promise<Productentity[]> {
    return this.productsService.findAll();
  }
  @Post()
  async create(
    @Body() body: { name: string; decs: string; price: number; qty: number },
  ): Promise<any> {
    // return this.productsService.create();
    return this.productsService.create(
      body.name,
      body.decs,
      body.price,
      body.qty,
    );
  }
  @Post('update/:id')
  async update(
    @Param() params,
    @Body()
    body: {
      name: string;
      decs: string;
      price: number;
      qty: number;
    },
  ): Promise<any> {
    return this.productsService.update(
      params.id,
      body.name,
      body.decs,
      body.qty,
      body.price,
    );
  }
  @Delete('delete/:id')
  async delete(@Param() params): Promise<any> {
    return this.productsService.delete(params.id);
  }
  @Get(':id')
  async findProductById(@Param() params): Promise<Productentity> {
    return this.productsService.findProductById(params.id);
  }
}
