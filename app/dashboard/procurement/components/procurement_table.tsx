"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { MoreHorizontal } from "lucide-react";
import { PurchaseOrder } from "../types/procurement";
// import EditOrderModal from "./EditOrderModal";
import ViewDetailsModal from "./ViewDetailModal";



// Define the status progression workflow
const statusWorkflow = {
  "Pending Approval": "Approved",
  Approved: "Ordered",
  Ordered: "Received",
  Received: null, // Final status
  Rejected: null, // Terminal status
};

interface PurchaseOrderTableProps {
  orders: PurchaseOrder[];
  onStatusChange: (orderId: string, newStatus: string) => void;
}

// Dropdown Portal Component
const DropdownPortal = ({
  isOpen,
  position,
  onClose,
  children,
}: {
  isOpen: boolean;
  position: { top: number; left: number };
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return createPortal(
    <>
      {/* Overlay to close dropdown when clicking outside */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      {/* Dropdown content */}
      <div
        className="fixed w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50"
        style={{
          top: position.top,
          left: position.left,
        }}
      >
        {children}
      </div>
    </>,
    document.body
  );
};

const PurchaseOrderTable: React.FC<PurchaseOrderTableProps> = ({
    orders,
    onStatusChange,
  }) => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const [viewDetailsModal, setViewDetailsModal] = useState<string | null>(null);
    // const [editOrderModal, setEditOrderModal] = useState<string | null>(null);
    const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  
    const getStatusColor = (status: string) => {
      switch (status) {
        case "Pending Approval":
          return "bg-[#FFE1D3] text-[#FC641F]";
        case "Approved":
          return "bg-[#DBFFCE] text-[#4CAB02]";
        case "Rejected":
          return "bg-[#FFD0CE] text-[#FC3A3A]";
        case "Ordered":
          return "bg-[#DCE3FF] text-[#375DED]";
        case "Received":
          return "bg-[#E8F5E8] text-[#2E7D32]";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };
  
    const getNextStatus = (currentStatus: string) => {
      return statusWorkflow[currentStatus as keyof typeof statusWorkflow];
    };
  
    const handleStatusUpdate = (orderId: string, currentStatus: string) => {
      const nextStatus = getNextStatus(currentStatus);
      if (nextStatus) {
        onStatusChange(orderId, nextStatus);
        setOpenDropdown(null);
      }
    };
  
    const handleReject = (orderId: string) => {
      onStatusChange(orderId, "Rejected");
      setOpenDropdown(null);
    };
  
    const toggleDropdown = (orderId: string) => {
      if (openDropdown === orderId) {
        setOpenDropdown(null);
        return;
      }
  
      const button = buttonRefs.current[orderId];
      if (button) {
        const rect = button.getBoundingClientRect();
        const scrollY = window.scrollY;
        
        // Calculate position for dropdown
        const dropdownHeight = 180; // Approximate height of dropdown
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        
        let top: number;
        let left: number;
        
        // Position horizontally (align with right edge of button)
        left = rect.right - 192; // 192px is the width of dropdown (w-48 = 12rem = 192px)
        
        // Ensure dropdown doesn't go off screen horizontally
        if (left < 8) {
          left = 8; // 8px margin from left edge
        }
        if (left + 192 > window.innerWidth - 8) {
          left = window.innerWidth - 192 - 8; // 8px margin from right edge
        }
        
        // Position vertically
        if (spaceBelow >= dropdownHeight || spaceBelow > spaceAbove) {
          // Open downward
          top = rect.bottom + scrollY + 4;
        } else {
          // Open upward
          top = rect.top + scrollY - dropdownHeight - 4;
        }
        
        setDropdownPosition({ top, left });
        setOpenDropdown(orderId);
      }
    };
  
    const getActionText = (status: string) => {
      const nextStatus = getNextStatus(status);
      switch (nextStatus) {
        case "Approved":
          return "Approve Order";
        case "Ordered":
          return "Mark as Ordered";
        case "Received":
          return "Mark as Received";
        default:
          return null;
      }
    };
  
    // Close dropdown when scrolling or resizing
    useEffect(() => {
      const handleScroll = () => setOpenDropdown(null);
      const handleResize = () => setOpenDropdown(null);
      
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="antialiased">
              <th className="px-6 py-3 text-left text-[13px] text-[#9B9B9D] font-medium tracking-wider">
                #PO
              </th>
              <th className="px-6 py-3 text-left text-[13px] text-[#9B9B9D] font-medium tracking-wider">
                Supplier
              </th>
              <th className="px-6 py-3 text-left text-[13px] text-[#9B9B9D] font-medium tracking-wider">
                Project
              </th>
              <th className="px-6 py-3 text-left text-[13px] text-[#9B9B9D] font-medium tracking-wider">
                Items
              </th>
              <th className="px-6 py-3 text-left text-[13px] text-[#9B9B9D] font-medium tracking-wider">
                Total Amount
              </th>
              <th className="px-6 py-3 text-left text-[13px] text-[#9B9B9D] font-medium tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-[13px] text-[#9B9B9D] font-medium tracking-wider">
                Created Date
              </th>
              <th className="px-6 py-3 text-left text-[13px] text-[#9B9B9D] font-medium tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="antialiased bg-white divide-y divide-gray-200">
            {orders.map((order) => {
              const nextStatus = getNextStatus(order.status);
              // const actionText = getActionText(order.status);
              const canProgress = nextStatus !== null;
              const canReject = order.status === "Pending Approval";
  
              return (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-[14px] font-semibold text-[#272727]">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-[14px] text-[#272727] font-normal max-w-xs">
                    {order.supplier}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[14px] text-[#272727] font-normal">
                    {order.project}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[14px] font-semibold text-[#272727]">
                    {order.items}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[14px] text-[#272727] font-normal">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-4 py-1 font-medium text-[11px] rounded-md ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[14px] text-[#272727] font-normal">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex justify-center">
                      {canProgress || canReject ? (
                        <button
                          ref={(el) => {
                            buttonRefs.current[order.id] = el;
                          }}
                          onClick={() => toggleDropdown(order.id)}
                          className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-50 flex items-center"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      ) : (
                        <span className="text-gray-400 text-xs">Complete</span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
  
        {/* Portal Dropdown */}
        <DropdownPortal
          isOpen={openDropdown !== null}
          position={dropdownPosition}
          onClose={() => setOpenDropdown(null)}
        >
          {openDropdown && (
            <div className="py-1">
              {(() => {
                const currentOrder = orders.find(o => o.id === openDropdown);
                if (!currentOrder) return null;
                
                const nextStatus = getNextStatus(currentOrder.status);
                const actionText = getActionText(currentOrder.status);
                const canProgress = nextStatus !== null;
                const canReject = currentOrder.status === "Pending Approval";
  
                return (
                  <>
                    {canProgress && actionText && (
                      <button
                        onClick={() =>
                          handleStatusUpdate(openDropdown, currentOrder.status)
                        }
                        className="w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-green-50 flex items-center"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        {actionText}
                      </button>
                    )}
  
                    {canReject && (
                      <button
                        onClick={() => handleReject(openDropdown)}
                        className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center"
                      >
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                        Reject Order
                      </button>
                    )}
  
                    <div className="border-t border-gray-100 my-1"></div>
  
                    <button
                      onClick={() => {
                        setViewDetailsModal(openDropdown);
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      View Details
                    </button>
  
                    {/* <button
                      onClick={() => {
                        setEditOrderModal(openDropdown);
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    >
                      <div className="w-2 h-2 bg-gray-500 rounded-full mr-3"></div>
                      Edit Order
                    </button> */}
                  </>
                );
              })()}
            </div>
          )}
        </DropdownPortal>
  
        {/* View Details Modal */}
        <ViewDetailsModal
          isOpen={viewDetailsModal !== null}
          onClose={() => setViewDetailsModal(null)}
          order={orders.find(o => o.id === viewDetailsModal) || null}
        />
  
        {/* Edit Order Modal */}
        {/* <EditOrderModal
          isOpen={editOrderModal !== null}
          onClose={() => setEditOrderModal(null)}
          order={orders.find(o => o.id === editOrderModal) || null}
          onSave={(updatedOrder) => {
            // Handle save logic here - you'll need to implement this
            console.log('Updated order:', updatedOrder);
            // onOrderUpdate?.(updatedOrder);
          }}
        /> */}
      </div>
    );
  };
  

export default PurchaseOrderTable;