import { Routes } from '@angular/router';
import { HomePageComponent } from '../pages/home/home-page.component';
import { GameSettingsPageComponent } from '../pages/game-settings/game-settings-page.component';
import { gameGuard } from './game.guard';
import { gameResolver } from './game.resolver';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full',
  },
  {
    path: 'game/:id',
    loadComponent: () =>
      import('../pages/game/game-page.component').then((c) => c.GamePageComponent),
    canActivate: [gameGuard],
    resolve: {
      game: gameResolver,
    },
  },
  {
    path: 'game-settings',
    component: GameSettingsPageComponent,
    pathMatch: 'full',
  },
];
