import { Test, TestingModule } from '@nestjs/testing';
import { AutorController } from './autor.controller';
import { AutorService } from './autor.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

describe('AutorController', () => {
  let controller: AutorController;
  let service: AutorService;

  const mockAutorService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutorController],
      providers: [
        {
          provide: AutorService,
          useValue: mockAutorService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<AutorController>(AutorController);
    service = module.get<AutorService>(AutorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should create an autor', async () => {
    const dto = { nombre: 'Dan Brown' };
    mockAutorService.create.mockResolvedValue(dto);

    const result = await controller.create(dto);
    expect(result).toEqual(dto);
    expect(mockAutorService.create).toHaveBeenCalledWith(dto);
  });

  it('should return all autores', async () => {
    const autores = [{ nombre: 'Dan Brown' }];
    mockAutorService.findAll.mockResolvedValue(autores);

    const result = await controller.findAll();
    expect(result).toEqual(autores);
    expect(mockAutorService.findAll).toHaveBeenCalled();
  });

  it('should return one autor', async () => {
    const autor = { id: 1, nombre: 'Dan Brown' };
    mockAutorService.findOne.mockResolvedValue(autor);

    const result = await controller.findOne('1');
    expect(result).toEqual(autor);
    expect(mockAutorService.findOne).toHaveBeenCalledWith(1);
  });

  it('should update an autor', async () => {
    const updateDto = { nombre: 'Stephen King' };
    const updated = { id: 1, ...updateDto };
    mockAutorService.update.mockResolvedValue(updated);

    const result = await controller.update('1', updateDto);
    expect(result).toEqual(updated);
    expect(mockAutorService.update).toHaveBeenCalledWith(1, updateDto);
  });

  it('should remove an autor', async () => {
    const message = { message: 'Autor eliminado' };
    mockAutorService.remove.mockResolvedValue(message);

    const result = await controller.remove('1');
    expect(result).toEqual(message);
    expect(mockAutorService.remove).toHaveBeenCalledWith(1);
  });
});
