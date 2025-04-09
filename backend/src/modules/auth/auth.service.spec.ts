import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

// Mock de JwtService
const mockJwtService = {
  sign: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const user = { id: '123', username: 'Burger King' };

      const accessToken = 'mocked_token';
      mockJwtService.sign.mockReturnValue(accessToken);

      const result = await service.login(user);

      expect(result).toEqual({ access_token: accessToken });
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        sub: user.id,
        username: user.username,
      });
    });

    it('should call jwtService.sign once', async () => {
      const user = { id: '123', username: 'Burger King' };
      const accessToken = 'mocked_token';
      mockJwtService.sign.mockReturnValue(accessToken);

      await service.login(user);

      expect(mockJwtService.sign).toHaveBeenCalledTimes(1);
    });
  });
});
