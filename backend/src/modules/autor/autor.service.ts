import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Autor } from './entities/autor.entity';

@Injectable()
export class AutorService {
  constructor(@InjectModel(Autor) private autorModel: typeof Autor) {}

  create(data: Partial<Autor>) {
    return this.autorModel.create(data);
  }

  findAll() {
    return this.autorModel.findAll();
  }

  async findOne(id: number) {
    const autor = await this.autorModel.findByPk(id);
    if (!autor) throw new NotFoundException('Autor no encontrado');
    return autor;
  }

  async update(id: number, data: Partial<Autor>) {
    const autor = await this.findOne(id);
    return autor.update(data);
  }

  async remove(id: number) {
    const autor = await this.findOne(id);
    await autor.destroy();
    return { message: 'Autor eliminado' };
  }
}
