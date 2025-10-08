import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateGame } from '../models/create-game.namespase';
import { Observable } from 'rxjs';
import { CheckGame } from '../models/check-game.interface';
import { Game } from '../models/game.interface';

@Injectable({ providedIn: 'root' })
export class GameService {
  private http = inject(HttpClient);

  public createGame(request: CreateGame.Request): Observable<CreateGame.Response> {
    return this.http.post<CreateGame.Response>('http://localhost:3000/create-game', request);
  }

  public checkGame(id: string): Observable<CheckGame> {
    return this.http.get<CheckGame>(`http://localhost:3000/check-game/${id}`);
  }

  public getGame(id: string): Observable<Game> {
    return this.http.get<Game>(`http://localhost:3000/game/${id}`);
  }
}
