import React, { useEffect, useRef } from 'react';
import { useShipments } from '../context/ShipmentContext';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function Analytics() {
  const { state } = useShipments();
  const spendChartRef = useRef<HTMLCanvasElement>(null);
  const carrierChartRef = useRef<HTMLCanvasElement>(null);
  const spendChartInstance = useRef<Chart | null>(null);
  const carrierChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (spendChartRef.current && carrierChartRef.current) {
      // Destroy existing charts if they exist
      if (spendChartInstance.current) {
        spendChartInstance.current.destroy();
      }
      if (carrierChartInstance.current) {
        carrierChartInstance.current.destroy();
      }

      // Create new spend chart
      spendChartInstance.current = new Chart(spendChartRef.current, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Monthly Spend',
            data: [30000, 35000, 32000, 38000, 36000, 40000],
            borderColor: 'rgb(59, 130, 246)',
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Monthly Spend Trend'
            }
          }
        }
      });

      // Create new carrier chart
      carrierChartInstance.current = new Chart(carrierChartRef.current, {
        type: 'bar',
        data: {
          labels: Object.keys(state.analytics.carrierPerformance),
          datasets: [{
            label: 'Shipments by Carrier',
            data: Object.values(state.analytics.carrierPerformance),
            backgroundColor: 'rgb(59, 130, 246)',
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Carrier Distribution'
            }
          }
        }
      });
    }

    // Cleanup function to destroy charts when component unmounts
    return () => {
      if (spendChartInstance.current) {
        spendChartInstance.current.destroy();
      }
      if (carrierChartInstance.current) {
        carrierChartInstance.current.destroy();
      }
    };
  }, [state.analytics]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <canvas ref={spendChartRef}></canvas>
        </div>
        <div>
          <canvas ref={carrierChartRef}></canvas>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Efficiency Insights</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• 15% reduction in transit times possible by optimizing routes</li>
            <li>• Potential savings of $12,000 through carrier consolidation</li>
            <li>• Peak shipping days: Tuesday and Wednesday</li>
          </ul>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-900 mb-2">Sustainability Metrics</h3>
          <ul className="space-y-2 text-sm text-green-800">
            <li>• 25% of shipments using eco-friendly carriers</li>
            <li>• 12,000 kg CO2 emissions saved this quarter</li>
            <li>• 85% load efficiency rating</li>
          </ul>
        </div>
      </div>
    </div>
  );
}