export interface Vehicle {
  id: string;
  type: string;
  seats: number;
  model: string;
  plateNo: string;
  make: string;
  year: number;
  pricePerDay: number;
  pricePerKm: number;
  isTaxi: boolean;
  isRent: boolean;
  imgUrl: string;
  status: 'active' | 'maintenance' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'driver' | 'customer';
  mobileNo: string;
  driverLicNo?: string;
  isOnline: boolean;
  onTrip: boolean;
  status: 'active' | 'inactive' | 'suspended';
  imgUrl: string;
}

export interface Booking {
  id: string;
  orderId: string;
  user: User;
  bookingType: 'taxi' | 'rental';
  tripDate: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  vehicle: Vehicle;
  pickupLocation: string;
  dropOffLocation: string;
}

export interface Order {
  id: string;
  date: Date;
  totalAmount: number;
  paidAmount: number;
  paymentMethod: 'cash' | 'card' | 'online';
  cardToken?: string;
  booking: Booking;
} 