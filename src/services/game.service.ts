import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable()
export class GameService {
  private http = inject(HttpClient);

  public createGame() {
    return this.http.get('http://localhost:3000/create-game', {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
