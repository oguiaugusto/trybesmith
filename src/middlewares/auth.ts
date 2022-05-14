import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IUser } from '../User/interfaces';
import UserModel from '../User/model';
import jwtUser from '../utils/jwtUser';
import RequestError from '../utils/RequestError';

type UserReq = Request & { user?: IUser };

const messages = {
  TOKEN_NOT_FOUND: 'Token not found',
  INVALID_TOKEN: 'Invalid token',
};

const userModel = new UserModel();

const authMiddleware = async (req: UserReq, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw new RequestError(messages.TOKEN_NOT_FOUND, StatusCodes.UNAUTHORIZED);

    const decoded = jwtUser.verify(token);

    if (typeof decoded !== 'string') {
      const user = await userModel.getByUsername(decoded.username);
      if (!user) throw new RequestError(messages.TOKEN_NOT_FOUND, StatusCodes.UNAUTHORIZED);

      req.user = user;
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
