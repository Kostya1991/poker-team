import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { CardMode } from '../../models/card-mode.type';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
})
export class GameCardComponent {
  public mode = input.required<CardMode>();

  public rate = input.required<number | undefined>();

  public active = input.required<boolean>();

  public userName = input.required<string>();

  public disabled = input<boolean>(false);

  public select = output<number>({ alias: 'selectCard' });

  public onSelect(): void {
    if (this.disabled()) {
      return;
    }

    this.select.emit(this.rate() || 0);
  }
}
