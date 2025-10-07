import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '../../ui/button/button.component';
import { GameExampleComponent } from '../../ui/game-example/game-example.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, GameExampleComponent],
})
export class HomePageComponent {
  /** todo: метод должен отправлять запрос на BE, создавая игру  */
  public createGame(): void {
    console.log('created game...');
  }
}
