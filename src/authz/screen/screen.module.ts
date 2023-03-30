import { Module } from '@nestjs/common';
import { ScreenService } from './screen.service';
import { ScreenController } from './screen.controller';
import { ScreensEntity } from './screens.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ScreensEntity])],
  providers: [ScreenService],
  controllers: [ScreenController],
})
export class ScreenModule {}
