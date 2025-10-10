import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { EventType, Router, RouterOutlet } from '@angular/router';
import { SseService } from '../services/sse.service';
import { SessionStorageService } from '../services/session-storage.service';
import { User } from '../models/user.interface';
import { UserService } from '../services/user.service';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const URL_REG_EXP = /^\/game\/[^/]+$/;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, OnDestroy {
  private sseService = inject(SseService);
  private sessionStorageService = inject(SessionStorageService);
  private userService = inject(UserService);
  private router = inject(Router);

  ngOnInit(): void {
    const user = this.sessionStorageService.get<User>('user');

    if (user) {
      this.userService.setUser(user);
    }

    this.sseService.init();

    this.router.events
      .pipe(
        takeUntilDestroyed(),
        filter((event) => event.type === EventType.NavigationEnd)
      )
      .subscribe((event) => {
        const gameId = this.sessionStorageService.get<string>('last-active-game');

        if (!gameId || URL_REG_EXP.test(event.url)) {
          return;
        }
        this.userService.removeUser({ userId: this.userService.user!.id, gameId }).subscribe(() =>
          this.userService.setUser({
            ...this.userService.user!,
            madeChoice: false,
            rate: undefined,
          })
        );
      });
  }

  ngOnDestroy(): void {
    this.sessionStorageService.clear();
  }
}
