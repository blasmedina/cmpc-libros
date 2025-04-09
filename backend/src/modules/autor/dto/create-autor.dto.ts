import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAutorDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Nombre del autor',
    example: 'Dan Brown',
  })
  nombre: string;
}
