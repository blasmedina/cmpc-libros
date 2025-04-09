import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return the result from AuthService', async () => {
      const user = { id: '123', username: 'Burger King' };
      const mockResult = { access_token: 'mocked_token' };

      mockAuthService.login.mockResolvedValue(mockResult);

      const result = await controller.login(user);

      expect(result).toEqual(mockResult);
      expect(mockAuthService.login).toHaveBeenCalledWith(user);
    });

    it('should call authService.login once', async () => {
      const user = { id: '123', username: 'Burger King' };
      const mockResult = { access_token: 'mocked_token' };
      mockAuthService.login.mockResolvedValue(mockResult);

      await controller.login(user);

      expect(mockAuthService.login).toHaveBeenCalledTimes(1);
    });
  });
});
