"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { inter } from '@/app/fonts';
import clsx from 'clsx';
import InputField from '@/app/components/textField';
import Dropdown from '@/app/components/dropdowns/dropdown_new';
import ModalBackdrop from '@/app/components/modal_backdrop';

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (clientData: ClientFormData) => void;
  loading?: boolean;
}

interface ClientFormData {
  companyName: string;
  contactPersonName: string;
  phone: string;
  email: string;
  industry: string;
  paymentTerms: string;
  addressLine1: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  website?: string;
  notes?: string;
}

interface FormErrors {
  [key: string]: string;
}

const AddClientModal: React.FC<AddClientModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  loading = false
}) => {
  const [formData, setFormData] = useState<ClientFormData>({
    companyName: '',
    contactPersonName: '',
    phone: '',
    email: '',
    industry: '',
    paymentTerms: '',
    addressLine1: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    website: '',
    notes: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Industry options as specified in the document
  const industryOptions = [
    'Technology',
    'Healthcare',
    'Finance',
    'Retail',
    'Manufacturing',
    'Real Estate'
  ];

  // Payment terms options as specified in the document
  const paymentTermsOptions = [
    'Net 30',
    'Net 45',
    'Net 60',
    'Advance Payment',
    'Milestone Based'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleDropdownChange = (name: string) => (value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [name]: value.toString()
    }));
    
    // Clear error when user selects an option
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required field validation
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.contactPersonName.trim()) {
      newErrors.contactPersonName = 'Contact person name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.industry) {
      newErrors.industry = 'Industry is required';
    }

    if (!formData.paymentTerms) {
      newErrors.paymentTerms = 'Payment terms are required';
    }

    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = 'Address line 1 is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'Zip code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

 
const handleClose = () => {
    if (!loading) {
      setFormData({
        companyName: '',
        contactPersonName: '',
        phone: '',
        email: '',
        industry: '',
        paymentTerms: '',
        addressLine1: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
        website: '',
        notes: ''
      });
      setErrors({});
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <ModalBackdrop isOpen={isOpen} onClose={handleClose}>
      <div className={clsx(
        "inline-block w-full max-w-4xl p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-lg",
        inter.className
      )}>
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add New Client</h2>
          <button
            onClick={handleClose}
            disabled={loading}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="max-h-[60vh] overflow-y-auto mt-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Company Information Section */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  Company Information
                </h3>
              </div>

              <InputField
                label="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Enter company name"
                mandatory
                error={errors.companyName}
                disabled={loading}
              />

              <InputField
                label="Contact Person Name"
                name="contactPersonName"
                value={formData.contactPersonName}
                onChange={handleInputChange}
                placeholder="Enter contact person name"
                mandatory
                error={errors.contactPersonName}
                disabled={loading}
              />

              <InputField
                label="Phone + Country Code"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
                mandatory
                error={errors.phone}
                disabled={loading}
              />

              <InputField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                mandatory
                error={errors.email}
                disabled={loading}
              />

              <Dropdown
                label="Industry"
                name="industry"
                value={formData.industry}
                options={industryOptions}
                onChange={handleDropdownChange('industry')}
                placeholder="Select industry"
                mandatory
                error={errors.industry}
                disabled={loading}
              />

              <Dropdown
                label="Payment Terms"
                name="paymentTerms"
                value={formData.paymentTerms}
                options={paymentTermsOptions}
                onChange={handleDropdownChange('paymentTerms')}
                placeholder="Select payment terms"
                mandatory
                error={errors.paymentTerms}
                disabled={loading}
              />

              {/* Address Information Section */}
              <div className="md:col-span-2 mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  Address Information
                </h3>
              </div>

              <div className="md:col-span-2">
                <InputField
                  label="Address Line 1"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  placeholder="Enter street address"
                  mandatory
                  error={errors.addressLine1}
                  disabled={loading}
                />
              </div>

              <InputField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Enter city"
                mandatory
                error={errors.city}
                disabled={loading}
              />

              <InputField
                label="State"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="Enter state/province"
                mandatory
                error={errors.state}
                disabled={loading}
              />

              <InputField
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="Enter country"
                mandatory
                error={errors.country}
                disabled={loading}
              />

              <InputField
                label="Zip Code"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                placeholder="Enter zip/postal code"
                mandatory
                error={errors.zipCode}
                disabled={loading}
              />

              {/* Additional Information Section */}
              <div className="md:col-span-2 mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  Additional Information
                </h3>
              </div>

              <InputField
                label="Website"
                name="website"
                type="url"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://www.example.com"
                disabled={loading}
              />

              <div className="md:col-span-2">
                <label className="text-[#7E7E7E] text-[14px] font-medium leading-tight pl-[10px]">
                  Notes
                </label>
                <div className="h-3" />
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Enter additional notes (optional)"
                  disabled={loading}
                  rows={4}
                  className={clsx(
                    inter.className,
                    "w-full border border-gray-300 p-3 rounded text-[14px] font-medium leading-normal placeholder:normal focus:outline-none focus:border-primaryColor resize-vertical min-h-[100px]",
                    loading && "opacity-50 cursor-not-allowed"
                  )}
                />
              </div>
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 pt-6 mt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Adding...
              </div>
            ) : (
              'Add Client'
            )}
          </button>
        </div>
      </div>
    </ModalBackdrop>
  );
};

export default AddClientModal;