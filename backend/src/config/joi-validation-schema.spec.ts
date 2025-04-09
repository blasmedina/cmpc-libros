import { JoiValidationSchema } from './joi-validation-schema';

describe('JoiValidationSchema', () => {
  const validEnv = {
    NODE_ENV: 'development',
    DB_HOST: 'localhost',
    DB_PORT: '5432',
    DB_USER: 'postgres',
    DB_PASS: 'password',
    DB_NAME: 'testdb',
    JWT_SECRET: 'supersecret',
  };

  it('should validate successfully with valid environment variables', () => {
    const { error, value } = JoiValidationSchema.validate(validEnv);
    expect(error).toBeUndefined();
    expect(value).toEqual(validEnv);
  });

  it('should fail validation if any variable is missing', () => {
    const invalidEnv = { ...validEnv };
    delete invalidEnv.DB_HOST;

    const { error } = JoiValidationSchema.validate(invalidEnv);
    expect(error).toBeDefined();
    expect(error?.details[0].message).toContain('"DB_HOST" is required');
  });

  it('should fail validation if a variable is of incorrect type', () => {
    const invalidEnv = {
      ...validEnv,
      DB_PORT: 5432,
    };

    const { error } = JoiValidationSchema.validate(invalidEnv);
    expect(error).toBeDefined();
    expect(error?.details[0].message).toContain('"DB_PORT" must be a string');
  });
});
