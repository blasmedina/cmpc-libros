import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Editorial } from './entities/editorial.entity';

@Injectable()
export class EditorialService {
  constructor(
    @InjectModel(Editorial) private editorialModel: typeof Editorial,
  ) {}

  create(data: Partial<Editorial>) {
    return this.editorialModel.create(data);
  }

  findAll() {
    return this.editorialModel.findAll();
  }

  async findOne(id: number) {
    const editorial = await this.editorialModel.findByPk(id);
    if (!editorial) throw new NotFoundException('Editorial no encontrada');
    return editorial;
  }

  async update(id: number, data: Partial<Editorial>) {
    const editorial = await this.findOne(id);
    return editorial.update(data);
  }

  async remove(id: number) {
    const editorial = await this.findOne(id);
    await editorial.destroy();
    return { message: 'Editorial eliminada' };
  }
}
