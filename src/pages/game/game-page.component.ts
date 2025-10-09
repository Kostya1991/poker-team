import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Game } from '../../models/game.interface';
import { GameTableComponent } from '../../ui/game-table/game-table.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { GameCardComponent } from '../../ui/game-card/game-card.component';
import { GameService } from '../../services/game.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GameTableComponent, ButtonComponent, GameCardComponent],
})
export class GamePageComponent {
  /** todo: получать данные из SSE events */
  public game = signal<Game>({ id: 'sdfsdfsdf', name: 'Игра 123-ЗД', users: [] } as Game);

  private activatedRoute = inject(ActivatedRoute);

  private gameService: GameService = inject(GameService);

  private userService: UserService = inject(UserService);

  public title = toSignal(
    this.gameService
      .getGame(this.activatedRoute.snapshot.params['id'], this.userService.user?.id)
      .pipe(map((response) => response.name)),
    { initialValue: '' }
  );

  public disableTurnButton = signal<boolean>(true);
}
