import { AlertMode } from './alert-mode.type';

export interface Alert {
  message: string;
  mode: AlertMode;
  id: string;
}
