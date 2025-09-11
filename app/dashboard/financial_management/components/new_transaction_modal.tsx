"use client";

import React from "react";
import {  Transaction } from "@/app/models/common";
import { useState, useEffect } from "react";
import ModalBackdrop from '@/app/components/modal_backdrop';
import  Dropdown  from "@/app/components/dropdowns/dropdown_new";
import InputField from '@/app/components/textField';
import TextAreaField from "@/app/components/textAreaField"
import {BTButton} from "@/app/components/buttons/BTButton"

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (transaction: Transaction | Omit<Transaction, 'id'>) => void;
  transaction?: Transaction | null;
  mode: 'add' | 'edit';
}

const CreateTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose, onSubmit, transaction, mode }) => {
  // ✅ Move all hooks BEFORE any conditional returns
  const [formData, setFormData] = useState<{
    invoiceId: string;
    amount: number;
    paymentMethod: string; 
    paymentDate: string;   
    reference: string;
    client: string;
    project: string;
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

  // ✅ Now you can safely return null conditionally AFTER all hooks
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
  ];

  const handleSubmit = () => {
    if (mode === 'edit' && transaction) {
      onSubmit({
        ...transaction,
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Dropdown
                label="Client"
                name="client"
                placeholder="Select Client"
                options={clientOptions}
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: String(e) })}
                searchable={true}
                mandatory
              />

              <Dropdown
                label="Project"
                name="project"
                placeholder="Select Project"
                options={projectOptions}
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: String(e) })}
                searchable={true}
                mandatory
              />

              <Dropdown
                label="Invoice"
                name="project"
                placeholder="Select Invoice Id"
                options={invoicesOptions}
                value={formData.invoiceId}
                onChange={(e) => setFormData({ ...formData, invoiceId: String(e) })}
                searchable={true}
                mandatory
              />

              <Dropdown
                label="Payment Method"
                name="paymentMethod"
                placeholder="Select Payment Method"
                options={paymentMethodOptions}
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: String(e) })}
                searchable={true}
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