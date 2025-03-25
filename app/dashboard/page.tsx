'use client';

import DashboardLayout from '../components/layout/DashboardLayout';
import { FiUsers, FiTruck, FiCalendar, FiDollarSign } from 'react-icons/fi';
import { fetchBookings, fetchDashboard } from '../services/dashboardService';
import { useEffect, useState } from 'react';

const stats = [
  {
    title: 'Total Users',
    value: '2,345',
    icon: FiUsers,
    change: '+12%',
    changeType: 'increase'
  },
  {
    title: 'Active Vehicles',
    value: '145',
    icon: FiTruck,
    change: '+5%',
    changeType: 'increase'
  },
  {
    title: 'Today\'s Bookings',
    value: '48',
    icon: FiCalendar,
    change: '-3%',
    changeType: 'decrease'
  },
  {
    title: 'Revenue (MTD)',
    value: '$32,450',
    icon: FiDollarSign,
    change: '+18%',
    changeType: 'increase'
  }
];

const recentBookings = [
  {
    id: '1',
    customer: 'John Doe',
    type: 'Taxi',
    date: '2024-03-09',
    amount: '$45',
    status: 'completed'
  },
  {
    id: '2',
    customer: 'Jane Smith',
    type: 'Rental',
    date: '2024-03-09',
    amount: '$120',
    status: 'pending'
  },
  // Add more dummy data as needed
];



export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState({});
  const [bookings, setBookings] = useState([]);


  useEffect(() => {
    fetchBookingsList();
    fetchDasboardData();
  }, []);

const fetchBookingsList = async () => {
  const response = await fetchBookings();
  console.log(response);
  setBookings(response?.bookings);
}

const fetchDasboardData = async () => {
  const response = await fetchDashboard()
  setDashboardData(response);
}


  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

            <div
              className="p-6 bg-white rounded-lg shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Users</p>
                  <p className="text-2xl font-semibold">{dashboardData?.totalUsers || 0}</p>
                </div>
                <div className="p-3 bg-gray-100 rounded-full">
                  <FiUsers className="w-6 h-6 text-gray-700" />
                </div>
              </div>
            </div>

            <div
              className="p-6 bg-white rounded-lg shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Active Vehicles</p>
                  <p className="text-2xl font-semibold">{dashboardData?.totalVehicles || 0}</p>
                </div>
                <div className="p-3 bg-gray-100 rounded-full">
                  <FiTruck className="w-6 h-6 text-gray-700" />
                </div>
              </div>
            </div>

            <div
              className="p-6 bg-white rounded-lg shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Bookings</p>
                  <p className="text-2xl font-semibold">{dashboardData?.totalBookings || 0}</p>
                </div>
                <div className="p-3 bg-gray-100 rounded-full">
                  <FiCalendar className="w-6 h-6 text-gray-700" />
                </div>
              </div>
            </div>

            <div
              className="p-6 bg-white rounded-lg shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Revenue (LKR)</p>
                  <p className="text-2xl font-semibold">{dashboardData?.totalRevenue || 0.00} LKR</p>
                </div>
                <div className="p-3 bg-gray-100 rounded-full">
                  <FiDollarSign className="w-6 h-6 text-gray-700" />
                </div>
              </div>
            </div>

        </div>

        {/* Recent Bookings */}
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Recent Bookings</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-3">Booking ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Vehicle</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b">
                    <td className="py-3">{booking.id}</td>
                    <td>{booking.user.firstName}</td>
                    <td>{booking.vehicle.plateNo}</td>
                    <td>{booking.bookingType}</td>
                    <td>{new Date(booking.tripDate).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}</td>
                    <td>LKR {booking.order.totalAmount}</td>
                    <td>
                      <span className={`px-2 py-1 text-sm rounded-full ${
                        booking.status === 'completed' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 