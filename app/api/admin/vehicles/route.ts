import { NextResponse } from 'next/server';
import type { Vehicle } from '@/app/types';

// Dummy data for vehicles
const vehicles: Vehicle[] = [
  {
    id: '1',
    type: 'CAR',
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
  {
    id: '2',
    type: 'VAN',
    seats: 8,
    model: 'Toyota Hiace',
    plateNo: 'XYZ-789',
    make: 'Toyota',
    year: 2023,
    pricePerDay: 80,
    pricePerKm: 0.8,
    isTaxi: true,
    isRent: true,
    imgUrl: '/vehicles/hiace.jpg',
    status: 'active',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02')
  },
  // Add more dummy vehicles as needed
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const recordsPerPage = parseInt(searchParams.get('recordsPerPage') || '10');

    // Calculate pagination
    const startIndex = (page - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const paginatedVehicles = vehicles.slice(startIndex, endIndex);
    const totalPages = Math.ceil(vehicles.length / recordsPerPage);

    return NextResponse.json({
      vehicles: paginatedVehicles,
      totalPages,
    });
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vehicles' },
      { status: 500 }
    );
  }
} 