import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Libro } from './entities/libro.entity';
import { Op } from 'sequelize';
import { FindLibroDto } from './dto/find-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';

@Injectable()
export class LibroService {
  constructor(
    @InjectModel(Libro)
    private libroModel: typeof Libro,
  ) {}

  async create(data: Partial<Libro>) {
    const libro = await this.libroModel.create(data);
    const libroRehydrate = await this.findOne(libro.id);
    return libroRehydrate;
  }

  async findAll(query: FindLibroDto, includeDeleted = false) {
    const {
      generoId,
      autorId,
      editorialId,
      disponible,
      search,
      limit = 10,
      offset = 0,
      orderBy = 'titulo',
      orderDirection = 'ASC',
    } = query;

    const where: any = {};

    if (generoId) where.generoId = generoId;
    if (autorId) where.autorId = autorId;
    if (editorialId) where.editorialId = editorialId;
    if (disponible !== undefined) where.disponible = disponible === true;
    if (search) where.titulo = { [Op.iLike]: `%${search}%` };

    return this.libroModel.findAndCountAll({
      where,
      include: [
        { all: true }, // Incluye Autor, Editorial, Género
      ],
      order: [[orderBy, orderDirection.toUpperCase()]],
      limit: +limit,
      offset: +offset,
      paranoid: !includeDeleted,
    });
  }

  async findOne(id: number) {
    const libro = await this.libroModel.findByPk(id, {
      include: { all: true },
    });
    if (!libro) throw new NotFoundException('Libro no encontrado');
    return libro;
  }

  async update(id: number, updateLibroDto: UpdateLibroDto) {
    const libro = await this.findOne(id);
    return libro.update(updateLibroDto as any);
  }

  async remove(id: number) {
    const libro = await this.findOne(id);
    await libro.destroy();
    return { message: 'Libro eliminado' };
  }

  async softDelete(id: number) {
    const libro = await this.libroModel.findByPk(id);
    if (!libro) {
      throw new Error('Libro no encontrado');
    }

    await libro.destroy();
  }
}
