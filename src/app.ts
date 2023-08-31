import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandalers from './app/middlewares/globalErrorHandaler';
import routes from './routes';
import httpStatus from 'http-status';

//midleware-----------
const app: Application = express();
app.use(cors());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/', routes);
app.use(globalErrorHandalers);

//handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
