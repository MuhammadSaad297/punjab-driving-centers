import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DrivingCenter } from '../../../core/models/driving-center.model';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-center-card',
  standalone: true,
  imports: [RouterLink, StarRatingComponent],
  templateUrl: './center-card.component.html',
  styleUrl: './center-card.component.scss',
})
export class CenterCardComponent {
  @Input({ required: true }) center!: DrivingCenter;
}
