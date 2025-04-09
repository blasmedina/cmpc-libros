import * as fs from 'fs';
import * as path from 'path';
import { deleteUploadedFile } from './delete-uploaded-file.util';

jest.mock('fs');

describe('deleteUploadedFile', () => {
  const mockUnlinkSync = fs.unlinkSync as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call fs.unlinkSync with the correct absolute path', () => {
    const relativePath = 'uploads/test-image.jpg';
    const expectedPath = path.join(__dirname, '..', '..', relativePath);

    deleteUploadedFile(relativePath);

    expect(mockUnlinkSync).toHaveBeenCalledWith(expectedPath);
  });
});
