import { Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
})
export class StarRatingComponent {
  @Input({ required: true }) rating = 0;
  @Input() showValue = true;

  get stars(): boolean[] {
    const full = Math.round(this.rating);
    return Array.from({ length: 5 }, (_, i) => i < full);
  }
}
