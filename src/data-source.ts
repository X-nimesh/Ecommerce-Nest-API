import { DataSource } from 'typeorm';
import { Productentity } from './products/product.entity';
import { Userentity } from './user/user.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'NewDemoDB',
        entities: [Productentity, Userentity],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
