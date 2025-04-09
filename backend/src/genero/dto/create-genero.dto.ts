import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGeneroDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Nombre del genero',
    example: 'Ficción especulativa',
  })
  nombre: string;
}
