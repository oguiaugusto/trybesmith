import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import UserService from './service';
import jwtUser from '../utils/jwtUser';

interface IUserController {
  create: (req: Request, res: Response, next: NextFunction) =>
  Promise<Response<unknown, Record<string, unknown>> | undefined>;
}

class UserController implements IUserController {
  private service;

  constructor() {
    this.service = new UserService();
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.service.create(req.body);
      const token = jwtUser.sign(user);

      return res.status(StatusCodes.CREATED).json({ token });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
