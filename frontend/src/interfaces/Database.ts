export interface Transaction {
  _id: string;
  name: string;
  amount: number;
  date: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IncomeSource {
  name: string;
  amount: number;
}

export interface Budget {
  _id: string;
  month: number;
  year: number;
  name: string;
  budgetAmount: number;
  incomeSources: IncomeSource[];
}
