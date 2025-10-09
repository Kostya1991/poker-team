import { Injectable } from '@angular/core';
import { EventData } from '../models/event-data.interfase';

@Injectable({ providedIn: 'root' })
export class SseService {
  private readonly eventSource = new EventSource('http://localhost:3000/events');

  public init(): void {
    // Обработчик получения данных
    this.eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data) as EventData;
      // todo: тут отправлять данные в сервис по работе с данными
    };

    // Обработчик ошибок
    this.eventSource.onerror = (err) => {
      console.error('Ошибка EventSource:', err);
    };

    // Обработчик открытия соединения
    this.eventSource.onopen = () => {
      console.log('Соединение SSE установлено');
    };
  }
}
