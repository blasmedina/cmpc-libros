import { Module } from '@nestjs/common';
import { LibroService } from './libro.service';
import { LibroController } from './libro.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Libro } from './entities/libro.entity';

@Module({
  imports: [SequelizeModule.forFeature([Libro])],
  providers: [LibroService],
  controllers: [LibroController],
})
export class LibroModule {}
