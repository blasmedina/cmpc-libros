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
import { EditorialService } from './editorial.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateEditorialDto } from './dto/create-editorial.dto';
import { UpdateEditorialDto } from './dto/update-editorial.dto';

@Controller('editoriales')
@ApiTags('Editoriales')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class EditorialController {
  constructor(private readonly editorialService: EditorialService) {}

  @Post()
  create(@Body() createEditorialDto: CreateEditorialDto) {
    return this.editorialService.create(createEditorialDto);
  }

  @Get()
  findAll() {
    return this.editorialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.editorialService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateEditorialDto: UpdateEditorialDto,
  ) {
    return this.editorialService.update(+id, updateEditorialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.editorialService.remove(+id);
  }
}
