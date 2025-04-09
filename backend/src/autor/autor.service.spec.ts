import { Test, TestingModule } from '@nestjs/testing';
import { AutorService } from './autor.service';
import { Autor } from './entities/autor.entity';
import { NotFoundException } from '@nestjs/common';
import { mockRepository } from 'src/mocks/mockRepository';

describe('AutorService', () => {
  let service: AutorService;
  let repository: typeof Autor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AutorService,
        {
          provide: 'AutorRepository',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<AutorService>(AutorService);
    repository = module.get<typeof Autor>('AutorRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should create an autor', async () => {
    const autorData = { nombre: 'Dan Brown' };
    mockRepository.create.mockResolvedValue(autorData);

    const result = await service.create(autorData);
    expect(result).toEqual(autorData);
    expect(mockRepository.create).toHaveBeenCalledWith(autorData);
  });

  it('should find all autores', async () => {
    const autoresData = [{ nombre: 'Dan Brown' }, { nombre: 'Stephen King' }];
    mockRepository.findAll.mockResolvedValue(autoresData);

    const result = await service.findAll();
    expect(result).toEqual(autoresData);
    expect(mockRepository.findAll).toHaveBeenCalled();
  });

  it('should find one autor by id', async () => {
    const autorData = { id: 1, nombre: 'Dan Brown' };
    mockRepository.findByPk.mockResolvedValue(autorData);

    const result = await service.findOne(1);
    expect(result).toEqual(autorData);
    expect(mockRepository.findByPk).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException if autor is not found', async () => {
    mockRepository.findByPk.mockResolvedValue(null);

    try {
      await service.findOne(999);
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
      expect(e.message).toBe('Autor no encontrado');
    }
  });

  it('should update an autor', async () => {
    const autorData = { id: 1, nombre: 'Dan Brown' };
    const updateData = { nombre: 'Dan Brown Updated' };

    const autorMock = {
      ...autorData,
      update: jest.fn().mockResolvedValue({ ...autorData, ...updateData }),
    };

    mockRepository.findByPk.mockResolvedValue(autorMock);

    const result = await service.update(1, updateData);

    expect(result).toEqual({ ...autorData, ...updateData });
    expect(mockRepository.findByPk).toHaveBeenCalledWith(1);

    expect(autorMock.update).toHaveBeenCalledWith(updateData);
  });

  it('should remove an autor', async () => {
    const autorData = { id: 1, nombre: 'Dan Brown' };
    const autorMock = {
      ...autorData,
      destroy: jest.fn().mockResolvedValue({ message: 'Autor eliminado' }),
    };

    mockRepository.findByPk.mockResolvedValue(autorMock);

    const result = await service.remove(1);

    expect(result).toEqual({ message: 'Autor eliminado' });

    expect(mockRepository.findByPk).toHaveBeenCalledWith(1);

    expect(autorMock.destroy).toHaveBeenCalled();
  });
});
