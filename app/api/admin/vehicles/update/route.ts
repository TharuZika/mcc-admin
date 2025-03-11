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

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Extract data from FormData
    const vehicleData = {
      type: formData.get('type') as string,
      seats: parseInt(formData.get('seats') as string),
      model: formData.get('model') as string,
      plateNo: formData.get('plateNo') as string,
      make: formData.get('make') as string,
      year: parseInt(formData.get('year') as string),
      pricePerDay: parseFloat(formData.get('pricePerDay') as string),
      pricePerKm: parseFloat(formData.get('pricePerKm') as string),
      isTaxi: formData.get('isTaxi') === 'true',
      isRent: formData.get('isRent') === 'true',
      status: formData.get('status') as string,
      image: formData.get('image') as File | null,
    };

    // Validate required fields
    const requiredFields = ['type', 'seats', 'model', 'plateNo', 'make', 'year', 'pricePerDay', 'pricePerKm', 'status'];
    for (const field of requiredFields) {
      if (!vehicleData[field as keyof typeof vehicleData]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // TODO: Handle image upload and storage if a new image is provided
    // For now, we'll just use the existing image URL
    const imgUrl = '/vehicles/placeholder.jpg';

    // Update vehicle in the dummy data
    const updatedVehicle: Vehicle = {
      id: Date.now().toString(), // Temporary ID generation
      ...vehicleData,
      imgUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // TODO: Update in database
    // For now, we'll just return the updated vehicle
    return NextResponse.json(updatedVehicle);
  } catch (error) {
    console.error('Error updating vehicle:', error);
    return NextResponse.json(
      { error: 'Failed to update vehicle' },
      { status: 500 }
    );
  }
} 