import { getSession } from 'next-auth/react';
import { headers } from 'next/headers';
import { config } from '../config';

interface DashboardData {
    totalUsers: number;
    totalBookings: number;
    totalRevenue: number;
    recentBookings: Booking[];
}

interface Booking {
    id: number;
    user: string;
    date: string;
    amount: number;
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


const API_URL = `${config.apiBaseUrl}`;

export const fetchBookings = async (): Promise<DashboardData> => {
    try {
        const headers = await getAuthHeader();
        const response = await fetch(`${API_URL}/api/admin/bookings`, {
            method: "GET",
            headers: headers,
        });
        const resData = response.json();
        return resData;
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        throw error;
    }
};

export const fetchDashboard = async (): Promise<DashboardData> => {
  try {
      const headers = await getAuthHeader();
      const response = await fetch(`${API_URL}/api/admin/dashboard`, {
          method: "GET",
          headers: headers,
      });
      const resData = response.json();
      return resData;
  } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
  }
};