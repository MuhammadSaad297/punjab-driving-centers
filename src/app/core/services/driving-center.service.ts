import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, of, shareReplay, switchMap } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  CenterReviewsPayload,
  CentersData,
  DrivingCenter,
  Review,
} from '../models/driving-center.model';

@Injectable({ providedIn: 'root' })
export class DrivingCenterService {
  private readonly http = inject(HttpClient);
  private cache$?: Observable<CentersData>;
  private readonly reviewsCache = new Map<string, Observable<Review[]>>();

  loadCenters(): Observable<CentersData> {
    if (!this.cache$) {
      this.cache$ = this.http.get<CentersData>(environment.dataUrl).pipe(shareReplay(1));
    }
    return this.cache$;
  }

  getAllCenters(): Observable<DrivingCenter[]> {
    return this.loadCenters().pipe(map((data) => data.centers));
  }

  getFeaturedCenters(): Observable<DrivingCenter[]> {
    return this.getAllCenters().pipe(map((centers) => centers.filter((c) => c.featured)));
  }

  getCenterBySlug(slug: string): Observable<DrivingCenter | undefined> {
    return this.getAllCenters().pipe(map((centers) => centers.find((c) => c.slug === slug)));
  }

  getRelatedCenters(ids: string[]): Observable<DrivingCenter[]> {
    return this.getAllCenters().pipe(
      map((centers) => centers.filter((c) => ids.includes(c.id)))
    );
  }

  getReviewsForCenter(center: DrivingCenter): Observable<Review[]> {
    if (center.reviewsFile) {
      if (!this.reviewsCache.has(center.reviewsFile)) {
        const request$ = this.http.get<CenterReviewsPayload>(center.reviewsFile).pipe(
          map((payload) => payload.reviews),
          shareReplay(1)
        );
        this.reviewsCache.set(center.reviewsFile, request$);
      }
      return this.reviewsCache.get(center.reviewsFile)!;
    }
    return of(center.reviews ?? []);
  }

  getFeaturedReviews(slug: string, limit = 6): Observable<Review[]> {
    return this.getCenterBySlug(slug).pipe(
      switchMap((center) => (center ? this.getReviewsForCenter(center) : of([]))),
      map((reviews) => {
        const featured = reviews.filter((r) => r.featured);
        const pool = featured.length ? featured : reviews;
        return pool.slice(0, limit);
      })
    );
  }
}
