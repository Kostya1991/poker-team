import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Game } from '../../models/game.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GameTableComponent } from '../../ui/game-table/game-table.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { GameCardComponent } from '../../ui/game-card/game-card.component';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GameTableComponent, ButtonComponent, GameCardComponent],
})
export class GamePageComponent {
  private activatedRoute = inject(ActivatedRoute);

  private data = toSignal<Data>(this.activatedRoute.data.pipe(map((data) => data['game'])));

  public game = computed(() => {
    const data = this.data();

    if (!data) {
      return {} as Game;
    }

    return data['game'] as Game;
  });

  public disableTurnButton = signal<boolean>(true);
}
