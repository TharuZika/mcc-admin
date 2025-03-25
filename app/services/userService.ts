import { getSession } from 'next-auth/react';
import { headers } from 'next/headers';
import { config } from '../config';
import type { User } from '../types';

interface UserResponse {
  users: User[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
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

export const fetchUsers = async (): Promise<UserResponse> => {
    try {
        const headers = await getAuthHeader();
        const response = await fetch(`${API_URL}/api/admin/users`, {
            method: "GET",
            headers: headers,
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Session expired. Please login again.');
            }
            throw new Error('Failed to fetch users');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

