import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEditorialDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Nombre de la editorial',
    example: 'Editorial Planeta Chile',
  })
  nombre: string;
}
