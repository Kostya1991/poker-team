import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrl: './game-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameTableComponent {}
