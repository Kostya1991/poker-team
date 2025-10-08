import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent } from '../../ui/button/button.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SettingsForm } from '../../models/settingsForm.interface';
import { GameService } from '../../services/game.service';
import { UserService } from '../../services/user.service';
import { CreateGame } from '../../models/create-game.namespase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-settings-page',
  templateUrl: './game-settings-page.component.html',
  styleUrl: './game-settings-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, ReactiveFormsModule],
})
export class GameSettingsPageComponent {
  private gameService: GameService = inject(GameService);
  private userService: UserService = inject(UserService);
  private router: Router = inject(Router);

  public settingsForm = new FormGroup<SettingsForm>({
    gameName: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    userName: new FormControl('', { validators: [Validators.required], nonNullable: true }),
  });

  public onSubmit(): void {
    if (this.settingsForm.invalid) {
      this.settingsForm.markAllAsTouched();
      return;
    }

    this.gameService
      .createGame({ userName: this.settingsForm.controls.userName.value })
      .subscribe((response: CreateGame.Response) => {
        this.userService.setUser(response.user);
        this.router.navigate(['/game', response.id]);
      });
  }
}
