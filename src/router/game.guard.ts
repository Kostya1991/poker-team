import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { map } from 'rxjs';
import { CheckGame } from '../models/check-game.interface';

export const gameGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const gameService = inject(GameService);
  const router = inject(Router);

  return gameService.checkGame(route.params['id']).pipe(
    map(({ game }: CheckGame) => {
      if (game) {
        return true;
      }

      const path = router.parseUrl('');
      return new RedirectCommand(path);
    })
  );
};
