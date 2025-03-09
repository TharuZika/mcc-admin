'use client';

import DashboardLayout from '../components/layout/DashboardLayout';
import { FiUsers, FiTruck, FiCalendar, FiDollarSign } from 'react-icons/fi';

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
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="p-6 bg-white rounded-lg shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                </div>
                <div className="p-3 bg-gray-100 rounded-full">
                  <stat.icon className="w-6 h-6 text-gray-700" />
                </div>
              </div>
              <div className={`mt-2 text-sm ${
                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change} from last month
              </div>
            </div>
          ))}
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
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b">
                    <td className="py-3">{booking.id}</td>
                    <td>{booking.customer}</td>
                    <td>{booking.type}</td>
                    <td>{booking.date}</td>
                    <td>{booking.amount}</td>
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