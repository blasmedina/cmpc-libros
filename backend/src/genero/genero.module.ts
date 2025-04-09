import { Module } from '@nestjs/common';
import { GeneroService } from './genero.service';
import { GeneroController } from './genero.controller';
import { Genero } from './entities/genero.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Genero])],
  providers: [GeneroService],
  controllers: [GeneroController]
})
export class GeneroModule {}
