import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { Libro } from '../../libro/entities/libro.entity';

@Table
export class Genero extends Model {
  @Column
  nombre: string;

  @HasMany(() => Libro)
  libros: Libro[];
}
