import { Test, TestingModule } from '@nestjs/testing';
import { EditorialController } from './editorial.controller';
import { EditorialService } from './editorial.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

describe('EditorialController', () => {
  let controller: EditorialController;
  let service: EditorialService;

  const mockEditorialService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EditorialController],
      providers: [
        {
          provide: EditorialService,
          useValue: mockEditorialService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<EditorialController>(EditorialController);
    service = module.get<EditorialService>(EditorialService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should create an editorial', async () => {
    const dto = { nombre: 'Editorial Planeta Chile' };
    mockEditorialService.create.mockResolvedValue(dto);

    const result = await controller.create(dto);
    expect(result).toEqual(dto);
    expect(mockEditorialService.create).toHaveBeenCalledWith(dto);
  });

  it('should return all editoriales', async () => {
    const editoriales = [{ nombre: 'Editorial Planeta Chile' }];
    mockEditorialService.findAll.mockResolvedValue(editoriales);

    const result = await controller.findAll();
    expect(result).toEqual(editoriales);
    expect(mockEditorialService.findAll).toHaveBeenCalled();
  });

  it('should return one editorial', async () => {
    const editorial = { id: 1, nombre: 'Editorial Planeta Chile' };
    mockEditorialService.findOne.mockResolvedValue(editorial);

    const result = await controller.findOne('1');
    expect(result).toEqual(editorial);
    expect(mockEditorialService.findOne).toHaveBeenCalledWith(1);
  });

  it('should update an editorial', async () => {
    const updateDto = { nombre: 'Lom Ediciones' };
    const updated = { id: 1, ...updateDto };
    mockEditorialService.update.mockResolvedValue(updated);

    const result = await controller.update('1', updateDto);
    expect(result).toEqual(updated);
    expect(mockEditorialService.update).toHaveBeenCalledWith(1, updateDto);
  });

  it('should remove an editorial', async () => {
    const message = { message: 'Editorial eliminada' };
    mockEditorialService.remove.mockResolvedValue(message);

    const result = await controller.remove('1');
    expect(result).toEqual(message);
    expect(mockEditorialService.remove).toHaveBeenCalledWith(1);
  });
});
