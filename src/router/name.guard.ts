import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const nameGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const user = userService.user;

  if (!user || !user.name) {
    const path = router.parseUrl(`create-user?returnUrl=${route.params['id']}`);
    return new RedirectCommand(path);
  }

  userService
    .createUser({ userId: user.id, userName: user.name, gameId: route.params['id'] })
    .subscribe((response) => userService.setUser(response));

  return true;
};
