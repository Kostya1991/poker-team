import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { CreateGame } from '../models/create-game.namespase';
import { Observable } from 'rxjs';
import { Game } from '../models/game.interface';
import { User } from '../models/user.interface';

@Injectable({ providedIn: 'root' })
export class GameService {
  private http = inject(HttpClient);

  private usersState = signal<User[]>([]);

  public get users(): WritableSignal<User[]> {
    return this.usersState;
  }

  public updateUsers(users: User[]): void {
    this.usersState.set(users);
  }

  public createGame(request: CreateGame.Request): Observable<CreateGame.Response> {
    return this.http.post<CreateGame.Response>('http://localhost:3000/create-game', request);
  }

  public checkGame(id: string): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:3000/check-game/${id}`);
  }

  public getGame(id: string, userId: string | undefined): Observable<Game> {
    return this.http.get<Game>(`http://localhost:3000/game/${id}`, {
      headers: {
        'user-id': userId || '',
      },
    });
  }

  public endGame(payload: { isFinish: boolean; gameId: string }): Observable<void> {
    return this.http.post<void>('http://localhost:3000/end-game', payload);
  }
}
