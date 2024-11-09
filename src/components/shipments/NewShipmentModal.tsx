import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useShipments } from '../../context/ShipmentContext';
import { Shipment, ShipmentType } from '../../types';

interface NewShipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewShipmentModal({ isOpen, onClose }: NewShipmentModalProps) {
  const { dispatch } = useShipments();
  const [formData, setFormData] = useState({
    type: 'LTL' as ShipmentType,
    origin: '',
    destination: '',
    weight: '',
    dimensions: {
      length: '',
      width: '',
      height: '',
    },
    carrier: '',
    rate: '',
    estimatedDelivery: '',
  });

  const carriers = [
    { id: 'fedex', name: 'FedEx Freight' },
    { id: 'ups', name: 'UPS Freight' },
    { id: 'xpo', name: 'XPO Logistics' },
    { id: 'yrc', name: 'Yellow/YRC' },
    { id: 'estes', name: 'Estes Express' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newShipment: Shipment = {
      id: `SHP${Math.random().toString(36).substr(2, 9)}`,
      type: formData.type,
      origin: formData.origin,
      destination: formData.destination,
      weight: Number(formData.weight),
      dimensions: {
        length: Number(formData.dimensions.length),
        width: Number(formData.dimensions.width),
        height: Number(formData.dimensions.height),
      },
      status: 'pending',
      carrier: formData.carrier,
      rate: Number(formData.rate),
      estimatedDelivery: formData.estimatedDelivery,
      createdAt: new Date().toISOString(),
    };

    dispatch({ type: 'ADD_SHIPMENTS', payload: [newShipment] });
    dispatch({ type: 'UPDATE_ANALYTICS' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Create New Shipment</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shipment Type
              </label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as ShipmentType })}
                className="w-full rounded-lg"
              >
                <option value="LTL">LTL</option>
                <option value="FTL">Full Truckload</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Carrier
              </label>
              <select
                required
                value={formData.carrier}
                onChange={(e) => setFormData({ ...formData, carrier: e.target.value })}
                className="w-full rounded-lg"
              >
                <option value="">Select Carrier</option>
                {carriers.map((carrier) => (
                  <option key={carrier.id} value={carrier.id}>
                    {carrier.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Origin
              </label>
              <input
                type="text"
                required
                placeholder="City, State"
                value={formData.origin}
                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                className="w-full rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Destination
              </label>
              <input
                type="text"
                required
                placeholder="City, State"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                className="w-full rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight (lbs)
              </label>
              <input
                type="number"
                required
                placeholder="Enter weight"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                className="w-full rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rate ($)
              </label>
              <input
                type="number"
                required
                placeholder="Enter rate"
                value={formData.rate}
                onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                className="w-full rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Length (in)
              </label>
              <input
                type="number"
                required
                placeholder="Length"
                value={formData.dimensions.length}
                onChange={(e) => setFormData({
                  ...formData,
                  dimensions: { ...formData.dimensions, length: e.target.value }
                })}
                className="w-full rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Width (in)
              </label>
              <input
                type="number"
                required
                placeholder="Width"
                value={formData.dimensions.width}
                onChange={(e) => setFormData({
                  ...formData,
                  dimensions: { ...formData.dimensions, width: e.target.value }
                })}
                className="w-full rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Height (in)
              </label>
              <input
                type="number"
                required
                placeholder="Height"
                value={formData.dimensions.height}
                onChange={(e) => setFormData({
                  ...formData,
                  dimensions: { ...formData.dimensions, height: e.target.value }
                })}
                className="w-full rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estimated Delivery Date
            </label>
            <input
              type="date"
              required
              value={formData.estimatedDelivery}
              onChange={(e) => setFormData({ ...formData, estimatedDelivery: e.target.value })}
              className="w-full rounded-lg"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Shipment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}