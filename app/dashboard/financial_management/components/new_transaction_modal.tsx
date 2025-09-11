"use client";

import React from "react";
import {  Transaction } from "@/app/models/common";
import { useState, useEffect } from "react";
import ModalBackdrop from '@/app/components/modal_backdrop';
import  Dropdown  from "@/app/components/dropdowns/dropdown_new";
import InputField from '@/app/components/textField';
import TextAreaField from "@/app/components/textAreaField"
import {BTButton} from "@/app/components/buttons/BTButton"

// interface NewTransactionModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//   }

// const NewTransactionModal: React.FC<NewTransactionModalProps> = ({ isOpen, onClose }) => {
//     if (!isOpen) return null;
  
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-semibold text-gray-900">New Transaction</h2>
//             <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
          
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
//               <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="0.00" />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//               <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Transaction description" />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
//               <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
//                 <option value="credit">Credit</option>
//                 <option value="debit">Debit</option>
//               </select>
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
//               <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
//             </div>
            
//             <div className="flex space-x-3 pt-4">
//               <button
//                 onClick={onClose}
//                 className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={onClose}
//                 className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 Add Transaction
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };  

//   export default NewTransactionModal;


// interface AddTransactionModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     onSubmit: (transaction: Transaction | Omit<Transaction, 'id'>) => void;
//     transaction?: Transaction;
//     mode: 'add' | 'edit';
// }

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (transaction: Transaction | Omit<Transaction, 'id'>) => void;
  transaction?: Transaction | null; // Add null to handle undefined
  mode: 'add' | 'edit';
}





const CreateTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose, onSubmit, transaction, mode }) => {
  if (!isOpen) return null;


    const projectOptions = [
        { value: 'Spethman Renovation', label: 'Spethman Renovation' },
        { value: 'Steven Kitchen', label: 'Steven Kitchen' },
        { value: 'Asian Zone Spec Home', label: 'Asian Zone Spec Home' },
        { value: 'Bruke Roof Siding', label: 'Bruke Roof Siding' },
    ];

   const clientOptions = [
        { value: 'XYZ Corp', label: 'XYZ Corp' },
        { value: 'ABC Enterprise', label: 'ABC Enterprise' },
        { value: 'Google Inc.', label: 'Google Inc.' },
        { value: 'Amazon Inc.', label: 'Amazon Inc.' },
    ];


       const invoicesOptions = [
        { value: 'INV-2025-001', label: 'INV-2025-001' },
        { value: 'INV-2025-002', label: 'INV-2025-002' },
        { value: 'INV-2025-003', label: 'INV-2025-003' },
        { value: 'INV-2025-004', label: 'INV-2025-004' },
    ];
    const paymentMethodOptions = [
      { value: 'Credit Card', label: 'Credit Card' },
        { value: 'Debit Card', label: 'Debit Card' },
        { value: 'Bank Transfer', label: 'Bank Transfer' },
        { value: 'Cash', label: 'Cash' },
        { value: 'Check', label: 'Check' },
    ]
  const [formData, setFormData] = useState<{
        invoiceId: string;
        amount: number;
        paymentMethod: string; 
        paymentDate: string;   
        reference: string;
        client: string; // Added: Missing from interface
        project: string; // Added: Missing from interface
        description: string;
        fees: number;
        netAmount: number;
      }>({
        invoiceId: '',  
        amount: 0,
        paymentMethod: '',
        paymentDate: '',
        reference: '',
        client: '', 
        project: '', 
        description: '', 
        fees: 0, 
        netAmount: 0, 
      });

      useEffect(() => {
        if (transaction && mode === 'edit') {
          setFormData({
  
        invoiceId: transaction.invoiceId,  
        amount: transaction.amount,
        paymentMethod: transaction.paymentMethod,
        paymentDate: transaction.paymentDate,
        reference: transaction.reference,
        client: transaction.client, 
        project: transaction.project, 
        description: transaction.description, 
        fees: transaction.fees, 
        netAmount: transaction.netAmount, 

          });
        } else {
          setFormData({
        invoiceId: '',  
        amount: 0,
        paymentMethod: '',
        paymentDate: '',
        reference: '',
        client: '', 
        project: '', 
        description: '', 
        fees: 0, 
        netAmount: 0, 
          });
        }
      }, [transaction, mode]);
    
      const handleSubmit = () => {
        if (mode === 'edit' && transaction) {
          onSubmit({
            ...transaction,
        invoiceId: transaction.invoiceId,  
        amount: transaction.amount,
        paymentMethod: transaction.paymentMethod,
        paymentDate: transaction.paymentDate,
        reference: transaction.reference,
        client: transaction.client, 
        project: transaction.project, 
        description: transaction.description, 
        fees: transaction.fees, 
        netAmount: transaction.netAmount,  
          });
        } else {
          onSubmit({
  
        invoiceId: formData.invoiceId,  
        amount: formData.amount,
        paymentMethod: formData.paymentMethod,
        paymentDate: formData.paymentDate,
        reference: formData.reference,
        client: formData.client, 
        project: formData.project, 
        description: formData.description, 
        fees: formData.fees, 
        netAmount: formData.netAmount, 
           
          });
        }
        onClose();
      };

  return (
    // <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4 z-50">
    //   <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
    //     <div className="flex justify-between items-center mb-6">
    //       <h3 className="text-xl font-semibold text-gray-900">
    //         ➕ Add New Transaction
    //       </h3>
    //       <button
    //         onClick={onClose}
    //         className="text-gray-400 hover:text-gray-600 p-1 transition-colors"
    //         type="button"
    //       >
    //         <XCircle className="w-6 h-6" />
    //       </button>
    //     </div>
        
    //     <div className="space-y-4">
    //       <div>
    //         <label className="block text-sm font-medium text-gray-700 mb-2">📋 Invoice ID *</label>
    //         <input
    //           type="text"
    //           value={formData.invoiceId}
    //           onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('invoiceId', e.target.value)}
    //           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
    //           placeholder="INV-2024-001"
    //         />
    //       </div>
          
    //       <div>
    //         <label className="block text-sm font-medium text-gray-700 mb-2">👤 Customer Name *</label>
    //         <input
    //           type="text"
    //           value={formData.customerName}
    //           onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('customerName', e.target.value)}
    //           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
    //           placeholder="John Doe"
    //         />
    //       </div>
          
    //       <div className="grid grid-cols-2 gap-4">
    //         <div>
    //           <label className="block text-sm font-medium text-gray-700 mb-2">💰 Amount *</label>
    //           <input
    //             type="number"
    //             step="0.01"
    //             value={formData.amount}
    //             onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('amount', e.target.value)}
    //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
    //             placeholder="0.00"
    //           />
    //         </div>
            
    //         <div>
    //           <label className="block text-sm font-medium text-gray-700 mb-2">💳 Fees</label>
    //           <input
    //             type="number"
    //             step="0.01"
    //             value={formData.fees}
    //             onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('fees', e.target.value)}
    //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
    //             placeholder="0.00"
    //           />
    //         </div>
    //       </div>
          
    //       <div>
    //         <label className="block text-sm font-medium text-gray-700 mb-2">💳 Payment Method</label>
    //         <select
    //           value={formData.paymentMethod}
    //           onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateFormData('paymentMethod', e.target.value)}
    //           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
    //         >
    //           {paymentMethods.map((method: PaymentMethod) => (
    //             <option key={method} value={method}>{method}</option>
    //           ))}
    //         </select>
    //       </div>
          
    //       <div>
    //         <label className="block text-sm font-medium text-gray-700 mb-2">📅 Payment Date *</label>
    //         <input
    //           type="date"
    //           value={formData.paymentDate}
    //           onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('paymentDate', e.target.value)}
    //           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
    //         />
    //       </div>
          
    //       <div>
    //         <label className="block text-sm font-medium text-gray-700 mb-2">🔗 Reference Number</label>
    //         <input
    //           type="text"
    //           value={formData.reference}
    //           onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('reference', e.target.value)}
    //           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
    //           placeholder="REF123456"
    //         />
    //       </div>
          
    //       <div>
    //         <label className="block text-sm font-medium text-gray-700 mb-2">📝 Description</label>
    //         <textarea
    //           rows={3}
    //           value={formData.description}
    //           onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateFormData('description', e.target.value)}
    //           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
    //           placeholder="Payment description..."
    //         />
    //       </div>
          
    //       {formData.amount && (
    //         <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
    //           <div className="text-sm">
    //             <div className="flex justify-between mb-1">
    //               <span className="text-gray-700">💰 Gross Amount:</span>
    //               <span className="font-medium">${parseFloat(formData.amount || '0').toFixed(2)}</span>
    //             </div>
    //             <div className="flex justify-between mb-1">
    //               <span className="text-gray-700">💳 Processing Fees:</span>
    //               <span className="font-medium">-${parseFloat(formData.fees || '0').toFixed(2)}</span>
    //             </div>
    //             <div className="flex justify-between border-t border-blue-300 pt-2 mt-2">
    //               <span className="font-semibold text-gray-900">✨ Net Amount:</span>
    //               <span className="font-bold text-blue-600 text-lg">${(parseFloat(formData.amount || '0') - parseFloat(formData.fees || '0')).toFixed(2)}</span>
    //             </div>
    //           </div>
    //         </div>
    //       )}
          
    //       <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-200">
    //         <button
    //           type="button"
    //           onClick={onClose}
    //           className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
    //         >
    //           Cancel
    //         </button>
    //         <button
    //           type="button"
    //           onClick={handleSubmit}
    //           className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-md hover:shadow-lg"
    //         >
    //           Add Transaction
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <ModalBackdrop isOpen={isOpen} onClose={() => {}}>
      <div className="w-full min-w-9xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl max-h-[90vh] flex flex-col">
        {/* Fixed Header */}
        <div className="flex items-center justify-between p-6 bg-white border-b border-gray-200 rounded-t-2xl flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-900">{mode === 'edit' ? 'Edit Transaction' : 'Add New Transaction'}</h2>
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
          {/* Project Information */}
          <div className="mb-8">
            {/* <h3 className="text-lg font-semibold mb-4 text-gray-800">Invoice & Project Information</h3> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">



            <Dropdown
                  label="Client"
                  name="client"
                  placeholder="Select Client"
                  options={clientOptions}
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: String(e) })}
                  searchable = {true}
                  mandatory
                />




              <Dropdown
                  label="Project"
                  name="project"
                  placeholder="Select Project"
                  options={projectOptions}
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: String(e) })}
                  searchable = {true}
                  mandatory
                />

               <Dropdown
                  label="Invoice"
                  name="project"
                  placeholder="Select Invoice Id"
                  options={invoicesOptions}
                  value={formData.invoiceId}
                  onChange={(e) => setFormData({ ...formData, invoiceId: String(e) })}
                  searchable = {true}
                  mandatory
                />

                <Dropdown
                  label="Payment Method"
                  name="paymentMethod"
                  placeholder="Select Payment Method"
                  options={paymentMethodOptions}
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: String(e) })}
                  searchable = {true}
                  mandatory
                />

                <InputField
                    label="Payment Date"
                    name="issueDate"
                    type="date"
                    value={formData.paymentDate}
                    onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
                    placeholder="Select Date"
                    mandatory
                  />


              <InputField
                    label="Reference Number"
                    name="reference"
                    value={formData.reference}
                    onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                    placeholder="Contact person"
                    mandatory
                  />

                  <InputField
                      label="Amount"
                      name="amount"
                      type="number"
                      value={formData.amount === 0 ? '' : formData.amount.toString()}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData({ 
                          ...formData, 
                          amount: value === '' ? 0 : parseFloat(value) || 0
                        });
                      }}
                      placeholder="Enter amount"
                      mandatory
                      />
                  
                <InputField
                    label="Fees"
                    name="fees"
                    type="number"
                    value={formData.fees === 0 ? '' : formData.fees.toString()}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData({ 
                          ...formData, 
                          fees: value === '' ? 0 : parseFloat(value) || 0
                        });
                      }}
                    placeholder="Enter fees"
                  />


                {/* <Dropdown
                  label="Category"
                  name="category"
                  placeholder="Select Category"
                  options={categories}
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: String(e) })}
                  mandatory
                /> */}
              {/* <InputField
                label="Category"
                name="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Contact person"
              /> */}

            </div>
            

            <div className="mt-4">
              <TextAreaField
                label="Description"
                name="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Additional notes..."
                rows={3}
              />
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
            <BTButton
                text="Save Transaction" 
                size="medium" 
                onClick={handleSubmit}
               />
               <BTButton
                text="Cancel" 
                size="medium" 
                type='outline_blue'
                onClick={onClose}
               />

          </div>
        </div>
      </div>
    </ModalBackdrop>
  );
};

export default CreateTransactionModal;