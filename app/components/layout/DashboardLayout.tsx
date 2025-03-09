'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  FiHome, 
  FiUsers, 
  FiTruck, 
  FiCalendar, 
  FiDollarSign,
  FiMenu,
  FiBell,
  FiUser
} from 'react-icons/fi';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { icon: FiHome, label: 'Dashboard', href: '/dashboard' },
    { icon: FiUsers, label: 'Users', href: '/dashboard/users' },
    { icon: FiTruck, label: 'Vehicles', href: '/dashboard/vehicles' },
    { icon: FiCalendar, label: 'Bookings', href: '/dashboard/bookings' },
    { icon: FiDollarSign, label: 'Finance', href: '/dashboard/finance' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } bg-white border-r border-gray-200 w-64`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">MCC Admin</h1>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
            <FiMenu className="w-6 h-6" />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`${isSidebarOpen ? 'lg:ml-64' : ''}`}>
        {/* Header */}
        <header className="fixed top-0 right-0 left-0 z-30 bg-white border-b border-gray-200 lg:left-64">
          <div className="flex items-center justify-between px-4 py-3">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg lg:hidden"
            >
              <FiMenu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-4">
              <button className="p-2">
                <FiBell className="w-6 h-6" />
              </button>
              <button className="p-2">
                <FiUser className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="px-4 pt-20 pb-8">
          {children}
        </main>
      </div>
    </div>
  );
} 