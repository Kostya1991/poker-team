import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Game } from '../../models/game.interface';
import { GameTableComponent } from '../../ui/game-table/game-table.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { GameCardComponent } from '../../ui/game-card/game-card.component';
import { GameService } from '../../services/game.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

const USER_CARDS: number[] = [1, 2, 3, 5, 8, 13, 21];

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GameTableComponent, ButtonComponent, GameCardComponent],
})
export class GamePageComponent {
  private activatedRoute = inject(ActivatedRoute);

  private gameService: GameService = inject(GameService);

  private userService: UserService = inject(UserService);

  public users = this.gameService.users;

  public usersCard = signal<number[]>(USER_CARDS);

  public userSelectCard = signal<number | undefined>(this.userService.user?.rate);

  public gameId = toSignal(this.activatedRoute.params.pipe(map((params) => params['id'])), {
    initialValue: '',
  });

  public game = toSignal(this.gameService.getGame(this.gameId(), this.userService.user?.id), {
    initialValue: { id: '', isFinish: false, name: '', users: [] } as Game,
  });

  public disableTurnButton = computed(
    () => this.game().isFinish || this.users().some((user) => user.madeChoice)
  );

  public finishGame = signal<boolean>(false);

  public selectCard(rate: number): void {
    this.userSelectCard.set(rate);

    const user = this.userService.user;

    if (!user) {
      return;
    }

    this.userService
      .updateUser({
        userId: user.id,
        gameId: this.gameId(),
        userData: {
          madeChoice: true,
          rate,
        },
      })
      .subscribe(() => this.userService.setUser({ ...user, madeChoice: true, rate }));
  }

  public turnCards(isFinish: boolean): void {
    this.finishGame.set(isFinish);

    this.gameService.endGame({ isFinish, gameId: this.gameId() }).subscribe();

    if (!isFinish) {
      this.userSelectCard.set(undefined);
      const user = this.userService.user;

      if (!user) {
        return;
      }
      this.userService
        .updateUser({
          userId: user.id,
          gameId: this.gameId(),
          userData: {
            madeChoice: false,
            rate: undefined,
          },
        })
        .subscribe(() => this.userService.setUser({ ...user, madeChoice: false, rate: undefined }));
    }
  }
}
