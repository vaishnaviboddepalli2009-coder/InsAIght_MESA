export type BusinessType = 'Food Truck' | 'Fine-Dining Cafe' | 'Quick-Service Drive-Thru' | 'Specialty Bakery' | 'Casual Dining';

export type Priority = 'Speed of Service' | 'High Margin Sales' | 'Customer Loyalty' | 'Staff Efficiency';

export interface BusinessProfile {
  name: string;
  location: string;
  type: BusinessType;
  priority: Priority;
  menuContent: string;
}

export interface KPIProposal {
  id: string;
  name: string;
  description: string;
  rationale: string;
  benchmark: string;
  unit: string;
}

export interface Insight {
  id: string;
  kpiId: string;
  title: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
  actionableStep: string;
  context: string;
}

export interface POSData {
  timestamp: string;
  items: {
    category: string;
    item: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  timeToServe?: number; // in seconds
}
