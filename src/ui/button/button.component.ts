import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ButtonType } from '../../models/button-type.type';
import { ButtonMode } from '../../models/button-mode.type';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  public text = input.required<string>();

  public type = input<ButtonType>('primary');

  public mode = input<ButtonMode>('button');

  public click = output<void>({ alias: 'onClick' });

  public onClick(): void {
    this.click.emit();
  }
}
