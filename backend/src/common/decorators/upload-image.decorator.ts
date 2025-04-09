import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as crypto from 'crypto';

export const UploadImage = (dto: any) => {
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiBody({
      description: 'Datos del libro y la imagen',
      type: dto,
    }),
    UseInterceptors(
      FileInterceptor('imagen', {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, callback) => {
            const fileExtension = path.extname(file.originalname);
            const filename = `${crypto.randomBytes(16).toString('hex')}${fileExtension}`;
            callback(null, filename);
          },
        }),
      }),
    ),
  );
};
