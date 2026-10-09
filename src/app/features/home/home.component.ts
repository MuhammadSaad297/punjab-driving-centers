import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { DrivingCenterService } from '../../core/services/driving-center.service';
import { AppConfigService } from '../../core/services/app-config.service';
import { CenterCardComponent } from '../../shared/components/center-card/center-card.component';
import { PricingPlansComponent } from '../../shared/components/pricing-plans/pricing-plans.component';
import { ReviewCardComponent } from '../../shared/components/review-card/review-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, RouterLink, CenterCardComponent, PricingPlansComponent, ReviewCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly centerService = inject(DrivingCenterService);
  readonly config = inject(AppConfigService);

  readonly featured$ = this.centerService.getFeaturedCenters();

  readonly pricingCenter$ = this.centerService
    .getCenterBySlug('punjab-driving-center')
    .pipe(map((center) => center ?? null));

  readonly testimonialReviews$ = this.centerService.getFeaturedReviews('punjab-driving-center', 6);
}
