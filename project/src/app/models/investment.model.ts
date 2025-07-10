export interface Investment {
  id: number;
  investAmount: number;
  dailyIncome: number;
  totalDays: number;
  totalIncome: number;
  type: 'stable' | 'daily' | 'advanced';
}

export interface User {
  id: number;
  name: string;
  email: string;
  balance: number;
  avatar?: string;
  vipLevel?: number;
}