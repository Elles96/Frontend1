import { Component, signal, inject } from '@angular/core';
import { PasakumsService } from '../services/pasakums.service';
import { Pasakums } from '../models/pasakums.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.html',
  styleUrls: ['./events.css'],
})
export class EventsComponent {
  pasakumi = signal<Pasakums[]>([]);
  pasakumsService = inject(PasakumsService);

  constructor() {
    this.pasakumsService.getPasakumi().subscribe(data => {
      this.pasakumi.set(data);
    });
  }
}