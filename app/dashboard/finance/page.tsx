'use client';

import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { FiDollarSign, FiTrendingUp, FiTrendingDown, FiCalendar } from 'react-icons/fi';

// Dummy data for financial statistics
const financialStats = {
  totalRevenue: 125450,
  monthlyRevenue: 15780,
  weeklyRevenue: 4320,
  dailyRevenue: 645,
  monthlyGrowth: 12.5,
  pendingPayments: 2450,
  revenueByService: {
    taxi: 8450,
    rental: 7330
  },
  revenueByMonth: [
    { month: 'Jan', revenue: 12000 },
    { month: 'Feb', revenue: 14500 },
    { month: 'Mar', revenue: 15780 },
    // Add more months...
  ]
};

export default function FinancePage() {
  const [dateRange, setDateRange] = useState('monthly');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Financial Overview</h1>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Revenue */}
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-2xl font-semibold">{formatCurrency(financialStats.totalRevenue)}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FiDollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Monthly Revenue */}
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Monthly Revenue</p>
                <p className="text-2xl font-semibold">{formatCurrency(financialStats.monthlyRevenue)}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FiTrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600">
              +{financialStats.monthlyGrowth}% from last month
            </div>
          </div>

          {/* Weekly Revenue */}
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Weekly Revenue</p>
                <p className="text-2xl font-semibold">{formatCurrency(financialStats.weeklyRevenue)}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <FiCalendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Pending Payments */}
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending Payments</p>
                <p className="text-2xl font-semibold">{formatCurrency(financialStats.pendingPayments)}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <FiTrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Revenue by Service */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Revenue by Service</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Taxi Service</p>
                  <p className="text-lg font-semibold">{formatCurrency(financialStats.revenueByService.taxi)}</p>
                </div>
                <div className="w-24 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-600 rounded-full"
                    style={{
                      width: `${(financialStats.revenueByService.taxi /
                        (financialStats.revenueByService.taxi + financialStats.revenueByService.rental)) *
                        100}%`
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Rental Service</p>
                  <p className="text-lg font-semibold">{formatCurrency(financialStats.revenueByService.rental)}</p>
                </div>
                <div className="w-24 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-green-600 rounded-full"
                    style={{
                      width: `${(financialStats.revenueByService.rental /
                        (financialStats.revenueByService.taxi + financialStats.revenueByService.rental)) *
                        100}%`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Revenue Trend */}
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Monthly Revenue Trend</h2>
            <div className="relative h-60">
              <div className="absolute inset-0 flex items-end justify-between">
                {financialStats.revenueByMonth.map((month) => (
                  <div key={month.month} className="flex flex-col items-center">
                    <div
                      className="w-12 bg-blue-600 rounded-t"
                      style={{
                        height: `${(month.revenue / Math.max(...financialStats.revenueByMonth.map(m => m.revenue))) * 200}px`
                      }}
                    />
                    <p className="mt-2 text-sm text-gray-500">{month.month}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-3">Transaction ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Service</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3">TRX-001</td>
                  <td>John Doe</td>
                  <td>Taxi</td>
                  <td>2024-03-09</td>
                  <td>{formatCurrency(45)}</td>
                  <td>
                    <span className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full">
                      Completed
                    </span>
                  </td>
                </tr>
                {/* Add more transaction rows */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 