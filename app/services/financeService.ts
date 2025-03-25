import { getSession } from 'next-auth/react';
import { config } from '../config';

interface FinanceData {
    totalRevenue: number;
    totalBookings: number;
    graphData: Array<{ date: string, value: number }>;
    orderHistory: Array<{ orderId: string, amount: number, date: string }>;
}

const getAuthHeader = async () => {
  const session = await getSession();
  if (!session?.user?.token) {
    throw new Error('No active session');
  }
  return {
    'Authorization': `Bearer ${session.user.token}`,
  };
};

export async function fetchFinancePageData(): Promise<FinanceData> {

    const API_URL = `${config.apiBaseUrl}`;

    try {
        const headers = await getAuthHeader();
        const response = await fetch(`${API_URL}/api/admin/finance`, {
            method: "GET",
            headers: headers,
        });

    const data = await response.json();
    return {
        totalRevenue: data.totalRevenue,
        totalBookings: data.totalBookings,
        graphData: data.graphData,
        orderHistory: data.orderHistory
    };
    } catch (error) {
        console.error('Error fetching finance data:', error);
        throw error;
    }
}