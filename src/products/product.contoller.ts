import {
  Delete,
  HttpCode,
  Param,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/auth/decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/authorization/role.enum';
import { Roles } from 'src/decorator/roles.decorators';
import { CreateProductDto } from './createProduct.dto';
import { Productentity } from './product.entity';
import { ProductsService } from './product.services';
import { RolesGuard } from 'src/auth/authorization/roles.guard';

@Controller('products')
export class productController {
  constructor(private readonly productsService: ProductsService) {}

  //   @Public()
  @Get()
  @Roles(Role.Admin, Role.User)
  async findAll(
    @Req() req,
  ): Promise<{ data: Productentity[]; message: string }> {
    req.customMessage = 'Found all Products';
    return this.productsService.findAll();
  }
  //   @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async create(@Req() req, @Body() body: CreateProductDto): Promise<any> {
    req.customMessage = 'Product created successfully';
    return this.productsService.create(
      body.name,
      body.decs,
      body.price,
      body.qty,
    );
  }
  @Post('update/:id')
  async update(
    @Req() req,
    @Param() params,
    @Body()
    body: CreateProductDto,
  ): Promise<any> {
    req.customMessage = 'Product updated successfully';
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
