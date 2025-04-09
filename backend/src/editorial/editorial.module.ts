import { Module } from '@nestjs/common';
import { EditorialService } from './editorial.service';
import { EditorialController } from './editorial.controller';
import { Editorial } from './entities/editorial.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Editorial])],
  providers: [EditorialService],
  controllers: [EditorialController]
})
export class EditorialModule {}
