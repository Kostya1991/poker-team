import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Game } from '../../models/game.interface';
import { GameTableComponent } from '../../ui/game-table/game-table.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { GameCardComponent } from '../../ui/game-card/game-card.component';
import { GameService } from '../../services/game.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AlertComponent } from '../../ui/alert/alert.component';
import { SessionStorageService } from '../../services/session-storage.service';

const USER_CARDS: number[] = [1, 2, 3, 5, 8, 13, 21];

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GameTableComponent, ButtonComponent, GameCardComponent, AlertComponent],
})
export class GamePageComponent {
  private activatedRoute = inject(ActivatedRoute);

  private gameService: GameService = inject(GameService);

  private userService: UserService = inject(UserService);

  private sessionStorageService: SessionStorageService = inject(SessionStorageService);

  public game = this.gameService.game;

  public usersCard = signal<number[]>(USER_CARDS);

  public userSelectCard = computed(() => {
    const user = this.userService.user;
    const gameUser = this.game().users.find((userItem) => userItem.id === user?.id);

    return gameUser?.rate;
  });

  public gameId = toSignal(this.activatedRoute.params.pipe(map((params) => params['id'])), {
    initialValue: '',
  });

  public disableTurnButton = computed(
    () => this.game().isFinish || this.game().users.some((user) => user.madeChoice)
  );

  public finishGame = signal<boolean>(false);

  constructor() {
    this.gameService.getGame(this.gameId(), this.userService.user?.id).subscribe();

    effect(() => {
      this.sessionStorageService.set('last-active-game', this.game().id);
    });
  }

  public selectCard(rate: number): void {
    const user = this.userService.user;

    if (!user) {
      return;
    }

    this.userService
      .updateUser({
        userId: user.id,
        gameId: this.game().id,
        userData: {
          madeChoice: true,
          rate,
        },
      })
      .subscribe(() => this.userService.setUser({ ...user, madeChoice: true, rate }));
  }

  public turnCards(isFinish: boolean): void {
    this.finishGame.set(isFinish);
    this.gameService.endGame({ isFinish, gameId: this.game().id }).subscribe();
  }
}
