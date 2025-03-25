export interface GraphData {
  date: string;
  value: number;
}

export interface OrderHistory {
  orderId: string;
  amount: number;
  date: string;
}

export interface FinanceData {
  totalRevenue: number;
  totalBookings: number;
  graphData: GraphData[];
  orderHistory: OrderHistory[];
} 