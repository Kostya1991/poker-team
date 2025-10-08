import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent } from '../../ui/button/button.component';
import { GameExampleComponent } from '../../ui/game-example/game-example.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, GameExampleComponent],
})
export class HomePageComponent {
  private router = inject(Router);

  public createGame(): void {
    this.router.navigate(['game-settings']);
  }
}
