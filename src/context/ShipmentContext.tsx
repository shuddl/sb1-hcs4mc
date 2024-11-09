import React, { createContext, useContext, useReducer } from 'react';
import { Shipment } from '../types';

interface ShipmentState {
  shipments: Shipment[];
  analytics: {
    totalSpend: number;
    avgTransitTime: number;
    onTimeDeliveryRate: number;
    carrierPerformance: Record<string, number>;
  };
}

type ShipmentAction = 
  | { type: 'ADD_SHIPMENTS'; payload: Shipment[] }
  | { type: 'UPDATE_ANALYTICS' }
  | { type: 'UPDATE_SHIPMENT'; payload: { id: string; updates: Partial<Shipment> } };

const initialState: ShipmentState = {
  shipments: [],
  analytics: {
    totalSpend: 0,
    avgTransitTime: 0,
    onTimeDeliveryRate: 0,
    carrierPerformance: {},
  },
};

const ShipmentContext = createContext<{
  state: ShipmentState;
  dispatch: React.Dispatch<ShipmentAction>;
} | undefined>(undefined);

function shipmentReducer(state: ShipmentState, action: ShipmentAction): ShipmentState {
  switch (action.type) {
    case 'ADD_SHIPMENTS':
      return {
        ...state,
        shipments: [...state.shipments, ...action.payload],
      };
    case 'UPDATE_ANALYTICS':
      const analytics = calculateAnalytics(state.shipments);
      return {
        ...state,
        analytics,
      };
    case 'UPDATE_SHIPMENT':
      const updatedShipments = state.shipments.map(shipment =>
        shipment.id === action.payload.id
          ? { ...shipment, ...action.payload.updates }
          : shipment
      );
      return {
        ...state,
        shipments: updatedShipments,
      };
    default:
      return state;
  }
}

function calculateAnalytics(shipments: Shipment[]) {
  const totalSpend = shipments.reduce((sum, s) => sum + (s.rate || 0), 0);
  const deliveredShipments = shipments.filter(s => s.status === 'delivered');
  const onTimeDeliveries = deliveredShipments.length;
  
  const carrierPerformance = shipments.reduce((acc, s) => {
    if (s.carrier) {
      acc[s.carrier] = (acc[s.carrier] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // Calculate average transit time
  const avgTransitTime = deliveredShipments.length > 0
    ? deliveredShipments.reduce((sum, s) => {
        const deliveryDate = new Date(s.estimatedDelivery || '');
        const createDate = new Date(s.createdAt);
        return sum + (deliveryDate.getTime() - createDate.getTime()) / (1000 * 60 * 60 * 24);
      }, 0) / deliveredShipments.length
    : 0;

  return {
    totalSpend,
    avgTransitTime,
    onTimeDeliveryRate: shipments.length > 0 
      ? (onTimeDeliveries / shipments.length) * 100 
      : 0,
    carrierPerformance,
  };
}

export function ShipmentProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(shipmentReducer, initialState);

  return (
    <ShipmentContext.Provider value={{ state, dispatch }}>
      {children}
    </ShipmentContext.Provider>
  );
}

export function useShipments() {
  const context = useContext(ShipmentContext);
  if (context === undefined) {
    throw new Error('useShipments must be used within a ShipmentProvider');
  }
  return context;
}