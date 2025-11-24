import { Component, inject } from '@angular/core';
import { PasakumsService } from '../services/pasakums.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.html',
  styleUrls: ['./events.css'],
})
export class EventsComponent {

  PasakumsService = inject(PasakumsService);
  router = inject(Router);

}
