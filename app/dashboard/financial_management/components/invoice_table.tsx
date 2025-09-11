"use clients";

import { InvoiceModal } from "@/app/models/common";
import InvoiceRow from "./invoice_row";
import {inter} from "@/app/fonts"

interface InvoiceTableProps {
    invoices: InvoiceModal[];
    onView: (invoice: InvoiceModal) => void;
    onEdit: (invoice: InvoiceModal) => void;
  }

const InvoiceTable: React.FC<InvoiceTableProps> = ({ invoices, onEdit, onView  }) => (
    <div className="mt-8 bg-white rounded-lg border border-gray-200">

      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={`${inter.className} antialiased bg-gray-50`}>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>

            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices.map((invoice, index) => (
              <InvoiceRow key={invoice.id} invoice={invoice}  onEdit={(invoice: InvoiceModal)=> {console.log('Edit for:', invoice); onEdit(invoice);}}
              onView={(invoice: InvoiceModal)=> {console.log('View for:', invoice); onView(invoice);}}
              isLastRow = {invoices.length === (index + 1)}
               />
            ))}
          </tbody>
        </table>
      </div>
      
      {/* {isRecentTransaction === true && <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-center">
          <button className="text-blue-600 text-sm hover:text-blue-700" onClick={onViewAllTransactions}>
            View All Transactions
          </button>
        </div>
      </div>} */}
    </div>
  );

export default InvoiceTable;