import { Component, inject } from '@angular/core';

import { AppConfigService } from '../../core/services/app-config.service';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  readonly config = inject(AppConfigService);
}
