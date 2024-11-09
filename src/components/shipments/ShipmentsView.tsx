import React, { useState } from 'react';
import { useShipments } from '../../context/ShipmentContext';
import ShipmentFilters from './ShipmentFilters';
import ShipmentTable from './ShipmentTable';
import NewShipmentModal from './NewShipmentModal';
import { Plus } from 'lucide-react';
import { Shipment } from '../../types';

export default function ShipmentsView() {
  const { state } = useShipments();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredShipments, setFilteredShipments] = useState<Shipment[]>(state.shipments);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Shipment;
    direction: 'asc' | 'desc';
  }>({ key: 'createdAt', direction: 'desc' });

  const handleSort = (key: keyof Shipment) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
    
    const sorted = [...filteredShipments].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    
    setFilteredShipments(sorted);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Shipment Management</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-5 h-5" />
          <span>New Shipment</span>
        </button>
      </div>

      <ShipmentFilters 
        shipments={state.shipments} 
        onFilterChange={setFilteredShipments} 
      />
      
      <ShipmentTable 
        shipments={filteredShipments}
        sortConfig={sortConfig}
        onSort={handleSort}
      />

      <NewShipmentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}