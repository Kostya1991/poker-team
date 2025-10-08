import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateGame } from '../models/create-game.namespase';
import { Observable } from 'rxjs';

@Injectable()
export class GameService {
  private http = inject(HttpClient);

  public createGame(request: CreateGame.Request): Observable<CreateGame.Response> {
    return this.http.post<CreateGame.Response>('http://localhost:3000/create-game', request);
  }
}
