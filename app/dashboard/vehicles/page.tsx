'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';
import DashboardLayout from '../../components/layout/DashboardLayout';
import VehicleForm from '../../components/vehicles/VehicleForm';
import Modal from '../../components/common/Modal';
import { vehicleService } from '../../services/vehicleService';
import type { Vehicle } from '../../types';

export default function VehiclesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const recordsPerPage = 10;

  // useEffect(() => {
  //   if (status === 'unauthenticated') {
  //     router.push('/login');
  //   }
  // }, [status, router]);

  useEffect(() => {
    fetchVehicles();
  }, [currentPage, status, session]);

  const fetchVehicles = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await vehicleService.getVehicles(currentPage, recordsPerPage);
      setVehicles(response.vehicles);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch vehicles');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddVehicle = async (formData: FormData) => {
    try {
      await vehicleService.addVehicle(formData);
      setIsModalOpen(false);
      fetchVehicles();
    } catch (err) {
      setError('Failed to add vehicle');
      console.error('Error adding vehicle:', err);
    }
  };

  const handleEditVehicle = async (formData: FormData) => {
    try {
      if (selectedVehicle) {
        await vehicleService.updateVehicle(selectedVehicle.id, formData);
        setIsModalOpen(false);
        setSelectedVehicle(undefined);
        fetchVehicles();
      }
    } catch (err) {
      setError('Failed to update vehicle');
      console.error('Error updating vehicle:', err);
    }
  };

  const handleDeleteVehicle = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      try {
        await vehicleService.deleteVehicle(id);
        fetchVehicles();
      } catch (err) {
        setError('Failed to delete vehicle');
        console.error('Error deleting vehicle:', err);
      }
    }
  };

  const openEditModal = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = 
      vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.plateNo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || 
      (typeFilter === 'taxi' && vehicle.isTaxi) ||
      (typeFilter === 'rental' && vehicle.isRent);
    
    const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-green-100 text-green-800';
      case 'MAINTENANCE':
        return 'bg-yellow-100 text-yellow-800';
      case 'INACTIVE':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  // if (status === 'unauthenticated') {
  //   return null; // Will be redirected by the useEffect
  // }

  // if (error) {
  //   console.log(error);
  //   return (
  //     <DashboardLayout>
  //       <div className="flex flex-col items-center justify-center h-full gap-4">
  //         <div className="text-red-600">{error}</div>
  //         <button
  //           onClick={fetchVehicles}
  //           className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
  //         >
  //           Try Again
  //         </button>
  //       </div>
  //     </DashboardLayout>
  //   );
  // }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Vehicles</h1>
          <button
            onClick={() => {
              setSelectedVehicle(undefined);
              setIsModalOpen(true);
            }}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            <FiPlus className="w-4 h-4 mr-2" />
            Add Vehicle
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search vehicles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="taxi">Taxi</option>
            <option value="rental">Rental</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="AVAILABLE">Available</option>
            <option value="MAINTENANCE">Maintenance</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>

        {/* Vehicles Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price/Day
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price/Km
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={vehicle.imgUrl}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {vehicle.make} {vehicle.model}
                        </div>
                        <div className="text-sm text-gray-500">{vehicle.plateNo}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {vehicle.isTaxi && 'Taxi'}
                      {vehicle.isRent && 'Rental'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(vehicle.status)}`}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>LKR{vehicle.pricePerDay}/day</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">

                      <div>LKR{vehicle.pricePerKm}/km</div>

                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => openEditModal(vehicle)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <FiEdit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteVehicle(vehicle.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing page {currentPage} of {totalPages}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        {/* Add/Edit Vehicle Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedVehicle(undefined);
          }}
          title={selectedVehicle ? 'Edit Vehicle' : 'Add Vehicle'}
        >
          <VehicleForm
            vehicle={selectedVehicle}
            onSubmit={selectedVehicle ? handleEditVehicle : handleAddVehicle}
            onCancel={() => {
              setIsModalOpen(false);
              setSelectedVehicle(undefined);
            }}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
} 