import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservableInput } from 'rxjs';
import { CreateUser } from '../models/create-user.namespace';
import { SessionStorageService } from './session-storage.service';
import { UpdateUser } from '../models/update-user.namespace';
import { DeleteUser } from '../models/delete-user.namespase';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private sessionStorageService = inject(SessionStorageService);

  private readonly userState = signal<User | null>(null);

  public get user(): User | null {
    return this.userState();
  }

  public setUser(updateUser: User): void {
    this.userState.update((user: User | null) => {
      if (!user) {
        this.sessionStorageService.set('user', JSON.stringify(updateUser));
        return updateUser;
      }

      this.sessionStorageService.set('user', JSON.stringify({ ...user, ...updateUser }));
      return { ...user, ...updateUser };
    });
  }

  public createUser(request: CreateUser.Request): Observable<User> {
    return this.http.post<User>('/api/create-user', request);
  }

  public updateUser(request: UpdateUser.Request): Observable<void> {
    return this.http.post<void>('/api/update-user', request);
  }

  public removeUser(request: DeleteUser.Request): Observable<void> {
    return this.http.post<void>('/api/delete-user', request);
  }
}
