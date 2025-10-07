import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GameTableComponent } from '../game-table/game-table.component';
import { GameCardComponent } from '../game-card/game-card.component';
import { ButtonComponent } from '../button/button.component';
import { CardMode } from '../../models/card-mode.type';

const USER_CARDS: number[] = [1, 2, 3, 5, 8];

@Component({
  selector: 'app-game-example',
  templateUrl: './game-example.component.html',
  styleUrl: './game-example.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, GameCardComponent, GameTableComponent],
})
export class GameExampleComponent {
  public mode = signal<CardMode>('back');

  public userCards = signal<number[]>(USER_CARDS);

  public activeCard = signal<number | undefined>(undefined);

  public isFinishGame = signal<boolean>(false);

  public turnOver(mode: CardMode): void {
    if (mode === 'back') {
      this.activeCard.set(undefined);
    }

    this.isFinishGame.set(mode === 'front');
    this.mode.set(mode);
  }

  public selectCard(rate: number): void {
    this.activeCard.set(rate);
  }
}
