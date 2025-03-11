import { NextResponse } from 'next/server';
import type { Vehicle } from '@/app/types';

// Dummy data for vehicles (in a real app, this would be in a database)
let vehicles: Vehicle[] = [
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
  // Add more dummy vehicles as needed
];

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Find the vehicle to delete
    const vehicleIndex = vehicles.findIndex(v => v.id === id);
    if (vehicleIndex === -1) {
      return NextResponse.json(
        { error: 'Vehicle not found' },
        { status: 404 }
      );
    }

    // Remove the vehicle from the array
    vehicles.splice(vehicleIndex, 1);

    // TODO: Delete from database
    // For now, we'll just return a success response
    return NextResponse.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    return NextResponse.json(
      { error: 'Failed to delete vehicle' },
      { status: 500 }
    );
  }
} 