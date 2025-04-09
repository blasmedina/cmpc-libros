import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';

export class CreateLibroDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Nombre del libro',
    example: 'El Codigo Da Vinci',
  })
  readonly titulo: string;

  @IsNumber()
  @Transform(({ value }) =>
    typeof value === 'string' ? parseInt(value, 10) : value,
  )
  @ApiProperty({
    description: 'Precio del libro',
    example: 12345,
  })
  readonly precio: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.toLowerCase() === 'true' : value,
  )
  @ApiProperty({
    description: 'Estado del libro',
    example: true,
  })
  readonly disponible: boolean;

  @IsNumber()
  @Transform(({ value }) =>
    typeof value === 'string' ? parseInt(value, 10) : value,
  )
  @ApiProperty({
    description: 'Identificador del autor del libro',
    example: 1,
  })
  readonly autorId: number;

  @IsNumber()
  @Transform(({ value }) =>
    typeof value === 'string' ? parseInt(value, 10) : value,
  )
  @ApiProperty({
    description: 'Identificador de la editorial del libro',
    example: 1,
  })
  readonly editorialId: number;

  @IsNumber()
  @Transform(({ value }) =>
    typeof value === 'string' ? parseInt(value, 10) : value,
  )
  @ApiProperty({
    description: 'Identificador del genero del libro',
    example: 1,
  })
  readonly generoId: number;

  @IsOptional()
  @IsString()
  imagenUrl: string;

  @IsOptional()
  @ApiProperty({
    description: 'Image Datas',
    format: 'binary',
  })
  imagen?: Express.Multer.File[];
}
