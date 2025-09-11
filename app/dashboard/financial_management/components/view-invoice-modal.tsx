"use client";

import { InvoiceModal } from "@/app/models/common";
import {Edit} from "lucide-react"
import ModalBackdrop from "@/app/components/modal_backdrop"




interface InvoiceViewModalProps {
    isOpen: boolean;
    onGeneratePDF:(invoice: InvoiceModal) => void;
    onEdit:(invoice: InvoiceModal) => void;
    onClose: () => void;
    invoice?: InvoiceModal;
}


const InvoiceView: React.FC<InvoiceViewModalProps> = ({isOpen, onEdit, invoice, onClose }) => {
      const getStatusColor = (status: string) => {
      switch (status) {
        case 'draft': return 'bg-gray-100 text-gray-800';
        case 'sent': return 'bg-blue-100 text-blue-800';
        case 'paid': return 'bg-green-100 text-green-800';
        case 'overdue': return 'bg-red-100 text-red-800';
        case 'cancelled': return 'bg-gray-100 text-gray-600';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

  return (

 <ModalBackdrop isOpen={isOpen} onClose={() => {}}>

      <div className="w-full max-w-6xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl max-h-[90vh] flex flex-col">

        {/* Fixed Header */}
        <div className="flex items-center justify-between p-6 bg-white border-b border-gray-200 rounded-t-2xl flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-900">{'Invoice Details'}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
                <div className="flex justify-between items-start">
                    <div>
                    <h3 className="text-2xl font-bold text-gray-900">{invoice?.id}</h3>
                    <div className="flex items-center gap-2 mt-2">
                        <span className={`inline-flex px-4 py-1 font-medium text-[11px] rounded-md ${getStatusColor(invoice?.status || "draft")}`}>
                                {invoice?.status.toUpperCase()}
                        </span>
                    </div>
                    </div>
                    <div className="text-right">
                    <div className="text-2xl font-bold text-blue-800">
                        ${invoice?.amount.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">
                        Due: {new Date(invoice?.dueDate || "").toLocaleDateString()}
                    </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                    <h4 className="font-medium text-gray-900 mb-2">Bill To:</h4>
                    <div className="text-sm text-gray-600">
                        <div className="font-medium">{invoice?.client}</div>
                        <div>{invoice?.clientEmail}</div>
                    </div>
                    </div>
                    <div>
                    <h4 className="font-medium text-gray-900 mb-2">Project Details:</h4>
                    <div className="text-sm text-gray-600">
                        <div className="font-medium">{invoice?.projectName}</div>
                        {invoice?.projectCode && <div>{""}</div>}
                    </div>
                    </div>
                </div>

                <div>
                    <h4 className="font-medium text-gray-900 mb-3">Invoice Items:</h4>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Description
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Category
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                            Qty
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                            Unit
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                            Cost Per
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                            Sub Total
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {invoice?.items.map((item, index) => (
                            <tr key={index}>
                            <td className="px-4 py-3 text-sm text-gray-900">
                                {item.description}
                            </td>
                                <td className="px-4 py-3 text-sm text-gray-900">
                                {item.category}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 text-right">
                                {item.quantity}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 text-right">
                                {item.unit}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 text-right">
                                ${item.costPer.toFixed(2)}
                            </td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                                ${item.subTotal.toFixed(2)}
                            </td>
                            </tr>
                        ))}
                        </tbody>
                        <tfoot className="bg-gray-50">
                        <tr>
                            <td colSpan={5} className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                            Total:
                            </td>
                            <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right">
                            ${invoice?.amount.toFixed(2)}
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                    </div>
                </div>

                {/* {invoice.notes && (
                    <div>
                    <h4 className="font-medium text-gray-900 mb-2">Notes:</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        {invoice.notes}
                    </p>
                    </div>
                )} */}

                {/* View Actions */}
                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                    <button
                    onClick={()=>{
                        if (invoice){
                        onEdit(invoice)}

                        }
                    }
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                    >
                    <Edit size={16} />
                    Edit
                    </button>
                    {/* <button 
                    onClick={()=>{
                        if (invoice){
                            onGeneratePDF(invoice)}
                        }
                        }
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                    >
                    <Download size={16} />
                    Download PDF
                    </button> */}
                </div>
            </div>
        </div>
      </div>







    </ModalBackdrop>
  
  );
};


export default InvoiceView;
