import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent } from '../../ui/button/button.component';
import { GameExampleComponent } from '../../ui/game-example/game-example.component';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, GameExampleComponent],
  providers: [GameService],
})
export class HomePageComponent {
  private gameService = inject(GameService);

  public createGame(): void {
    this.gameService.createGame().subscribe((r) => console.log(r));
  }
}
