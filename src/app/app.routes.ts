import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { EventsComponent } from './events/events';

export const routes: Routes = [
{ path: '', redirectTo: 'login', pathMatch: 'full' },
{ path: 'login', component: LoginComponent },
{ path: 'events', component: EventsComponent },
{ path: '**', redirectTo: 'login' }
];