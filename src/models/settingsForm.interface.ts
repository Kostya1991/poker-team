import { FormControl } from '@angular/forms';

export interface SettingsForm {
  gameName: FormControl<string>;
  userName: FormControl<string>;
}
