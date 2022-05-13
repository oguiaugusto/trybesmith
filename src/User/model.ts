import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { IUser } from './interfaces';
import connection from '../models/connection';

interface IUserModel {
  create: ({ username, classe, level, password }: IUser) => Promise<IUser>;
  getByUsername: (username: string) => Promise<IUser | null>;
}

class UserModel implements IUserModel {
  private connection;

  constructor() {
    this.connection = connection;
  }

  public create = async ({ username, classe, level, password }: IUser) => {
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?);',
      [username, classe, level, password],
    );
    return { id: insertId, username, classe, level, password };
  };

  public getByUsername = async (username: string) => {
    const [user] = await this.connection.execute<RowDataPacket[]>(
      'SELECT * FROM Trybesmith.Users WHERE username = ?',
      [username],
    );

    if (!user || user.length === 0) return null;
    return user[0] as IUser;
  };
}

export default UserModel;
