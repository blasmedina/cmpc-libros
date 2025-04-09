import { Module } from '@nestjs/common';
import { AutorService } from './autor.service';
import { AutorController } from './autor.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Autor } from './entities/autor.entity';

@Module({
  imports: [SequelizeModule.forFeature([Autor])],
  providers: [AutorService],
  controllers: [AutorController]
})
export class AutorModule {}
