import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../User/service';
import jwtUser from '../utils/jwtUser';

interface ILoginController {
  login: (req: Request, res: Response, next: NextFunction) =>
  Promise<Response<unknown, Record<string, unknown>> | undefined>;
}

class LoginController implements ILoginController {
  private userService;

  constructor() {
    this.userService = new UserService();
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.getByCredentials(req.body);
      const token = jwtUser.sign(user);

      return res.status(StatusCodes.OK).json({ token });
    } catch (error) {
      next(error);
    }
  };
}

export default LoginController;
