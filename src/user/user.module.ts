import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [],
  controllers: [],
})
export class UserModule {}
