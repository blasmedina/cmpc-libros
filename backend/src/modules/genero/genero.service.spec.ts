import { Test, TestingModule } from '@nestjs/testing';
import { GeneroService } from './genero.service';
import { Genero } from './entities/genero.entity';
import { mockRepository } from 'src/mocks/mockRepository';
import { NotFoundException } from '@nestjs/common';

describe('GeneroService', () => {
  let service: GeneroService;
  let repository: typeof Genero;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GeneroService,
        {
          provide: 'GeneroRepository',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<GeneroService>(GeneroService);
    repository = module.get<typeof Genero>('GeneroRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should create an genero', async () => {
    const generoData = { nombre: 'Ficción especulativa' };
    mockRepository.create.mockResolvedValue(generoData);

    const result = await service.create(generoData);
    expect(result).toEqual(generoData);
    expect(mockRepository.create).toHaveBeenCalledWith(generoData);
  });

  it('should find all genero', async () => {
    const generosData = [
      { nombre: 'Ficción especulativa' },
      { nombre: 'Terror' },
    ];
    mockRepository.findAll.mockResolvedValue(generosData);

    const result = await service.findAll();
    expect(result).toEqual(generosData);
    expect(mockRepository.findAll).toHaveBeenCalled();
  });

  it('should find one genero by id', async () => {
    const generoData = { id: 1, nombre: 'Ficción especulativa' };
    mockRepository.findByPk.mockResolvedValue(generoData);

    const result = await service.findOne(1);
    expect(result).toEqual(generoData);
    expect(mockRepository.findByPk).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException if genero is not found', async () => {
    mockRepository.findByPk.mockResolvedValue(null);

    try {
      await service.findOne(999);
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
      expect(e.message).toBe('Genero no encontrado');
    }
  });

  it('should update an genero', async () => {
    const generoData = { id: 1, nombre: 'Ficción especulativa' };
    const updateData = { nombre: 'Ficción especulativa Updated' };

    const generoMock = {
      ...generoData,
      update: jest.fn().mockResolvedValue({ ...generoData, ...updateData }),
    };

    mockRepository.findByPk.mockResolvedValue(generoMock);

    const result = await service.update(1, updateData);

    expect(result).toEqual({ ...generoData, ...updateData });
    expect(mockRepository.findByPk).toHaveBeenCalledWith(1);

    expect(generoMock.update).toHaveBeenCalledWith(updateData);
  });

  it('should remove an genero', async () => {
    const generoData = { id: 1, nombre: 'Ficción especulativa' };
    const generoMock = {
      ...generoData,
      destroy: jest.fn().mockResolvedValue({ message: 'Genero eliminado' }),
    };

    mockRepository.findByPk.mockResolvedValue(generoMock);

    const result = await service.remove(1);

    expect(result).toEqual({ message: 'Genero eliminado' });

    expect(mockRepository.findByPk).toHaveBeenCalledWith(1);

    expect(generoMock.destroy).toHaveBeenCalled();
  });
});
