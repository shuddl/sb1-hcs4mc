import React from 'react';
import { BarChart3, Package, Truck, DollarSign } from 'lucide-react';
import { useShipments } from '../context/ShipmentContext';
import StatusCard from './StatusCard';
import ShipmentList from './ShipmentList';
import Analytics from './Analytics';
import DataUpload from './DataUpload';

export default function Dashboard() {
  const { state } = useShipments();
  const { analytics } = state;

  const stats = [
    { 
      icon: DollarSign, 
      label: 'Total Spend', 
      value: `$${analytics.totalSpend.toLocaleString()}` 
    },
    { 
      icon: Truck, 
      label: 'Avg Transit Time', 
      value: `${analytics.avgTransitTime} days` 
    },
    { 
      icon: Package, 
      label: 'Total Shipments', 
      value: state.shipments.length.toString() 
    },
    { 
      icon: BarChart3, 
      label: 'On-Time Rate', 
      value: `${analytics.onTimeDeliveryRate.toFixed(1)}%` 
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Logistics Dashboard</h1>
        <DataUpload />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatusCard key={index} {...stat} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Analytics />
        </div>
        <div>
          <ShipmentList />
        </div>
      </div>
    </div>
  );
}