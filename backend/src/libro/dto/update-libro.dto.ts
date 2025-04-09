// update-libro.dto.ts

import { IsString, IsDateString, IsOptional } from 'class-validator';

export class UpdateLibroDto {
  @IsOptional()
  @IsString()
  readonly titulo?: string;

  @IsOptional()
  @IsString()
  readonly autor?: string;

  @IsOptional()
  @IsDateString()
  readonly fecha_publicacion?: string;

  @IsOptional()
  @IsString()
  readonly genero?: string;
}
