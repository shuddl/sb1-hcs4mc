import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  History, 
  BarChart2, 
  Settings,
  Menu,
  X
} from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Package, label: 'Shipments' },
    { icon: History, label: 'History' },
    { icon: BarChart2, label: 'Reports' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 bg-white p-2 rounded-lg shadow-md"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <nav className={`
        fixed lg:static w-64 h-full bg-white shadow-lg transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <Package className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold">FreightFlow</span>
          </div>

          <div className="space-y-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                    ${item.active 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'}
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}