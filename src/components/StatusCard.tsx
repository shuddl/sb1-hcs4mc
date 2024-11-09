import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatusCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export default function StatusCard({ icon: Icon, label, value }: StatusCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}