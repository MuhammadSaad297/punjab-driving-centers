import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AppConfigService } from '../../../core/services/app-config.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly config = inject(AppConfigService);
  readonly year = new Date().getFullYear();
}
