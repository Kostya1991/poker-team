import { Routes } from '@angular/router';
import { HomePageComponent } from '../pages/home/home-page.component';
import { GameSettingsPageComponent } from '../pages/game-settings/game-settings-page.component';

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
  },
  {
    path: 'game-settings',
    component: GameSettingsPageComponent,
    pathMatch: 'full',
  },
];
