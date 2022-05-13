import 'dotenv/config';
import { sign, verify, Secret, JwtPayload } from 'jsonwebtoken';
import { IUser } from '../User/interfaces';

let JWT_SECRET = process.env.JWT_SECRET as Secret;
if (!JWT_SECRET) JWT_SECRET = 'please, set a value';

export default {
  sign: ({ id, username }: IUser): string => (
    sign({ id, username }, JWT_SECRET, { algorithm: 'HS256', expiresIn: '3d' })
  ),
  verify: (token: string): string | JwtPayload => verify(token, JWT_SECRET),
};
