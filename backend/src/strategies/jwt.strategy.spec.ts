import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;

  beforeEach(() => {
    process.env.JWT_SECRET = 'test-secret';
    strategy = new JwtStrategy();
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  it('should return user data from payload in validate()', async () => {
    const payload = {
      sub: 1,
      username: 'testuser',
    };

    const result = await strategy.validate(payload);

    expect(result).toEqual({
      userId: 1,
      username: 'testuser',
    });
  });
});
