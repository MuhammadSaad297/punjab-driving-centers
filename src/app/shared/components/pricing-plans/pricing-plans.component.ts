import { DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PricingPlan } from '../../../core/models/pricing.model';

@Component({
  selector: 'app-pricing-plans',
  standalone: true,
  imports: [DecimalPipe, RouterLink],
  templateUrl: './pricing-plans.component.html',
  styleUrl: './pricing-plans.component.scss',
})
export class PricingPlansComponent {
  @Input({ required: true }) plans: PricingPlan[] = [];
  @Input() centerName = 'Driving center';
  @Input() phone = '';
  @Input() showFootnote = true;
}
