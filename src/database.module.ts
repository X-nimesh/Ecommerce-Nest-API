import { Module } from '@nestjs/common';
import { databaseProviders } from './data-source';
@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
