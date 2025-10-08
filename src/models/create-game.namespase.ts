import { User } from './user.interface';

export namespace CreateGame {
  export interface Request {
    userName: string;
  }

  export interface Response {
    id: string;
    user: User;
  }
}
