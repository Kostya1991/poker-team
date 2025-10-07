import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

type ButtonType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  public text = input.required<string>();

  public type = input<ButtonType>('primary');

  public click = output<void>({ alias: 'onClick' });

  public onClick(): void {
    this.click.emit();
  }
}
