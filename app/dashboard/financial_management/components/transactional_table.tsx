"use clients";

import { Transaction } from "@/app/models/common";
import TransactionRow from "./transaction_row";
import {inter} from "@/app/fonts"

interface TransactionsTableProps {
    transactions: Transaction[];
    isRecentTransaction: boolean 
    onViewAllTransactions?: ()=>void
    onView: (transaction: Transaction) => void;
    onEdit: (transaction: Transaction) => void;
  }

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions, isRecentTransaction, onEdit, onView  }) => (
    <div className="mt-8 bg-white rounded-lg border border-gray-200">
      { isRecentTransaction === true && <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          <div className="flex items-center space-x-3">
            {/* <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button> */}
          </div>
        </div>
      </div>}
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={`${inter.className} antialiased bg-gray-50`}>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction Details</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Info</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>

            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction, index) => (
              <TransactionRow key={transaction.id} transaction={transaction}  onEdit={(transaction: Transaction)=> {console.log('Edit for:', transaction); onEdit(transaction);}}
              onView={(transaction: Transaction)=> {console.log('View for:', transaction); onView(transaction);}}
              isLastRow = {transactions.length === (index + 1)}
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

export default TransactionsTable;