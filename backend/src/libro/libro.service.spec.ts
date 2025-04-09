import { Test, TestingModule } from '@nestjs/testing';
import { LibroService } from './libro.service';
import { Libro } from './entities/libro.entity';
import { FindLibroDto } from './dto/find-libro.dto';
import { NotFoundException } from '@nestjs/common';

const mockLibroRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  findAndCountAll: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
};

describe('LibroService', () => {
  let service: LibroService;
  let repository: typeof Libro;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LibroService,
        {
          provide: 'LibroRepository',
          useValue: mockLibroRepository,
        },
      ],
    }).compile();

    service = module.get<LibroService>(LibroService);
    repository = module.get<typeof Libro>('LibroRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should create a libro', async () => {
    const data = { titulo: 'Libro de prueba' };
    mockLibroRepository.create.mockResolvedValue(data);

    const result = await service.create(data);
    expect(result).toEqual(data);
    expect(mockLibroRepository.create).toHaveBeenCalledWith(data);
  });

  it('should return libros with filters', async () => {
    const mockResponse = { rows: [], count: 0 };
    mockLibroRepository.findAndCountAll.mockResolvedValue(mockResponse);

    const query: FindLibroDto = { limit: 5, offset: 0 } as any;
    const result = await service.findAll(query);
    expect(result).toEqual(mockResponse);
    expect(mockLibroRepository.findAndCountAll).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {},
        limit: 5,
        offset: 0,
        order: [['titulo', 'ASC']],
        paranoid: true,
      }),
    );
  });

  it('should find one libro by id', async () => {
    const libro = {
      id: 1,
      titulo: 'Test',
    };
    mockLibroRepository.findByPk.mockResolvedValue(libro);

    const result = await service.findOne(1);
    expect(result).toEqual(libro);
    expect(mockLibroRepository.findByPk).toHaveBeenCalledWith(1, {
      include: { all: true },
    });
  });

  it('should throw NotFoundException if libro is not found', async () => {
    mockLibroRepository.findByPk.mockResolvedValue(null);
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should update a libro', async () => {
    const libro = {
      id: 1,
      titulo: 'Test',
      update: jest.fn().mockResolvedValue({ id: 1, titulo: 'Updated' }),
    };
    mockLibroRepository.findByPk.mockResolvedValue(libro);

    const result = await service.update(1, { titulo: 'Updated' });
    expect(result).toEqual({ id: 1, titulo: 'Updated' });
    expect(libro.update).toHaveBeenCalledWith({ titulo: 'Updated' });
  });

  it('should soft delete a libro', async () => {
    const libro = {
      id: 1,
      destroy: jest.fn().mockResolvedValue(undefined),
    };
    mockLibroRepository.findByPk.mockResolvedValue(libro);

    await service.softDelete(1);
    expect(libro.destroy).toHaveBeenCalled();
  });

  it('should throw if libro not found in soft delete', async () => {
    mockLibroRepository.findByPk.mockResolvedValue(null);
    await expect(service.softDelete(123)).rejects.toThrow(
      'Libro no encontrado',
    );
  });

  it('should hard delete a libro', async () => {
    const libro = {
      id: 1,
      destroy: jest.fn().mockResolvedValue(undefined),
    };
    mockLibroRepository.findByPk.mockResolvedValue(libro);

    const result = await service.remove(1);
    expect(libro.destroy).toHaveBeenCalled();
    expect(result).toEqual({ message: 'Libro eliminado' });
  });
});
