import { Module } from '@nestjs/common';
import { ScreenService } from './screen.service';
import { ScreenController } from './screen.controller';
import { ScreensEntity } from './screens.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleEntity } from '../modules/module.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScreensEntity, ModuleEntity])],
  providers: [ScreenService],
  controllers: [ScreenController],
  exports: [ScreenService],
})
export class ScreenModule {}
