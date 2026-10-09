export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  highlights?: string[];
  featured?: boolean;
  ownerResponse?: string;
  ownerResponseDate?: string;
}

export interface CenterReviewsPayload {
  centerId: string;
  googleReviewCount: number;
  averageRating: number;
  reviews: Review[];
}

import { PricingPlan } from './pricing.model';

export interface ServiceOffering {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface DrivingCenter {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  rating: number;
  reviewCount: number;
  address: string;
  city: string;
  phone: string;
  website: string;
  hours: string;
  plusCode?: string;
  badges: string[];
  ownerMessage?: string;
  ownerMessageDate?: string;
  services: ServiceOffering[];
  pricingPlans?: PricingPlan[];
  reviewKeywords: string[];
  /** Inline reviews (optional if reviewsFile is set). */
  reviews: Review[];
  /** Loads additional reviews from JSON (e.g. Google reviews export). */
  reviewsFile?: string;
  relatedCenterIds: string[];
  featured: boolean;
}

export interface CentersData {
  lastUpdated: string;
  centers: DrivingCenter[];
}
