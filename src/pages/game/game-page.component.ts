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

  public userSelectCard = signal<number | undefined>(undefined);

  public gameId = toSignal(this.activatedRoute.params.pipe(map((params) => params['id'])), {
    initialValue: '',
  });

  public title = toSignal(
    this.gameService
      .getGame(this.gameId(), this.userService.user?.id)
      .pipe(map((response) => response.name)),
    { initialValue: '' }
  );

  public disableTurnButton = signal<boolean>(true);

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
}
