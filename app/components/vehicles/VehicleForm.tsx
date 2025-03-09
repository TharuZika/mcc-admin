'use client';

import { useState, useEffect } from 'react';
import type { Vehicle } from '../../types';

interface VehicleFormProps {
  vehicle?: Vehicle;
  onSubmit: (data: Partial<Vehicle>) => void;
  onCancel: () => void;
}

export default function VehicleForm({ vehicle, onSubmit, onCancel }: VehicleFormProps) {
  const [formData, setFormData] = useState<Partial<Vehicle>>({
    type: '',
    seats: 0,
    model: '',
    plateNo: '',
    make: '',
    year: new Date().getFullYear(),
    pricePerDay: 0,
    pricePerKm: 0,
    isTaxi: false,
    isRent: false,
    status: 'active',
    imgUrl: '',
  });

  useEffect(() => {
    if (vehicle) {
      setFormData(vehicle);
    }
  }, [vehicle]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Basic Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Make</label>
          <input
            type="text"
            name="make"
            value={formData.make}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Model</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md"
            required
          >
            <option value="">Select Type</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Van">Van</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Year</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Plate Number</label>
          <input
            type="text"
            name="plateNo"
            value={formData.plateNo}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Seats</label>
          <input
            type="number"
            name="seats"
            value={formData.seats}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md"
            required
          />
        </div>

        {/* Pricing */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Price Per Day</label>
          <input
            type="number"
            name="pricePerDay"
            value={formData.pricePerDay}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price Per Km</label>
          <input
            type="number"
            name="pricePerKm"
            value={formData.pricePerKm}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md"
            required
          />
        </div>

        {/* Image URL */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            name="imgUrl"
            value={formData.imgUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md"
            required
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md"
            required
          >
            <option value="active">Active</option>
            <option value="maintenance">Maintenance</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Service Type Checkboxes */}
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isTaxi"
              checked={formData.isTaxi}
              onChange={handleCheckboxChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Available for Taxi</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isRent"
              checked={formData.isRent}
              onChange={handleCheckboxChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Available for Rent</span>
          </label>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {vehicle ? 'Update Vehicle' : 'Add Vehicle'}
        </button>
      </div>
    </form>
  );
} 