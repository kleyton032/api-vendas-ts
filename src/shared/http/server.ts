import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes/index';
import { errors } from 'celebrate';
import { pagination } from 'typeorm-pagination'
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';

const app = express();

app.use(cors());
app.use(express.json());
app.use(pagination);
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(errors());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
        data: err?.data
      });
    }

    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  },
);

app.listen(3333, () => {
  console.log('Server started on port 3333!');
})
