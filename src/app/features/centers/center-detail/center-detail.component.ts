import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { combineLatest, map, switchMap } from 'rxjs';

import { DrivingCenterService } from '../../../core/services/driving-center.service';
import { CenterCardComponent } from '../../../shared/components/center-card/center-card.component';
import { ReviewsSectionComponent } from '../../../shared/components/reviews-section/reviews-section.component';
import { StarRatingComponent } from '../../../shared/components/star-rating/star-rating.component';
import { PricingPlansComponent } from '../../../shared/components/pricing-plans/pricing-plans.component';

@Component({
  selector: 'app-center-detail',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    RouterLink,
    StarRatingComponent,
    CenterCardComponent,
    ReviewsSectionComponent,
    PricingPlansComponent,
  ],
  templateUrl: './center-detail.component.html',
  styleUrl: './center-detail.component.scss',
})
export class CenterDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly centerService = inject(DrivingCenterService);

  readonly encodeUri = encodeURIComponent;

  readonly centerVm$ = combineLatest([
    this.centerService.loadCenters(),
    this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')),
  ]).pipe(map(([data, slug]) => ({ center: data.centers.find((c) => c.slug === slug) })));

  readonly related$ = this.centerVm$.pipe(
    switchMap(({ center }) =>
      center
        ? this.centerService.getRelatedCenters(center.relatedCenterIds)
        : this.centerService.getFeaturedCenters()
    )
  );
}
