export type ShipmentType = 'LTL' | 'FTL';

export interface Shipment {
  id: string;
  type: ShipmentType;
  origin: string;
  destination: string;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  status: 'pending' | 'in_transit' | 'delivered';
  carrier?: string;
  rate?: number;
  estimatedDelivery?: string;
  createdAt: string;
}

export interface Quote {
  carrier: string;
  rate: number;
  transitTime: string;
  serviceLevel: string;
}