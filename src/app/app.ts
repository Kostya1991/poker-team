import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SseService } from '../services/sse.service';
import { AlertComponent } from '../ui/alert/alert.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AlertComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private sseService = inject(SseService);

  ngOnInit(): void {
    this.sseService.init();
  }
}
