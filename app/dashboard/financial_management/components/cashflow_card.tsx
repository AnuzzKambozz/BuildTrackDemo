"use client";

import { CashflowData } from "@/app/models/common";
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { inter } from "@/app/fonts";

interface CashflowChartProps {
    data: CashflowData[];
}

const CashflowChart: React.FC<CashflowChartProps> = ({ data }) => {
    const [selectedMonths, setSelectedMonths] = useState(5);
    const [hoveredBar, setHoveredBar] = useState<{ index: number; type: 'received' | 'sent'; x: number; y: number } | null>(null);
    const displayData = data.slice(-selectedMonths);
    
    // Calculate dynamic Y-axis scale based on data
    const maxReceived = Math.max(...displayData.map(item => item.received));
    const maxSent = Math.max(...displayData.map(item => Math.abs(item.sent)));
    const maxValue = Math.max(maxReceived, maxSent);
    
    // Create scale with closer intervals
    const getScaleMax = (value: number) => {
        if (value === 0) return 1000;
        
        // Find a nice interval that gives us reasonable number of steps
        const roughInterval = value / 4; // Aim for ~4-5 intervals
        const magnitude = Math.pow(10, Math.floor(Math.log10(roughInterval)));
        const normalized = roughInterval / magnitude;
        
        let niceInterval;
        if (normalized <= 1) niceInterval = 1;
        else if (normalized <= 2) niceInterval = 2;
        else if (normalized <= 5) niceInterval = 5;
        else niceInterval = 10;
        
        const finalInterval = niceInterval * magnitude;
        
        // Round up the max value to the nearest interval
        return Math.ceil(value / finalInterval) * finalInterval;
      };
      
      const scaleMax = getScaleMax(maxValue);
      const yAxisLabels = [
        scaleMax,
        scaleMax / 2,
        0,
        -scaleMax / 2,
        -scaleMax
      ];
      
    
    const handleBarHover = (index: number, type: 'received' | 'sent', event: React.MouseEvent) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const cardRect = event.currentTarget.closest('.cashflow-card')?.getBoundingClientRect();
      
      if (cardRect) {
        setHoveredBar({
          index,
          type,
          x: rect.left - cardRect.left + rect.width / 2,
          y: rect.top - cardRect.top + rect.height / 2
        });
      }
    };
    
    return (
      <div className="bg-white rounded-lg p-6 border border-gray-200 relative cashflow-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className={`${inter.className} antialiased text-[18px] font-semibold text-[#171E34] `}>Cashflow</h3>
          <div className="relative">
            <select 
              className="border-2 border-blue-400 rounded-lg px-4 py-2 text-sm text-blue-600 bg-white appearance-none pr-10 font-medium"
              value={selectedMonths}
              onChange={(e) => setSelectedMonths(Number(e.target.value))}
            >
              <option value={3}>Last 3 months</option>
              <option value={5}>Last 5 months</option>
              <option value={6}>Last 6 months</option>
              <option value={12}>Last year</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-600 pointer-events-none" />
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-16">
          <div className="text-center">
            <p className={`${inter.className} antialiased text-[14px] text-[#171E34] mb-2 font-medium`}>Total Money Received</p>
            <p className={`${inter.className} antialiased text-[18px] font-semibold text-[#375DED]`}>$25,435</p>
          </div>
          <div className="text-center">
            <p className={`${inter.className} antialiased text-[14px] text-[#171E34] mb-2 font-medium`}>Total Money Sent</p>
            <p className={`${inter.className} antialiased text-[18px] font-semibold text-[#EA5050]`}>$14,315</p>
          </div>
        </div>
        
        <div className="relative h-80 mt-0">
          {/* Y-axis labels - aligned with grid lines */}
          <div className="absolute left-0 top-8 bottom-12 flex flex-col justify-between text-sm text-gray-500 pr-4 z-10">
            {yAxisLabels.map((value, index) => (
              <span key={index} className={value === 0 ? "font-medium text-gray-700" : ""}>
                ${value >= 0 ? value.toLocaleString() : `${value.toLocaleString()}`}
              </span>
            ))}
          </div>
          
          {/* Chart area - increased height to accommodate month labels */}
          <div className="absolute left-16 right-0 top-0 h-full overflow-x-auto">
            {/* Grid lines - aligned with Y-axis labels */}
            <div className="absolute left-0 right-0 top-8 bottom-12" style={{ minWidth: `${displayData.length * 100}px` }}>
              <div className="h-full flex flex-col justify-between">
                <div className="border-t border-dashed border-gray-300"></div>
                <div className="border-t border-dashed border-gray-300"></div>
                <div className="border-t-2 border-solid border-gray-800"></div>
                <div className="border-t border-dashed border-gray-300"></div>
                <div className="border-t border-dashed border-gray-300"></div>
              </div>
            </div>
            
            {/* Chart content container */}
            <div className="relative h-full" style={{ minWidth: `${displayData.length * 100}px` }}>
              {/* Chart bars */}
              <div className="flex items-center h-full px-6 relative py-8 pb-12">
                {displayData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center w-20 mx-6 h-full relative">
                    {/* Bar container with zero baseline in center */}
                    <div className="flex flex-col items-center h-full justify-center">
                      {/* Positive bar (above zero line) */}
                      <div className="flex flex-col justify-end h-1/2 relative">
                        <div 
                          className="w-[28px] bg-blue-600 cursor-pointer transition-all duration-200 hover:bg-blue-700 rounded-t-sm relative flex items-center justify-center"
                          style={{ height: `${(item.received / scaleMax) * 120}px` }}
                          onMouseEnter={(e) => handleBarHover(index, 'received', e)}
                          onMouseLeave={() => setHoveredBar(null)}
                        >
                          {/* Tooltip within positive bar */}
                          {hoveredBar?.index === index && hoveredBar?.type === 'received' && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="bg-white text-gray-900 px-1 py-0.5 rounded text-xs font-semibold shadow-sm border border-gray-300" style={{ fontSize: '9px' }}>
                                ${item.received.toLocaleString()}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Negative bar (below zero line) */}
                      <div className="flex flex-col justify-start h-1/2 relative">
                        <div 
                          className="w-[28px] bg-red-500 cursor-pointer transition-all duration-200 hover:bg-red-600 rounded-b-sm relative flex items-center justify-center"
                          style={{ height: `${(Math.abs(item.sent) / scaleMax) * 120}px` }}
                          onMouseEnter={(e) => handleBarHover(index, 'sent', e)}
                          onMouseLeave={() => setHoveredBar(null)}
                        >
                          {/* Tooltip within negative bar */}
                          {hoveredBar?.index === index && hoveredBar?.type === 'sent' && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="bg-white text-gray-900 px-1 py-0.5 rounded text-xs font-semibold shadow-sm border border-gray-300" style={{ fontSize: '9px' }}>
                                ${Math.abs(item.sent).toLocaleString()}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Month labels - now inside the scrollable container */}
              <div className="absolute left-0 right-0 bottom-0 flex px-6 h-8">
                {displayData.map((item, index) => (
                  <div key={index} className="flex justify-center items-center w-20 mx-6">
                    <span className="text-base text-gray-600 font-medium">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default CashflowChart;