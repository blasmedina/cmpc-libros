import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GeneroService } from './genero.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';

@Controller('generos')
@ApiTags('Generos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class GeneroController {
  constructor(private readonly generoService: GeneroService) {}

  @Post()
  create(@Body() createGeneroDto: CreateGeneroDto) {
    return this.generoService.create(createGeneroDto);
  }

  @Get()
  findAll() {
    return this.generoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generoService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateGeneroDto: UpdateGeneroDto) {
    return this.generoService.update(+id, updateGeneroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.generoService.remove(+id);
  }
}
