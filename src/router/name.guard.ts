import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { map, tap } from 'rxjs';

export const nameGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const user = userService.user;

  if (!user || !user.name) {
    const path = router.parseUrl(`create-user?returnUrl=${route.params['id']}`);
    return new RedirectCommand(path);
  }

  return userService
    .createUser({ userId: user.id, userName: user.name, gameId: route.params['id'] })
    .pipe(
      tap((response) => userService.setUser(response)),
      map(() => true)
    );
};
