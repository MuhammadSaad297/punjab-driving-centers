import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { DrivingCenterService } from '../../../core/services/driving-center.service';
import { PricingPlansComponent } from '../../../shared/components/pricing-plans/pricing-plans.component';

@Component({
  selector: 'app-pricing-page',
  standalone: true,
  imports: [AsyncPipe, RouterLink, PricingPlansComponent],
  templateUrl: './pricing-page.component.html',
  styleUrl: './pricing-page.component.scss',
})
export class PricingPageComponent {
  private readonly centerService = inject(DrivingCenterService);

  readonly center$ = this.centerService
    .getCenterBySlug('punjab-driving-center')
    .pipe(map((center) => center ?? null));
}
