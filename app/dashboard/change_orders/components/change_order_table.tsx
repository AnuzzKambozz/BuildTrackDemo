"use client";

import {  MoreHorizontal } from "lucide-react";
import { ChangeOrder } from "../types/change-orders";
import { inter } from "@/app/fonts";


// ChangeOrderTable Component
interface ChangeOrderTableProps {
    orders: ChangeOrder[];
    onStatusChange: (orderId: string, newStatus: 'Approved' | 'Rejected') => void;
  }
  
  const ChangeOrderTable: React.FC<ChangeOrderTableProps> = ({ orders }) => {
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'Pending': return 'bg-[#FFE1D3] text-[#FC641F]';
        case 'Approved': return 'bg-[#DBFFCE] text-[#4CAB02]';
        case 'Rejected': return 'bg-[#FFD0CE] text-[#FC3A3A]';
        default: return 'bg-gray-100 text-gray-800';
      }
    };
  
    const getTypeColor = (type: string) => {
      switch (type) {
        case 'Client': return 'bg-[#DCE3FF] text-[#375DED]';
        case 'Required': return 'bg-[#FFD0CE] text-[#FC3A3A]';
        default: return 'bg-gray-100 text-gray-800';
      }
    };
  
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className={`${inter.className} antialiased`}>
              <th className="px-6 py-3 text-left text-[13px] text-[#9B9B9D] font-medium   tracking-wider">#CO</th>
              <th className="px-6 py-3 text-left text-[13px] text-[#9B9B9D] font-medium   tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-[13px] text-[#9B9B9D] font-medium   tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-[13px] text-[#9B9B9D] font-medium   tracking-wider">Requestor</th>
              <th className="px-6 py-3 text-left text-[13px] text-[#9B9B9D] font-medium   tracking-wider">Cost Impact</th>
              <th className="px-6 py-3 text-left text-[13px] text-[#9B9B9D] font-medium   tracking-wider">Time Impact</th>
              <th className="px-6 py-3 text-left text-[13px] text-[#9B9B9D] font-medium   tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-[13px] text-[#9B9B9D] font-medium   tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-[13px] text-[#9B9B9D] font-medium   tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className={`${inter.className} antialiased bg-white divide-y divide-gray-200`}>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-[14px] font-semibold text-[#272727]">{order.id}</td>
                <td className="px-6 py-4 text-[14px] text-[#272727] font-normal max-w-xs">{order.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-4 py-1 font-medium text-[11px] rounded-md ${getTypeColor(order.type)}`}>
                    {order.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[14px] text-[#272727] font-normal">{order.requestor}</td>
                <td className="px-6 py-4 whitespace-nowrap text-[14px] font-semibold text-[#FC3A3A]">+${order.costImpact.toLocaleString()}.00</td>
                <td className="px-6 py-4 whitespace-nowrap text-[14px] text-[#272727] font-normal">+{order.timeImpact} day{order.timeImpact !== 1 ? 's' : ''}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-4 py-1 font-medium text-[11px] rounded-md ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[14px] text-[#272727] font-normal">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    {/* {order.status === 'Pending' && (
                      <>
                        <button 
                          onClick={() => onStatusChange(order.id, 'Approved')}
                          className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                          title="Approve"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => onStatusChange(order.id, 'Rejected')}
                          className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                          title="Reject"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    )} */}
                    <button className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-50">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };


export default ChangeOrderTable;