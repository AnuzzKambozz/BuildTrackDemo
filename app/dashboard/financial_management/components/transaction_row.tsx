"use client";

import { Transaction } from "@/app/models/common";

interface TransactionRowProps {
    transaction: Transaction;
  }
  
const TransactionRow: React.FC<TransactionRowProps> = ({ transaction }) => (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="px-4 py-3">
        <div>
          <p className="font-medium text-gray-900">{transaction.date}</p>
          <p className="text-sm text-gray-500">{transaction.time}</p>
        </div>
      </td>
      <td className="px-4 py-3 text-gray-600">{transaction.source}</td>
      <td className="px-4 py-3 text-gray-600">{transaction.destination}</td>
      <td className="px-4 py-3">
        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
          {transaction.via}
        </span>
      </td>
      <td className="px-4 py-3 text-gray-600">{transaction.utr}</td>
      <td className="px-4 py-3">
        <span className={`font-semibold ${
          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
        }`}>
          {transaction.type === 'credit' ? '+' : '-'} ₹ {transaction.amount.toLocaleString()}
        </span>
      </td>
    </tr>
  );


  export default TransactionRow;