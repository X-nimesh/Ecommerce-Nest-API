import { Module } from '@nestjs/common';
import { DecorService } from './services/decor.service';
import { DecorController } from './controllers/decor.controller';

@Module({
  providers: [DecorService],
  controllers: [DecorController]
})
export class CustomDecoratorModule {}
