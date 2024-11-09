import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { useShipments } from '../context/ShipmentContext';

export default function DataUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { dispatch } = useShipments();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const shipments = JSON.parse(e.target?.result as string);
          dispatch({ type: 'ADD_SHIPMENTS', payload: shipments });
          dispatch({ type: 'UPDATE_ANALYTICS' });
        } catch (error) {
          alert('Error parsing file. Please ensure it\'s a valid JSON format.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".json"
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Upload className="w-4 h-4" />
        <span>Upload Shipment Data</span>
      </button>
    </div>
  );
}