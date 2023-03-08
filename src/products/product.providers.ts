import { DataSource } from 'typeorm';
import { Productentity } from './product.entity';

export const ProductProviders = [
  {
    provide: 'PRODUCT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Productentity),
    inject: ['DATA_SOURCE'],
  },
];
