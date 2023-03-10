import {
  Delete,
  HttpCode,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/auth/decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProductDto } from './createProduct.dto';
import { Productentity } from './product.entity';
import { ProductsService } from './product.services';

@Controller('products')
export class productController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Get()
  async findAll(): Promise<Productentity[]> {
    return this.productsService.findAll();
  }

  //   @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async create(@Body() body: CreateProductDto): Promise<any> {
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
    body: CreateProductDto,
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
