'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { FiEye, FiCheck, FiX } from 'react-icons/fi';
import type { Booking, User, Vehicle } from '../../types';
import { fetchBookings } from '@/app/services/dashboardService';

// Dummy data for bookings
const bookings: (Booking & { order: { totalAmount: number; paidAmount: number } })[] = [
  {
    id: '1',
    orderId: 'ORD-001',
    user: {
      id: '1',
      username: 'johndoe',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      role: 'customer',
      mobileNo: '+1234567890',
      isOnline: false,
      onTrip: false,
      status: 'active',
      imgUrl: '/users/john.jpg',
      password: ''
    },
    bookingType: 'taxi',
    tripDate: new Date('2024-03-10'),
    status: 'confirmed',
    vehicle: {
      id: '1',
      type: 'Sedan',
      seats: 4,
      model: 'Toyota Camry',
      plateNo: 'ABC-123',
      make: 'Toyota',
      year: 2022,
      pricePerDay: 50,
      pricePerKm: 0.5,
      isTaxi: true,
      isRent: true,
      imgUrl: '/vehicles/camry.jpg',
      status: 'active',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    pickupLocation: '123 Main St, City',
    dropOffLocation: '456 Park Ave, City',
    order: {
      totalAmount: 45,
      paidAmount: 45
    }
  },
  // Add more dummy bookings as needed
];

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [bookings, setBookings] = useState([]);


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };


  
  
    useEffect(() => {
      fetchBookingsList();
    }, []);
  
  const fetchBookingsList = async () => {
    const response = await fetchBookings();
    console.log(response);
    setBookings(response?.bookings);
  }
  
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = typeFilter ? booking.bookingType === typeFilter : true;
    const matchesStatus = statusFilter ? booking.status === statusFilter : true;
    const matchesDate = dateFilter ? 
      booking.tripDate.toISOString().split('T')[0] === dateFilter : true;
      
    return matchesSearch && matchesType && matchesStatus && matchesDate;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Bookings Management</h1>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">All Types</option>
            <option value="taxi">Taxi</option>
            <option value="rental">Rental</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Bookings Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {booking.orderId}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(booking.tripDate).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {booking.bookingType.toUpperCase()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                      {booking.user.avatarUrl ? (
                        <img
                          src={booking.user.avatarUrl}
                          alt={`${booking.user.firstName} ${booking.user.lastName}`}
                        />
                      ) : (
                        <svg
                          width="800px"
                          height="800px"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g transform="translate(0 -1028.4)">
                            <path d="M12 0c-0.405 0-0.805 0.060326-1.188 0.15625-0.224 0.05678-0.44 0.13135-0.656 0.21875-0.083 0.03401-0.1679 0.05534-0.2498 0.09375-0.034 0.01583-0.06 0.04594-0.0937 0.0625-0.2032 0.10058-0.4021 0.21704-0.5937 0.34375-0.027 0.0174-0.0671 0.01339-0.0938 0.03125-0.0563 0.03864-0.101 0.08419-0.1562 0.12495-0.1569 0.1126-0.3216 0.216-0.4688 0.3438-0.1342 0.1207-0.2494 0.2724-0.375 0.4062-0.4251 0.4359-0.7936 0.8971-1.0938 1.4376-0.5154 0.9034-0.9002 1.9205-1.0624 2.9687-0.0783-0.0165-0.1501-0.0224-0.2188 0-0.5251 0.171-0.6545 1.1685-0.3125 2.2187 0.2007 0.6163 0.5346 1.1015 0.875 1.375 0.4573 1.7778 1.4257 3.2598 2.6875"></path>
                          </g>
                        </svg>
                      )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {booking.user.firstName} {booking.user.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.user.mobileNo}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {booking.vehicle.make} {booking.vehicle.model}
                    </div>
                    <div className="text-sm text-gray-500">
                      {booking.vehicle.plateNo}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${booking.order.totalAmount}
                    </div>
                    <div className="text-sm text-gray-500">
                      {booking.order.totalAmount === booking.order.totalAmount ? (
                        <span className="text-green-600">Paid</span>
                      ) : (
                        <span className="text-red-600">
                          Pending: ${booking.order.totalAmount - booking.order.paidAmount}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900">
                      <FiEye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
          <div className="flex justify-between flex-1 sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Previous
            </button>
            <button className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{' '}
                <span className="font-medium">10</span> of{' '}
                <span className="font-medium">{}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm">
                <button className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50">
                  Previous
                </button>
                <button className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300">
                  3
                </button>
                <button className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 