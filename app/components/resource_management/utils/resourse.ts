import { CreateEmployeeRequest, EmployeeValidationErrors } from '@/app/components/resource_management/type/resourse';


// Validation function
const validateEmployee = (employee: Partial<CreateEmployeeRequest>): EmployeeValidationErrors => {
  const errors: EmployeeValidationErrors = {};

  if (!employee.fullName?.trim()) {
    errors.fullName = "Full name is required";
  }

  if (!employee.jobTitle?.trim()) {
    errors.jobTitle = "Job title is required";
  }

  if (!employee.phone?.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^\+[\d\s-()]+$/.test(employee.phone)) {
    errors.phone = "Phone number must include country code (e.g., +1 555-123-4567)";
  }

  if (!employee.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employee.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!employee.role) {
    errors.role = "Role is required";
  }

  if (!employee.department) {
    errors.department = "Department is required";
  }

  if (!employee.address?.addressLine1?.trim()) {
    errors.addressLine1 = "Address line 1 is required";
  }

  if (!employee.address?.city?.trim()) {
    errors.city = "City is required";
  }

  if (!employee.address?.state?.trim()) {
    errors.state = "State is required";
  }

  if (!employee.address?.country?.trim()) {
    errors.country = "Country is required";
  }

  if (!employee.address?.zipCode?.trim()) {
    errors.zipCode = "Zip code is required";
  }

  if (employee.hourlyRate !== undefined && employee.hourlyRate < 0) {
    errors.hourlyRate = "Hourly rate must be a positive number";
  }

  if (employee.emergencyContact && !/^\+[\d\s-()]+$/.test(employee.emergencyContact)) {
    errors.emergencyContact = "Emergency contact must include country code";
  }

  return errors;
};

const hasValidationErrors = (errors: EmployeeValidationErrors): boolean => {
  return Object.values(errors).some(error => error !== undefined && error !== '');
};
export { validateEmployee, hasValidationErrors };