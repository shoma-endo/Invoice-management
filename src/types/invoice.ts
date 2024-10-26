export interface Invoice {
  id: number;
  number: string;
  date: string;
  amount: string;
  status: string;
  statusColor: string;
  fileName?: string;
}