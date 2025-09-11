"use client";
import React from "react";
import {  Transaction } from "@/app/models/common";
// import { useState, useEffect } from "react";
import {XCircle, Edit} from "lucide-react"




interface TransactionViewModalProps {
  transaction?: Transaction;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (transaction: Transaction) => void;
//   getStatusIcon: (status: Transaction['status']) => JSX.Element;
//   getStatusColor: (status: Transaction['status']) => string;
}



const ViewTransactionModal:React.FC<TransactionViewModalProps> = ({ transaction, isOpen, onClose, onEdit }) => {
  if (!isOpen || !transaction) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
             Transaction Details
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 transition-colors"
            type="button"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-6">
          {/* Transaction Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{transaction.id}</h4>
                <p className="text-blue-600 font-medium">{transaction.invoiceId}</p>
              </div>
              {/* <div className="flex items-center gap-2">
                {getStatusIcon(transaction.status)}
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                  {transaction.status}
                </span>
              </div> */}
            </div>
          </div>

          {/* Customer Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h5 className="text-sm font-semibold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-2">
                Customer Information
              </h5>
              <div>
                <label className="block text-sm font-medium text-gray-500">Customer Name</label>
                <p className="text-sm text-gray-900 font-medium">{transaction.client}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Description</label>
                <p className="text-sm text-gray-900">{transaction.description || 'No description provided'}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-sm font-semibold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-2">
                Payment Information
              </h5>
              <div>
                <label className="block text-sm font-medium text-gray-500">Payment Method</label>
                <p className="text-sm text-gray-900 font-medium">{transaction.paymentMethod}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Payment Date</label>
                <p className="text-sm text-gray-900">{new Date(transaction.paymentDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Reference Number</label>
                <p className="text-sm text-gray-900 font-mono">{transaction.reference}</p>
              </div>
            </div>
          </div>

          {/* Financial Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Financial Breakdown
            </h5>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Gross Amount:</span>
                <span className="text-lg font-semibold text-gray-900">${transaction.amount.toFixed(2)}</span>
              </div>
              {transaction.fees > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Processing Fees:</span>
                  <span className="text-sm font-medium text-red-600">-${transaction.fees.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-gray-300 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-base font-semibold text-gray-900">Net Amount:</span>
                  <span className="text-xl font-bold text-green-600">${transaction.netAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Transaction ID</p>
              <p className="text-sm font-mono font-medium text-gray-900">{transaction.id}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Invoice ID</p>
              <p className="text-sm font-mono font-medium text-blue-600">{transaction.invoiceId}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Reference</p>
              <p className="text-sm font-mono font-medium text-gray-900">{transaction.reference}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onEdit(transaction);
                onClose();
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTransactionModal;