import { NextResponse } from 'next/server';
import type { Vehicle } from '@/app/types';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

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

    const requiredFields = ['type', 'seats', 'model', 'plateNo', 'make', 'year', 'pricePerDay', 'pricePerKm', 'status'];
    for (const field of requiredFields) {
      if (!vehicleData[field as keyof typeof vehicleData]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const imgUrl = '/vehicles/placeholder.jpg';

    const newVehicle: Vehicle = {
      id: Date.now().toString(), 
      ...vehicleData,
      imgUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return NextResponse.json(newVehicle);
  } catch (error) {
    console.error('Error adding vehicle:', error);
    return NextResponse.json(
      { error: 'Failed to add vehicle' },
      { status: 500 }
    );
  }
} 