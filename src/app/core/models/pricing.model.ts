export interface PricingPlan {
  id: string;
  title: string;
  subtitle?: string;
  durationDays?: number;
  pricePkr: number;
  includesPickDrop: boolean;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}
