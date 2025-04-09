import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { LibroService } from './libro.service';
import { Query } from '@nestjs/common';
import { FindLibroDto } from './dto/find-libro.dto';
import {
  ApiTags,
  ApiQuery,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import * as path from 'path';
import * as crypto from 'crypto';
import { diskStorage } from 'multer';

@Controller('libros')
@ApiTags('Libros')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class LibroController {
  constructor(private readonly libroService: LibroService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Datos del libro y la imagen',
    type: CreateLibroDto,
  })
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const fileExtension = path.extname(file.originalname);
          const filename = `${crypto.randomBytes(16).toString('hex')}${fileExtension}`;

          callback(null, filename);
        },
      }),
    }),
  )
  create(
    @Body() createLibroDto: CreateLibroDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      const imageUrl = `/uploads/${file.filename}`;
      createLibroDto.imagenUrl = imageUrl;
    }

    return this.libroService.create(createLibroDto);
  }

  @Get()
  @ApiQuery({
    name: 'generoId',
    required: false,
    description: 'ID del género',
    type: Number,
  })
  @ApiQuery({
    name: 'autorId',
    required: false,
    description: 'ID del autor',
    type: Number,
  })
  @ApiQuery({
    name: 'editorialId',
    required: false,
    description: 'ID de la editorial',
    type: Number,
  })
  @ApiQuery({
    name: 'disponible',
    required: false,
    description: 'Disponibilidad del libro',
    type: Boolean,
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Texto de búsqueda por título',
    type: String,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Número de resultados por página',
    type: Number,
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    description: 'Desplazamiento (paginación)',
    type: Number,
  })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    description: 'Campo de ordenación',
    type: String,
  })
  @ApiQuery({
    name: 'orderDirection',
    required: false,
    description: 'Dirección de ordenación',
    enum: ['ASC', 'DESC'],
  })
  findAll(@Query() query: FindLibroDto) {
    return this.libroService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.libroService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateLibroDto: UpdateLibroDto) {
    return this.libroService.update(+id, updateLibroDto);
  }

  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.libroService.softDelete(+id);
  }
}
