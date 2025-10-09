import { Injectable, signal, WritableSignal } from '@angular/core';
import { AlertMode } from '../models/alert-mode.type';
import { Alert } from '../models/alert.interface';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private alertsState = signal<Alert[]>([]);

  public get alerts(): WritableSignal<Alert[]> {
    return this.alertsState;
  }

  public showAlert(message: string, mode: AlertMode): void {
    const alerts = [
      ...this.alertsState(),
      {
        message,
        mode,
        id: Math.random().toString(),
      },
    ];

    this.alertsState.set(alerts);
  }

  public closeAlert(id: string): void {
    const timeoutId = setTimeout(() => {
      this.alertsState.update((alerts) => alerts.filter((alert) => alert.id !== id));
      clearTimeout(timeoutId);
    }, 2000);
  }
}
