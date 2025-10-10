import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { CreateGame } from '../models/create-game.namespase';
import { Observable } from 'rxjs';
import { Game } from '../models/game.interface';
import { User } from '../models/user.interface';

@Injectable({ providedIn: 'root' })
export class GameService {
  private http = inject(HttpClient);

  private gameState = signal<Game>({
    id: '',
    isFinish: false,
    name: '',
    users: [],
  } as Game);

  public get game(): WritableSignal<Game> {
    return this.gameState;
  }

  public updateGame(game: Game): void {
    this.gameState.set(game);
  }

  public createGame(request: CreateGame.Request): Observable<CreateGame.Response> {
    return this.http.post<CreateGame.Response>('/api/create-game', request);
  }

  public checkGame(id: string): Observable<boolean> {
    return this.http.get<boolean>(`/api/check-game/${id}`);
  }

  public getGame(id: string, userId: string | undefined): Observable<Game> {
    return this.http.get<Game>(`/api/game/${id}`, {
      headers: {
        'user-id': userId || '',
      },
    });
  }

  public endGame(payload: { isFinish: boolean; gameId: string }): Observable<void> {
    return this.http.post<void>('/api/end-game', payload);
  }
}
