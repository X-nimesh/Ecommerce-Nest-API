import { typeOrmConfigs } from 'src/config/dbConnection.config';
import { DataSource } from 'typeorm';

export default new DataSource(typeOrmConfigs());
