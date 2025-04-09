import * as fs from 'fs';
import * as path from 'path';

export const deleteUploadedFile = (relativePath: string) => {
  const imagePath = path.join(__dirname, '..', '..', relativePath);
  fs.unlinkSync(imagePath);
};
