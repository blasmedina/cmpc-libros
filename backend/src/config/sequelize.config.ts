import { SequelizeModuleOptions } from '@nestjs/sequelize';
import * as process from 'process';

export const sequelizeConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  autoLoadModels: true,
  synchronize: true, // poner en false en producción
  logging: false,
};
