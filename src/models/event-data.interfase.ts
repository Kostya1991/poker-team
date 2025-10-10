import { Game } from './game.interface';
import { SseEvent } from './sse-event.enum';

export interface EventData {
  type: SseEvent;
  message: string;
  creatoreId: string;
  game: Game;
}
