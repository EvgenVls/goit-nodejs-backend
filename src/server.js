import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { env } from './utils/env.js';

import usersRouter from './routers/auth.js';
import studentsRouter from './routers/students.js';

import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import swaggerDocs from './middlewares/swaggerDocs.js';

import { UPLOAD_DIR } from './constants/index.js';

const port = Number(env('PORT', '3000'));

const startServer = () => {
  const app = express();

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cors());
  app.use(cookieParser());
  app.use(
    express.json({
      type: ['application/json', 'application/VideoEncoder.api+json'],
      limit: '100kb',
    }),
  );
  app.use(express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());

  app.use('/auth', usersRouter);
  app.use('/students', studentsRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

export default startServer;
