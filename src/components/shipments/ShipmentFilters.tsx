import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { Shipment, ShipmentType } from '../../types';

interface ShipmentFiltersProps {
  shipments: Shipment[];
  onFilterChange: (filtered: Shipment[]) => void;
}

export default function ShipmentFilters({ shipments, onFilterChange }: ShipmentFiltersProps) {
  const [filters, setFilters] = useState({
    search: '',
    type: '' as ShipmentType | '',
    status: '',
    dateRange: {
      start: '',
      end: '',
    },
  });

  useEffect(() => {
    const filtered = shipments.filter(shipment => {
      const matchesSearch = !filters.search || 
        shipment.id.toLowerCase().includes(filters.search.toLowerCase()) ||
        shipment.origin.toLowerCase().includes(filters.search.toLowerCase()) ||
        shipment.destination.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesType = !filters.type || shipment.type === filters.type;
      const matchesStatus = !filters.status || shipment.status === filters.status;
      
      const matchesDate = (!filters.dateRange.start || 
        new Date(shipment.createdAt) >= new Date(filters.dateRange.start)) &&
        (!filters.dateRange.end || 
        new Date(shipment.createdAt) <= new Date(filters.dateRange.end));

      return matchesSearch && matchesType && matchesStatus && matchesDate;
    });

    onFilterChange(filtered);
  }, [filters, shipments]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search shipments..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>
        </div>

        <select
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value as ShipmentType })}
        >
          <option value="">All Types</option>
          <option value="LTL">LTL</option>
          <option value="FTL">FTL</option>
        </select>

        <select
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in_transit">In Transit</option>
          <option value="delivered">Delivered</option>
        </select>

        <input
          type="date"
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={filters.dateRange.start}
          onChange={(e) => setFilters({
            ...filters,
            dateRange: { ...filters.dateRange, start: e.target.value }
          })}
        />

        <input
          type="date"
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={filters.dateRange.end}
          onChange={(e) => setFilters({
            ...filters,
            dateRange: { ...filters.dateRange, end: e.target.value }
          })}
        />
      </div>
    </div>
  );
}