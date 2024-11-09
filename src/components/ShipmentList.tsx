import React from 'react';
import { Package, ArrowRight } from 'lucide-react';

export default function ShipmentList() {
  const shipments = [
    {
      id: 'SHP001',
      origin: 'Los Angeles, CA',
      destination: 'Chicago, IL',
      status: 'in_transit',
      carrier: 'FastFreight',
      eta: '2024-03-15',
    },
    {
      id: 'SHP002',
      origin: 'Miami, FL',
      destination: 'New York, NY',
      status: 'pending',
      carrier: 'SpeedCargo',
      eta: '2024-03-16',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Active Shipments</h2>
      <div className="space-y-4">
        {shipments.map((shipment) => (
          <div key={shipment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Package className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">{shipment.id}</p>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <span>{shipment.origin}</span>
                    <ArrowRight className="w-4 h-4 mx-2" />
                    <span>{shipment.destination}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  shipment.status === 'in_transit' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {shipment.status === 'in_transit' ? 'In Transit' : 'Pending'}
                </span>
                <p className="text-sm text-gray-600 mt-1">ETA: {shipment.eta}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}