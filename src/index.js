import { initMongoDB } from './db/initMongoDB.js';

import createDirIfNotExists from './utils/createDirIfNotExists.js';

import startServer from './server.js';

import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';

const bootstrap = async () => {
  await initMongoDB();
  createDirIfNotExists(TEMP_UPLOAD_DIR);
  createDirIfNotExists(UPLOAD_DIR);
  startServer();
};

bootstrap();
