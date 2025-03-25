'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { FiDollarSign } from 'react-icons/fi';
import { BsCart4 } from 'react-icons/bs';
import { fetchFinancePageData } from '@/app/services/financeService';
import { Line } from 'react-chartjs-2';
import PDFDownloadButton from '@/app/components/PDFDownloadButton';
import Spinner from '@/app/components/Spinner';
import type { FinanceData } from '@/app/types/finance';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  Scale,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function FinancePage() {
  const [financeData, setFinanceData] = useState<FinanceData>({
    totalRevenue: 0,
    totalBookings: 0,
    graphData: [],
    orderHistory: []
  });
  const [isLoading, setIsLoading] = useState(true);

  const formatCurrency = (amount: number) => {
    return `LKR ${amount.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  useEffect(() => {
    fetchFinanceData();
  }, []);

  const fetchFinanceData = async () => {
    try {
      setIsLoading(true);
      const response = await fetchFinancePageData();
      setFinanceData(response);
    } catch (error) {
      console.error('Error fetching finance data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const chartData = {
    labels: financeData.graphData.map(item => formatDate(item.date)),
    datasets: [
      {
        label: 'Revenue',
        data: financeData.graphData.map(item => item.value),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          boxWidth: 10,
          usePointStyle: true,
          pointStyle: 'circle',
        }
      },
      title: {
        display: true,
        text: 'Revenue Trend',
        align: 'start',
        font: {
          size: 16,
          weight: 500
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 12
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: function(this: Scale, tickValue: number | string) {
            const value = Number(tickValue);
            return `LKR ${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
          },
          font: {
            size: 12
          }
        },
      },
    },
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Spinner />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Financial Overview</h1>
          <div className="flex items-center gap-4">
            <PDFDownloadButton financeData={financeData} />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {/* Total Revenue */}
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="flex flex-col">
              <div className="text-sm text-gray-500 mb-2">Total Revenue</div>
              <div className="text-3xl font-normal mb-4">LKR {financeData.totalRevenue.toFixed(2)}</div>
              <div className="flex justify-end">
                <div className="p-3 bg-blue-50 rounded-full">
                  <FiDollarSign className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Total Bookings */}
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="flex flex-col">
              <div className="text-sm text-gray-500 mb-2">Total Bookings</div>
              <div className="text-3xl font-normal mb-4">{financeData.totalBookings}</div>
              <div className="flex justify-end">
                <div className="p-3 bg-green-50 rounded-full">
                  <BsCart4 className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Graph */}
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="h-[400px]">
            <Line options={chartOptions} data={chartData} />
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-6">Recent Transactions</h2>
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="text-gray-600 font-medium pb-4">Order ID</th>
                  <th className="text-gray-600 font-medium pb-4">Date</th>
                  <th className="text-gray-600 font-medium pb-4">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {financeData.orderHistory.map((order) => (
                  <tr key={order.orderId}>
                    <td className="py-4">#{order.orderId}</td>
                    <td className="py-4">{formatDate(order.date)}</td>
                    <td className="py-4">{formatCurrency(order.amount)}</td>
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