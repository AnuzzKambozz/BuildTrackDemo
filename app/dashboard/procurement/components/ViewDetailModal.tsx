import { createPortal } from "react-dom";
import { PurchaseOrder } from "../types/procurement";

// Modal Components
const ViewDetailsModal = ({ 
    isOpen, 
    onClose, 
    order 
  }: { 
    isOpen: boolean; 
    onClose: () => void; 
    order: PurchaseOrder | null; 
  }) => {
    if (!isOpen || !order) return null;

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
    
  
    return createPortal(
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">Purchase Order Details</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ×
            </button>
          </div>
  
          {/* Content */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Order Number</label>
                <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm">{order.id}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <span className={`inline-flex px-3 py-1 font-medium text-xs rounded-md ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Supplier</label>
                <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm">{order.supplier}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project</label>
                <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm">{order.project}</div>
              </div>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Items</label>
                <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm">{order.items}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Amount</label>
                <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm font-semibold">{order.amount}</div>
              </div>
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Created Date</label>
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm">{order.date}</div>
            </div>
  
            {/* Timeline or additional details could go here */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Order Timeline</label>
              <div className="bg-gray-50 border border-gray-200 rounded p-4">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">Created on {order.date}</span>
                </div>
              </div>
            </div>
          </div>
  
          {/* Footer */}
          <div className="flex justify-end p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>,
      document.body
    );
  }

  export default ViewDetailsModal;