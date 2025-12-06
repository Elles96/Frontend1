import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: 'login',
        loadComponent: () => import('./login/login').then(m => m.Login),
        title: 'Login'
    },
    {
        path: 'events',
        loadComponent: () => import('./events/events').then(m => m.Events),
        title: 'Events'
    },
    {
        path: '**',
        loadComponent: () => import('./not-found/not-found').then(m => m.NotFound),
        title: 'Not Found'
    }
];
