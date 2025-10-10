import { User } from './user.interface';

export namespace UpdateUser {
  export interface Request {
    gameId: string;
    userId: string;
    userData: Partial<User>;
  }
}
