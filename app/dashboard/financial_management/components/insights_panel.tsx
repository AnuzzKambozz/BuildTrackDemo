"use client";

import { InsightItem } from "@/app/models/common";



interface InsightsPanelProps {
    insights: InsightItem[];
  }





const InsightsPanel: React.FC<InsightsPanelProps> = ({ insights }) => (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">All Financial Insights</h3>
        <button className="text-blue-600 text-sm hover:text-blue-700 underline">View Analytics</button>
      </div>
      <div className="flex items-center justify-between mb-7">

      </div>
      
      <div className="space-y-6">
        {insights.map((insight, index) => (
          <div key={insight.id} className={`${index < insights.length - 1 ? 'pb-4 border-b border-gray-100' : ''}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                {insight.icon}
                <div>
                  <h4 className="font-medium text-blue-600 mb-1">{insight.title}</h4>
                  {insight.subtitle && (
                    <h5 className="font-semibold text-orange-500 text-lg mb-2">{insight.subtitle}</h5>
                  )}
                  {insight.value && insight.type === 'opportunity' && (
                    <p className="text-blue-600 font-medium mb-2">{insight.value}</p>
                  )}
                  {insight.description && (
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                      {insight.description}
                    </p>
                  )}
                </div>
              </div>
              {insight.value && insight.type === 'trend' && (
                <span className={`font-semibold text-lg ${insight.valueColor}`}>{insight.value}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );


  export default InsightsPanel;
  