import { Component, signal, inject } from '@angular/core';
import { Field, form, required } from '@angular/forms/signals';
import { PasakumsService } from '../services/pasakumsservice';
import { Pasakums } from '../models/pasakumsmodel';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events',
  imports: [Field],
  templateUrl: './events.html',
  styleUrls: ['./events.css'],
  standalone: true
})
export class Events {
  pasakumi = signal<Pasakums[]>([]);
  pasakumsService = inject(PasakumsService);

  errorMsg = signal('');
  successMsg = signal('');
  signedUpEventIds = signal<number[]>([]);
  newEventSignal = signal<Pasakums>({
    id: 0,
    nosaukums: '',
    apraksts: '',
    datums: '',
    laiks: '',
    vieta: '',
    maxDalibnieki: 1,
    currentDalibnieki: 0
  });

  eventForm = form(this.newEventSignal, (e) => {
    required(e.nosaukums, { message: 'Nosaukums ir obligāts' });
    required(e.apraksts, { message: 'Apraksts ir obligāts' });
    required(e.datums, { message: 'Datums ir obligāts' });
    required(e.laiks, { message: 'Laiks ir obligāts' });
    required(e.vieta, { message: 'Vieta ir obligāta' });
    required(e.maxDalibnieki, { message: 'Maksimālais dalībnieku skaits ir obligāts' });
  });

  constructor() {
    this.pasakumsService.getPasakumi().subscribe(data => {
      this.pasakumi.set(data);
    });
  }

  onSignUp(eventId: number) {
    this.successMsg.set('');
    this.errorMsg.set('');
    if (this.signedUpEventIds().includes(eventId)) {
      this.errorMsg.set('Jūs jau esat pieteicies šim pasākumam.');
      return;
    }
    this.signedUpEventIds.set([...this.signedUpEventIds(), eventId]);
    this.pasakumi.set(
      this.pasakumi().map(e =>
        e.id === eventId ? { ...e, currentDalibnieki: e.currentDalibnieki + 1 } : e
      )
    );
    this.successMsg.set('Veiksmīgi pieteikts pasākumam!');
  }

  onCancel(eventId: number) {
    this.successMsg.set('');
    this.errorMsg.set('');
    if (!this.signedUpEventIds().includes(eventId)) {
      this.errorMsg.set('Jūs neesat pieteicies šim pasākumam.');
      return;
    }
    this.signedUpEventIds.set(this.signedUpEventIds().filter(id => id !== eventId));
    this.pasakumi.set(
      this.pasakumi().map(e =>
        e.id === eventId ? { ...e, currentDalibnieki: e.currentDalibnieki - 1 } : e
      )
    );
    this.successMsg.set('Pieteikums veiksmīgi atcelts!');
  }

  onCreateEvent() {
    this.successMsg.set('');
    this.errorMsg.set('');
    this.pasakumsService.createPasakums(this.newEventSignal()).subscribe({
      next: (event) => {
        this.pasakumi.set([...this.pasakumi(), event]);
        this.newEventSignal.set({
          id: 0,
          nosaukums: '',
          apraksts: '',
          datums: '',
          laiks: '',
          vieta: '',
          maxDalibnieki: 1,
          currentDalibnieki: 0
        });
        this.successMsg.set('Pasākums veiksmīgi izveidots!');
      },
      error: (error) => {
        this.errorMsg.set('Neizdevās izveidot pasākumu.');
        console.error('Event creation failed:', error);
      }
    });
  }
}