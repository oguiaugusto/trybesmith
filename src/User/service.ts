import { StatusCodes } from 'http-status-codes';
import { IUser } from './interfaces';
import UserModel from './model';
import RequestError from '../utils/RequestError';

const messages = {
  ALREADY_EXISTS: 'User already exists.',
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
}

export default UserService;
