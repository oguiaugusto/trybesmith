import { Request, Response, NextFunction } from 'express';
import { isCelebrateError, CelebrateError } from 'celebrate';
import { StatusCodes } from 'http-status-codes';
import RequestError from '../utils/RequestError';

type ErrTypes = RequestError | CelebrateError;

const handleCelebrateError = (err: CelebrateError, res: Response) => {
  const { message } = err.details.entries().next().value[1].details[0];
  const code = message.includes('must ')
    ? StatusCodes.UNPROCESSABLE_ENTITY : StatusCodes.BAD_REQUEST;

  return res.status(code).json({ message });
};

const errorMiddleware = (err: ErrTypes, _req: Request, res: Response, _next: NextFunction) => {
  if (isCelebrateError(err)) {
    handleCelebrateError(err, res);
    return;
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
  }

  const { status, message } = err;
  if (!status || !message) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal Server Error.' });
  }

  return res.status(status).json({ message });
};

export default errorMiddleware;
