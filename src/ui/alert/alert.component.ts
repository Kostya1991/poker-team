import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  private notificationService: NotificationService = inject(NotificationService);

  public readonly alerts = this.notificationService.alerts;

  constructor() {
    effect(() => {
      const alert = this.alerts()[0];

      if (!alert) {
        return;
      }

      this.notificationService.closeAlert(alert.id);
    });
  }
}
