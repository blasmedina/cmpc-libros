import { Test, TestingModule } from '@nestjs/testing';
import { EditorialService } from './editorial.service';
import { Editorial } from './entities/editorial.entity';
import { mockRepository } from 'src/mocks/mockRepository';
import { NotFoundException } from '@nestjs/common';

describe('EditorialService', () => {
  let service: EditorialService;
  let repository: typeof Editorial;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EditorialService,
        {
          provide: 'EditorialRepository',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<EditorialService>(EditorialService);
    repository = module.get<typeof Editorial>('EditorialRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should create an editorial', async () => {
    const editorialData = { nombre: 'Editorial Planeta Chile' };
    mockRepository.create.mockResolvedValue(editorialData);

    const result = await service.create(editorialData);
    expect(result).toEqual(editorialData);
    expect(mockRepository.create).toHaveBeenCalledWith(editorialData);
  });

  it('should find all editoriales', async () => {
    const editorialesData = [
      { nombre: 'Editorial Planeta Chile' },
      { nombre: 'Lom Ediciones' },
    ];
    mockRepository.findAll.mockResolvedValue(editorialesData);

    const result = await service.findAll();
    expect(result).toEqual(editorialesData);
    expect(mockRepository.findAll).toHaveBeenCalled();
  });

  it('should find one editorial by id', async () => {
    const editorialData = { id: 1, nombre: 'Editorial Planeta Chile' };
    mockRepository.findByPk.mockResolvedValue(editorialData);

    const result = await service.findOne(1);
    expect(result).toEqual(editorialData);
    expect(mockRepository.findByPk).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException if editorial is not found', async () => {
    mockRepository.findByPk.mockResolvedValue(null);

    try {
      await service.findOne(999);
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
      expect(e.message).toBe('Editorial no encontrada');
    }
  });

  it('should update an editorial', async () => {
    const editorialData = { id: 1, nombre: 'Editorial Planeta Chile' };
    const updateData = { nombre: 'Editorial Planeta Chile Updated' };

    const editorialMock = {
      ...editorialData,
      update: jest.fn().mockResolvedValue({ ...editorialData, ...updateData }),
    };

    mockRepository.findByPk.mockResolvedValue(editorialMock);

    const result = await service.update(1, updateData);

    expect(result).toEqual({ ...editorialData, ...updateData });
    expect(mockRepository.findByPk).toHaveBeenCalledWith(1);

    expect(editorialMock.update).toHaveBeenCalledWith(updateData);
  });

  it('should remove an editorial', async () => {
    const editorialData = { id: 1, nombre: 'Editorial Planeta Chile' };
    const editorialMock = {
      ...editorialData,
      destroy: jest.fn().mockResolvedValue({ message: 'Editorial eliminada' }),
    };

    mockRepository.findByPk.mockResolvedValue(editorialMock);

    const result = await service.remove(1);

    expect(result).toEqual({ message: 'Editorial eliminada' });

    expect(mockRepository.findByPk).toHaveBeenCalledWith(1);

    expect(editorialMock.destroy).toHaveBeenCalled();
  });
});
