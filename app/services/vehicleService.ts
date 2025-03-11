import type { Vehicle } from '../types';
import { getSession } from 'next-auth/react';
import { config } from '../config';

interface VehicleResponse {
  vehicles: Vehicle[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

interface VehiclePayload {
  type: string;
  seats: number;
  model: string;
  plateNo: string;
  make: string;
  pricePerDay: number;
  pricePerKm: number;
  isTaxi: boolean;
  isRent: boolean;
  status: string;
  year: number;
  image: File | null;
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

export const vehicleService = {
  async getVehicles(page: number = 1, recordsPerPage: number = 10): Promise<VehicleResponse> {
    try {
      const headers = await getAuthHeader();
      const response = await fetch(
        `${config.apiBaseUrl}/api/admin/vehicles?page=${page}&recordsPerPage=${recordsPerPage}`,
        { headers }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Session expired. Please login again.');
        }
        throw new Error('Failed to fetch vehicles');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      throw error;
    }
  },

  async addVehicle(formData: FormData): Promise<void> {
    try {
      const headers = await getAuthHeader();
      const response = await fetch(`${config.apiBaseUrl}/api/admin/vehicles/add`, {
        method: 'POST',
        headers: {
          ...headers,
        },
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Session expired. Please login again.');
        }
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add vehicle');
      }
    } catch (error) {
      console.error('Error adding vehicle:', error);
      throw error;
    }
  },

  async updateVehicle(id: string, formData: FormData): Promise<void> {
    try {
      const headers = await getAuthHeader();
      const response = await fetch(`${config.apiBaseUrl}/api/admin/vehicles/update`, {
        method: 'POST',
        headers: {
          ...headers,
        },
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Session expired. Please login again.');
        }
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update vehicle');
      }
    } catch (error) {
      console.error('Error updating vehicle:', error);
      throw error;
    }
  },

  async deleteVehicle(id: string): Promise<void> {
    try {
      const headers = await getAuthHeader();
      const response = await fetch(`${config.apiBaseUrl}/api/admin/vehicles/${id}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Session expired. Please login again.');
        }
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete vehicle');
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      throw error;
    }
  }
}; 