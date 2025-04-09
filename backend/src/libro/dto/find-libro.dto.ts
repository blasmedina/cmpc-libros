import {
  IsInt,
  IsOptional,
  IsString,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FindLibroDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @ApiProperty({ required: false, description: 'ID del género', type: Number })
  generoId?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @ApiProperty({ required: false, description: 'ID del autor', type: Number })
  autorId?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @ApiProperty({
    required: false,
    description: 'ID de la editorial',
    type: Number,
  })
  editorialId?: number;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @ApiProperty({
    required: false,
    description: 'Disponibilidad del libro',
    type: Boolean,
  })
  disponible?: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    description: 'Texto de búsqueda (por título)',
    type: String,
  })
  search?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @ApiProperty({
    required: false,
    description: 'Número de resultados por página',
    type: Number,
    default: 10,
  })
  limit: number = 10;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @ApiProperty({
    required: false,
    description: 'Paginación: desplazamiento',
    type: Number,
    default: 0,
  })
  offset: number = 0;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    description: 'Campo por el cual ordenar los resultados',
    type: String,
    default: 'titulo',
  })
  orderBy: string = 'titulo';

  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  @ApiProperty({
    required: false,
    description: 'Dirección del orden',
    enum: ['ASC', 'DESC'],
    default: 'ASC',
  })
  orderDirection: 'ASC' | 'DESC' = 'ASC';
}
