import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { env } from './utils/env.js';

import studentsRouter from './routers/students.js';

import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const port = Number(env('PORT', '3000'));

const startServer = () => {
  const app = express();

  // app.use(
  //   pino({
  //     transport: {
  //       target: 'pino-pretty',
  //     },
  //   }),
  // );

  app.use(cors());
  app.use(
    express.json({
      type: ['application/json', 'application/VideoEncoder.api+json'],
      limit: '100kb',
    }),
  );

  app.use('/students', studentsRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

export default startServer;
