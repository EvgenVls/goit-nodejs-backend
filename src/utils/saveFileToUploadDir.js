import path from 'node:path';
import fs from 'node:fs/promises';

import { UPLOAD_DIR } from '../constants/index.js';

const saveFileToUploadDir = async (file, filePath) => {
  const newFilePath = path.join(UPLOAD_DIR, filePath, file.filename);
  await fs.rename(file.path, newFilePath);

  return `/${filePath}/${file.filename}`;
};

export default saveFileToUploadDir;
