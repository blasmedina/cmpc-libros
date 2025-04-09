import { Column, Model, Table, HasMany, DataType } from 'sequelize-typescript';
import { Libro } from '../../libro/entities/libro.entity';

@Table
export class Editorial extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nombre: string;

  @HasMany(() => Libro)
  libros: Libro[];
}
