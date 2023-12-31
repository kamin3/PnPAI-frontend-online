export interface Plan {
  description: string;
  external_name: string;
  id: string;
  item_family_id: string;
  name: string;
  prices: Price[];
  status: string;
  type: string;
  updated_at: string;
  order: number;
}

export interface Price {
  created_at: string;
  currency_code: string;
  description: string;
  discount: number;
  external_name: string;
  free_quantity: number;
  id: string;
  item_family_id: string;
  item_id: string;
  name: string;
  period: number;
  period_unit: string;
  price: number;
  pricing_model: string;
  status: string;
  trial_period: number;
  trial_period_unit: string;
  updated_at: string;
}

export interface PlanRepresent {
  id: string;
  features: string[];
  name: string;
  order: number;
  monthly_price: number;
  quarter_price?: number;
  quarter_discount?: number;
  annual_price: number;
  annual_discount: number;
  monthly_price_annual_plan: number;
  has_trial: boolean;
  trial_period: number;
  trial_period_unit: string;
}
