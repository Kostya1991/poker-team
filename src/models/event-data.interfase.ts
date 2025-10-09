import { SseEvent } from './sse-event.enum';
import { User } from './user.interface';

export interface EventData {
  type: SseEvent;
  message: string;
  users: User[];
}
