import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';

import '@shared/container';
import { configUpload } from '@config/upload';
import { errors } from 'celebrate';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';

import { createConnectionPostgres } from '@shared/infra/typeorm';

import { AppError } from '../../errors/AppError';
import { generalSwagger } from './docs';
import { rateLimiter } from './middlewares/rateLimiter';
import { routes } from './routes';

createConnectionPostgres();

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(generalSwagger));

app.use('/avatar', express.static(`${configUpload.uploadsFolder}/avatar`));

app.use(rateLimiter);

app.use(cors());
app.use(routes);

app.use(errors());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // eslint-disable-next-line no-console
  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export { app };
