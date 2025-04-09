import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from './config/sequelize.config';
import { ConfigModule } from '@nestjs/config';
import { LibroModule } from './modules/libro/libro.module';
import { AutorModule } from './modules/autor/autor.module';
import { EditorialModule } from './modules/editorial/editorial.module';
import { GeneroModule } from './modules/genero/genero.module';
import { AuthModule } from './modules/auth/auth.module';
import { JoiValidationSchema } from './config/joi-validation-schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: JoiValidationSchema,
    }),
    SequelizeModule.forRoot({
      ...sequelizeConfig,
    }),
    AuthModule,
    LibroModule,
    AutorModule,
    EditorialModule,
    GeneroModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
