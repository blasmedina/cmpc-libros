import { Test, TestingModule } from '@nestjs/testing';
import { GeneroController } from './genero.controller';
import { GeneroService } from './genero.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

describe('GeneroController', () => {
  let controller: GeneroController;
  let service: GeneroService;

  const mockGeneroService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneroController],
      providers: [
        {
          provide: GeneroService,
          useValue: mockGeneroService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<GeneroController>(GeneroController);
    service = module.get<GeneroService>(GeneroService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should create an genero', async () => {
    const dto = { nombre: 'Ficción especulativa' };
    mockGeneroService.create.mockResolvedValue(dto);

    const result = await controller.create(dto);
    expect(result).toEqual(dto);
    expect(mockGeneroService.create).toHaveBeenCalledWith(dto);
  });

  it('should return all generos', async () => {
    const generos = [{ nombre: 'Ficción especulativa' }];
    mockGeneroService.findAll.mockResolvedValue(generos);

    const result = await controller.findAll();
    expect(result).toEqual(generos);
    expect(mockGeneroService.findAll).toHaveBeenCalled();
  });

  it('should return one genero', async () => {
    const genero = { id: 1, nombre: 'Ficción especulativa' };
    mockGeneroService.findOne.mockResolvedValue(genero);

    const result = await controller.findOne('1');
    expect(result).toEqual(genero);
    expect(mockGeneroService.findOne).toHaveBeenCalledWith(1);
  });

  it('should update an genero', async () => {
    const updateDto = { nombre: 'Terror' };
    const updated = { id: 1, ...updateDto };
    mockGeneroService.update.mockResolvedValue(updated);

    const result = await controller.update('1', updateDto);
    expect(result).toEqual(updated);
    expect(mockGeneroService.update).toHaveBeenCalledWith(1, updateDto);
  });

  it('should remove an genero', async () => {
    const message = { message: 'Genero eliminado' };
    mockGeneroService.remove.mockResolvedValue(message);

    const result = await controller.remove('1');
    expect(result).toEqual(message);
    expect(mockGeneroService.remove).toHaveBeenCalledWith(1);
  });
});
