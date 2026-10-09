import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DrivingCenter } from '../../../core/models/driving-center.model';
import { DrivingCenterService } from '../../../core/services/driving-center.service';
import { CenterCardComponent } from '../../../shared/components/center-card/center-card.component';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-centers-list',
  standalone: true,
  imports: [AsyncPipe, FormsModule, CenterCardComponent],
  templateUrl: './centers-list.component.html',
  styleUrl: './centers-list.component.scss',
})
export class CentersListComponent {
  private readonly centerService = inject(DrivingCenterService);

  search = '';
  cityFilter = 'All';

  readonly centers$: Observable<DrivingCenter[]> = this.centerService.getAllCenters();

  readonly cities$ = this.centers$.pipe(
    map((centers) => ['All', ...new Set(centers.map((c) => c.city))])
  );

  filterCenters(centers: DrivingCenter[]): DrivingCenter[] {
    const q = this.search.trim().toLowerCase();
    return centers.filter((c) => {
      const matchesCity = this.cityFilter === 'All' || c.city === this.cityFilter;
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.tagline.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q);
      return matchesCity && matchesSearch;
    });
  }
}
