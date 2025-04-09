import { Test, TestingModule } from '@nestjs/testing';
import { LibroController } from './libro.controller';
import { LibroService } from './libro.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateLibroDto } from './dto/create-libro.dto';
import { FindLibroDto } from './dto/find-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';

describe('LibroController', () => {
  let controller: LibroController;
  let service: LibroService;

  const mockLibroService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    softDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LibroController],
      providers: [
        {
          provide: LibroService,
          useValue: mockLibroService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<LibroController>(LibroController);
    service = module.get<LibroService>(LibroService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should create a libro with image', async () => {
    const dto: CreateLibroDto = { titulo: 'Libro Test' } as any;
    const mockFile = { filename: 'imagen.jpg' } as Express.Multer.File;

    const expectedDto = {
      ...dto,
      imagenUrl: '/uploads/imagen.jpg',
    };

    const result = { id: 1, ...expectedDto };
    mockLibroService.create.mockResolvedValue(result);

    const created = await controller.create(dto, mockFile);

    expect(created).toEqual(result);
    expect(service.create).toHaveBeenCalledWith(expectedDto);
  });

  it('should create a libro without image', async () => {
    const dto: CreateLibroDto = { titulo: 'Libro sin imagen' } as any;
    const result = { id: 2, ...dto };
    mockLibroService.create.mockResolvedValue(result);

    const created = await controller.create(dto, undefined);

    expect(created).toEqual(result);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return a list of libros with filters', async () => {
    const query: FindLibroDto = { generoId: 1, limit: 10 } as any;
    const result = [{ id: 1, titulo: 'Libro 1' }];
    mockLibroService.findAll.mockResolvedValue(result);

    expect(await controller.findAll(query)).toEqual(result);
    expect(service.findAll).toHaveBeenCalledWith(query);
  });

  it('should return one libro by id', async () => {
    const result = { id: 1, titulo: 'Libro 1' };
    mockLibroService.findOne.mockResolvedValue(result);

    expect(await controller.findOne('1')).toEqual(result);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a libro with image', async () => {
    const dto: UpdateLibroDto = { titulo: 'Nuevo título' } as any;
    const mockFile = { filename: 'nueva-imagen.jpg' } as Express.Multer.File;

    const expectedDto = {
      ...dto,
      imagenUrl: '/uploads/nueva-imagen.jpg',
    };

    const result = { id: 1, ...expectedDto };
    mockLibroService.update.mockResolvedValue(result);

    const updated = await controller.update('1', dto, mockFile);

    expect(updated).toEqual(result);
    expect(service.update).toHaveBeenCalledWith(1, expectedDto);
  });

  it('should update a libro without image', async () => {
    const dto: UpdateLibroDto = { titulo: 'Nuevo título sin imagen' } as any;
    const result = { id: 1, ...dto };
    mockLibroService.update.mockResolvedValue(result);

    const updated = await controller.update('1', dto, undefined);

    expect(updated).toEqual(result);
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('should soft delete a libro', async () => {
    const result = { message: 'Libro eliminado' };
    mockLibroService.softDelete.mockResolvedValue(result);

    expect(await controller.softDelete('1')).toEqual(result);
    expect(service.softDelete).toHaveBeenCalledWith(1);
  });
});
