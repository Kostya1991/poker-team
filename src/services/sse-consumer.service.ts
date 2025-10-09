import { inject, Injectable } from '@angular/core';
import { EventData } from '../models/event-data.interfase';
import { SseEvent } from '../models/sse-event.enum';
import { UserService } from './user.service';
import { NotificationService } from './notification.service';
import { GameService } from './game.service';

@Injectable({ providedIn: 'root' })
export class SseConsumerService {
  private userService = inject(UserService);
  private notificationService = inject(NotificationService);
  private gameService = inject(GameService);

  public dataProcessingHandler(data: EventData): void {
    switch (data.type) {
      case SseEvent.UserConnection:
        this.userConnection(data);
        break;
      case SseEvent.UserUpdate:
        this.userUpdate(data);
        break;
    }
  }

  /** Обработка подключения нового пользователя */
  private userConnection(data: EventData): void {
    const userId = this.userService.user?.id;

    this.gameService.updateUsers(data.users);

    if (userId === data.creatoreId) {
      return;
    }

    this.notificationService.showAlert(data.message, 'primary');
  }

  /** Обработка обновления данных пользователя */
  private userUpdate(data: EventData): void {
    this.gameService.updateUsers(data.users);
  }
}
