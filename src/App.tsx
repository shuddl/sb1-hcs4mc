import React from 'react';
import Navigation from './components/Navigation';
import ShipmentsView from './components/shipments/ShipmentsView';
import { ShipmentProvider } from './context/ShipmentContext';

function App() {
  return (
    <ShipmentProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          <Navigation />
          <main className="flex-1 lg:ml-64 min-h-screen">
            <ShipmentsView />
          </main>
        </div>
      </div>
    </ShipmentProvider>
  );
}

export default App;