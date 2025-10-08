import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GAME_NAME_PARAMS } from '../../consts/game-name.conts';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamePageComponent {
  constructor() {
    // todo: тут получаем наименование игры
    console.log(history.state[GAME_NAME_PARAMS]);
  }
}
