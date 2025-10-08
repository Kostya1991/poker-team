import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Game } from '../../models/game.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
}
