import { AsyncPipe } from '@angular/common';
import { Component, Input, OnChanges, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { DrivingCenter, Review } from '../../../core/models/driving-center.model';
import { DrivingCenterService } from '../../../core/services/driving-center.service';
import { ReviewCardComponent } from '../review-card/review-card.component';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-reviews-section',
  standalone: true,
  imports: [AsyncPipe, ReviewCardComponent, StarRatingComponent],
  templateUrl: './reviews-section.component.html',
  styleUrl: './reviews-section.component.scss',
})
export class ReviewsSectionComponent implements OnChanges {
  private readonly centerService = inject(DrivingCenterService);

  @Input({ required: true }) center!: DrivingCenter;
  @Input() pageSize = 9;
  @Input() compact = false;

  reviews$?: Observable<Review[]>;
  visibleCount = this.pageSize;

  ngOnChanges(): void {
    this.reviews$ = this.centerService.getReviewsForCenter(this.center);
    this.visibleCount = this.pageSize;
  }

  showMore(total: number): void {
    this.visibleCount = Math.min(this.visibleCount + this.pageSize, total);
  }

  canShowMore(total: number): boolean {
    return this.visibleCount < total;
  }
}
