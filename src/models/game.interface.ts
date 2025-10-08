import { User } from './user.interface';

export interface Game {
  name: string;
  id: string;
  users: User[];
}
