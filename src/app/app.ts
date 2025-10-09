import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SseService } from '../services/sse.service';
import { AlertComponent } from '../ui/alert/alert.component';
import { SessionStorageService } from '../services/session-storage.service';
import { User } from '../models/user.interface';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AlertComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, OnDestroy {
  private sseService = inject(SseService);
  private sessionStorageService = inject(SessionStorageService);
  private userService = inject(UserService);

  ngOnInit(): void {
    const user = this.sessionStorageService.get<User>('user');

    if (user) {
      this.userService.setUser(user);
    }

    this.sseService.init();
  }

  ngOnDestroy(): void {
    this.sessionStorageService.clear();
  }
}
