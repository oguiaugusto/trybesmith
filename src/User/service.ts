import { StatusCodes } from 'http-status-codes';
import { IUser } from './interfaces';
import UserModel, { TCredentials } from './model';
import RequestError from '../utils/RequestError';

const messages = {
  ALREADY_EXISTS: 'User already exists.',
  INVALID_CREDENTIALS: 'Username or password invalid',
};

interface IUserService {
  create: ({ username, classe, level, password }: IUser) => Promise<IUser>;
}

class UserService implements IUserService {
  private model;

  constructor() {
    this.model = new UserModel();
  }

  public create = async ({ username, classe, level, password }: IUser) => {
    const existingUser = await this.model.getByUsername(username);
    if (existingUser) throw new RequestError(messages.ALREADY_EXISTS, StatusCodes.CONFLICT);

    const user = await this.model.create({ username, classe, level, password });
    return user;
  };

  public getByCredentials = async ({ username, password }: TCredentials) => {
    const user = await this.model.getByCredentials({ username, password });

    if (!user) throw new RequestError(messages.INVALID_CREDENTIALS, StatusCodes.UNAUTHORIZED);
    return user;
  };
}

export default UserService;
