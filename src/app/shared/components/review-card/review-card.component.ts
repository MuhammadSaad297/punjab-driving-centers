import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Review } from '../../../core/models/driving-center.model';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [DatePipe, StarRatingComponent],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss',
})
export class ReviewCardComponent {
  @Input({ required: true }) review!: Review;
}
