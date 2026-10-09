import { Routes } from '@angular/router';

import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
        title: 'Home',
      },
      {
        path: 'centers',
        loadComponent: () =>
          import('./features/centers/centers-list/centers-list.component').then(
            (m) => m.CentersListComponent
          ),
        title: 'Driving centers',
      },
      {
        path: 'centers/:slug',
        loadComponent: () =>
          import('./features/centers/center-detail/center-detail.component').then(
            (m) => m.CenterDetailComponent
          ),
        title: 'Center details',
      },
      {
        path: 'pricing',
        loadComponent: () =>
          import('./features/pricing/pricing-page/pricing-page.component').then(
            (m) => m.PricingPageComponent
          ),
        title: 'Pricing',
      },
      {
        path: 'about',
        loadComponent: () => import('./features/about/about.component').then((m) => m.AboutComponent),
        title: 'About',
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./features/contact/contact.component').then((m) => m.ContactComponent),
        title: 'Contact',
      },
      { path: '**', redirectTo: '' },
    ],
  },
];
