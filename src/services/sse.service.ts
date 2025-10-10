import { inject, Injectable } from '@angular/core';
import { EventData } from '../models/event-data.interfase';
import { SseConsumerService } from './sse-consumer.service';

@Injectable({ providedIn: 'root' })
export class SseService {
  private sseConsumerService: SseConsumerService = inject(SseConsumerService);

  private readonly eventSource = new EventSource('/api/events');

  public init(): void {
    // Обработчик получения данных
    this.eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data) as EventData;
      this.sseConsumerService.dataProcessingHandler(data);
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
