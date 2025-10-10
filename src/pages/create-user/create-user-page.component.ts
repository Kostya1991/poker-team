import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../ui/button/button.component';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-user-page',
  templateUrl: './create-user-page.component.html',
  styleUrl: './create-user-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, ReactiveFormsModule],
})
export class CreateUserPageComponent {
  private userService = inject(UserService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  public readonly userName = new FormControl<string>('', {
    validators: Validators.required,
    nonNullable: true,
  });

  public createUser(): void {
    if (this.userName.invalid) {
      this.userName.markAsTouched();
      return;
    }

    const gameId = this.activatedRoute.snapshot.queryParamMap.get('returnUrl');

    if (!gameId) {
      return;
    }

    this.userService
      .createUser({ userId: null, userName: this.userName.value, gameId })
      .subscribe((response) => {
        this.userService.setUser(response);
        this.router.navigate(['/game', gameId]);
      });
  }
}
