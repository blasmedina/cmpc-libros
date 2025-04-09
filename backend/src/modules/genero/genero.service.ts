import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Genero } from './entities/genero.entity';

@Injectable()
export class GeneroService {
  constructor(@InjectModel(Genero) private generoModel: typeof Genero) {}

  create(data: Partial<Genero>) {
    return this.generoModel.create(data);
  }

  findAll() {
    return this.generoModel.findAll();
  }

  async findOne(id: number) {
    const genero = await this.generoModel.findByPk(id);
    if (!genero) throw new NotFoundException('Genero no encontrado');
    return genero;
  }

  async update(id: number, data: Partial<Genero>) {
    const genero = await this.findOne(id);
    return genero.update(data);
  }

  async remove(id: number) {
    const genero = await this.findOne(id);
    await genero.destroy();
    return { message: 'Genero eliminado' };
  }
}
