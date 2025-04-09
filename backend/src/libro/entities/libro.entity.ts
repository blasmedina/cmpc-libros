import {
    Column,
    Model,
    Table,
    DataType,
    ForeignKey,
    BelongsTo,
    DeletedAt,
  } from 'sequelize-typescript';
  import { Autor } from '../../autor/entities/autor.entity';
  import { Editorial } from '../../editorial/entities/editorial.entity';
  import { Genero } from '../../genero/entities/genero.entity';
  
  @Table
  export class Libro extends Model {
    @Column({ type: DataType.STRING, allowNull: false })
    titulo: string;
  
    @Column({ type: DataType.FLOAT, allowNull: false })
    precio: number;
  
    @Column({ type: DataType.BOOLEAN, defaultValue: true })
    disponible: boolean;
  
    @Column({ type: DataType.STRING })
    imagen: string;
  
    @ForeignKey(() => Autor)
    @Column
    autorId: number;
  
    @BelongsTo(() => Autor)
    autor: Autor;
  
    @ForeignKey(() => Editorial)
    @Column
    editorialId: number;
  
    @BelongsTo(() => Editorial)
    editorial: Editorial;
  
    @ForeignKey(() => Genero)
    @Column
    generoId: number;
  
    @BelongsTo(() => Genero)
    genero: Genero;

    @DeletedAt
    @Column({
      type: DataType.DATE,
      allowNull: true,
    })
    deletedAt: Date;
  }
  