import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Game } from '../models/game.interface';
import { inject } from '@angular/core';
import { GameService } from '../services/game.service';

export const gameResolver: ResolveFn<Game> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const gameService = inject(GameService);
  const gameId = route.params['id'];

  return gameService.getGame(gameId);
};
