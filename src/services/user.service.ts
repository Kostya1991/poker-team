import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly userState = signal<User | null>(null);

  public get user(): User | null {
    return this.userState();
  }

  public setUser(updateUser: User): void {
    this.userState.update((user: User | null) => {
      if (!user) {
        return updateUser;
      }

      return { ...user, ...updateUser };
    });
  }
}
