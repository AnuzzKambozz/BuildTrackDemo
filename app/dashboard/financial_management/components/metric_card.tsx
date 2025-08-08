"use client";

import { FinancialMetric } from "@/app/models/common";

interface MetricCardProps {
    metric: FinancialMetric;
  }


  const MetricCard: React.FC<MetricCardProps> = ({ metric }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-center space-x-3 mb-4">
        {metric.icon}
        <span className="text-gray-600 text-sm font-normal">{metric.title}</span>
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-gray-900">{metric.amount}</h3>
        <p className={`text-sm ${
          metric.title === 'Total Invoice' ? 'text-green-500' :
          metric.title === 'Total Paid' ? 'text-blue-500' :
          metric.title === 'Outstanding' ? 'text-orange-500' :
          'text-red-500'
        }`}>
          {metric.change}
        </p>
      </div>
    </div>
  );

  export default MetricCard;