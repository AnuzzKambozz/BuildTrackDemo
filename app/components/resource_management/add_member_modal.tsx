"use client";

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import ModalBackdrop from '../modal_backdrop';
import InputField from '../textField';
import Dropdown from '../dropdowns/dropdown_new';
import { CreateEmployeeRequest, EmployeeRole, EmployeeDepartment, EmployeeStatus } from '../resource_management/type/resourse';
import { EmployeeModalProps, EmployeeValidationErrors } from '../resource_management/type/resourse';
// import { inter } from '@/app/fonts';
import { DEFAULT_EMPLOYEE, ROLE_OPTIONS, DEPARTMENT_OPTIONS, STATUS_OPTIONS  } from '../resource_management/type/resourse';
import { validateEmployee, hasValidationErrors } from '../resource_management/utils/resourse';

const AddTeamMemberModal: React.FC<EmployeeModalProps> = ({
  isOpen, onClose, onSubmit
}) => {
  const [formData, setFormData] = useState<CreateEmployeeRequest>(DEFAULT_EMPLOYEE);
  const [errors, setErrors] = useState<EmployeeValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample projects for the dropdown
  const PROJECT_OPTIONS = [
    { value: '', label: 'No Project Assigned' },
    { value: 'project-1', label: 'Downtown Office Building' },
    { value: 'project-2', label: 'Residential Complex Phase 1' },
    { value: 'project-3', label: 'Shopping Mall Renovation' },
    { value: 'project-4', label: 'Highway Bridge Construction' },
  ];

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData(DEFAULT_EMPLOYEE);
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else if (name === 'hourlyRate') {
      setFormData(prev => ({
        ...prev,
        [name]: value ? parseFloat(value) : undefined
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name as keyof EmployeeValidationErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleDropdownChange = (name: string, value: string | number) => {
    if (name === 'role') {
      setFormData(prev => ({ ...prev, role: value as EmployeeRole }));
    } else if (name === 'department') {
      setFormData(prev => ({ ...prev, department: value as EmployeeDepartment }));
    } else if (name === 'status') {
      setFormData(prev => ({ ...prev, status: value as EmployeeStatus }));
    } else if (name === 'currentProject') {
      setFormData(prev => ({ 
        ...prev, 
        currentProject: value ? { id: value.toString(), name: PROJECT_OPTIONS.find(p => p.value === value)?.label || '' } : null 
      }));
    }

    // Clear error when user makes selection
    if (errors[name as keyof EmployeeValidationErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    // Validate form data
    const validationErrors = validateEmployee(formData);
    setErrors(validationErrors);

    if (!hasValidationErrors(validationErrors)) {
      // Simulate API call
      setTimeout(() => {
        console.log('Creating employee:', formData);
        onSubmit(formData);
        onClose();
        setIsSubmitting(false);
      }, 1000);
    } else {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalBackdrop isOpen={isOpen} onClose={onClose}>
      <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Add New Employee</h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="mt-4 max-h-[500px] overflow-y-auto pr-2">
          <div className="space-y-4">
            {/* General Error */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-red-700 text-sm">{errors.general}</p>
              </div>
            )}

            {/* Personal Information Section */}
            <div>
              <h4 className="text-md font-medium text-gray-800 mb-3">Personal Information</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <InputField
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  mandatory={true}
                  error={errors.fullName}
                />
                
                <InputField
                  label="Job Title"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  placeholder="Senior Engineer"
                  mandatory={true}
                  error={errors.jobTitle}
                />
                
                <InputField
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 555-123-4567"
                  mandatory={true}
                  error={errors.phone}
                />
                
                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john.doe@company.com"
                  mandatory={true}
                  error={errors.email}
                />
                
                <InputField
                  label="Emergency Contact"
                  name="emergencyContact"
                  value={formData.emergencyContact || ''}
                  onChange={handleInputChange}
                  placeholder="+1 555-987-6543"
                  error={errors.emergencyContact}
                />
              </div>
            </div>

            {/* Work Information Section */}
            <div>
              <h4 className="text-md font-medium text-gray-800 mb-3">Work Information</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Dropdown
                  label="Role"
                  name="role"
                  value={formData.role}
                  options={ROLE_OPTIONS}
                  onChange={(value) => handleDropdownChange('role', value)}
                  placeholder="Select role"
                  mandatory={true}
                  error={errors.role}
                />
                
                <Dropdown
                  label="Department"
                  name="department"
                  value={formData.department}
                  options={DEPARTMENT_OPTIONS}
                  onChange={(value) => handleDropdownChange('department', value)}
                  placeholder="Select department"
                  mandatory={true}
                  error={errors.department}
                />
                
                <Dropdown
                  label="Current Project"
                  name="currentProject"
                  value={formData.currentProject?.id || ''}
                  options={PROJECT_OPTIONS}
                  onChange={(value) => handleDropdownChange('currentProject', value)}
                  placeholder="Select project"
                />
                
                <Dropdown
                  label="Status"
                  name="status"
                  value={formData.status || EmployeeStatus.ACTIVE}
                  options={STATUS_OPTIONS}
                  onChange={(value) => handleDropdownChange('status', value)}
                  placeholder="Select status"
                />
                
                <InputField
                  label="Hourly Rate ($)"
                  name="hourlyRate"
                  type="number"
                  value={formData.hourlyRate || ''}
                  onChange={handleInputChange}
                  placeholder="25.00"
                  error={errors.hourlyRate}
                />
                
                <InputField
                  label="Experience (years)"
                  name="experience"
                  value={formData.experience || ''}
                  onChange={handleInputChange}
                  placeholder="5"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 mt-3">
                <InputField
                  label="Skills (comma separated)"
                  name="skills"
                  value={formData.skills || ''}
                  onChange={handleInputChange}
                  placeholder="JavaScript, React, Node.js, Project Management"
                />
                
                <InputField
                  label="Certifications (comma separated)"
                  name="certifications"
                  value={formData.certifications || ''}
                  onChange={handleInputChange}
                  placeholder="PMP, AWS Certified, Safety Training"
                />
              </div>
            </div>

            {/* Address Information Section */}
            <div>
              <h4 className="text-md font-medium text-gray-800 mb-3">Address Information</h4>
              
              <div className="grid grid-cols-1 gap-3">
                <InputField
                  label="Address Line 1"
                  name="address.addressLine1"
                  value={formData.address.addressLine1}
                  onChange={handleInputChange}
                  placeholder="123 Main Street"
                  mandatory={true}
                  error={errors.addressLine1}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <InputField
                    label="City"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                    mandatory={true}
                    error={errors.city}
                  />
                  
                  <InputField
                    label="State"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleInputChange}
                    placeholder="NY"
                    mandatory={true}
                    error={errors.state}
                  />
                  
                  <InputField
                    label="Zip Code"
                    name="address.zipCode"
                    value={formData.address.zipCode}
                    onChange={handleInputChange}
                    placeholder="10001"
                    mandatory={true}
                    error={errors.zipCode}
                  />
                </div>
                
                <InputField
                  label="Country"
                  name="address.country"
                  value={formData.address.country}
                  onChange={handleInputChange}
                  placeholder="United States"
                  mandatory={true}
                  error={errors.country}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex gap-3 pt-4 border-t border-gray-200 mt-4">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-6 py-2 rounded-md font-medium text-sm transition-colors ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isSubmitting ? 'Creating...' : 'Create Employee'}
          </button>
          
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-md font-medium text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </ModalBackdrop>
  );
};


export default AddTeamMemberModal;