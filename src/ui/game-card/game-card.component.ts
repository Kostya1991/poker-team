import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

type CardMode = 'front' | 'back';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
})
export class GameCardComponent {
  public mode = input.required<CardMode>();

  public rate = input.required<number>();

  public active = input.required<boolean>();

  public select = output<number>({ alias: 'selectCard' });

  public onSelect(): void {
    this.select.emit(this.rate());
  }
}
