// ============================================================================
// EMPLOYEE MODEL DEFINITIONS (inline to avoid import issues)
// ============================================================================

export enum EmployeeRole {
  MANAGER = "Manager",
  SUPERVISOR = "Supervisor", 
  ENGINEER = "Engineer",
  ARCHITECT = "Architect",
  FOREMAN = "Foreman",
  WORKER = "Worker",
  DESIGNER = "Designer"
}

export enum EmployeeDepartment {
  MANAGEMENT = "Management",
  DESIGN = "Design",
  ENGINEERING = "Engineering", 
  CONSTRUCTION = "Construction",
  SAFETY = "Safety",
  QUALITY = "Quality"
}

export enum EmployeeStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  ON_LEAVE = "On Leave",
  TERMINATED = "Terminated"
}

export interface EmployeeAddress {
  addressLine1: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface Project {
  id: string;
  name: string;
}

export interface CreateEmployeeRequest {
  fullName: string;
  jobTitle: string;
  phone: string;
  email: string;
  role: EmployeeRole;
  department: EmployeeDepartment;
  address: EmployeeAddress;
  currentProject?: Project | null;
  hourlyRate?: number;
  status?: EmployeeStatus;
  skills?: string;
  experience?: number | string;
  certifications?: string;
  emergencyContact?: string;
}

export interface EmployeeValidationErrors {
  fullName?: string;
  jobTitle?: string;
  phone?: string;
  email?: string;
  role?: string;
  department?: string;
  addressLine1?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  hourlyRate?: string;
  emergencyContact?: string;
  general?: string;
}

// Dropdown options
export const ROLE_OPTIONS = [
  { value: EmployeeRole.MANAGER, label: "Manager" },
  { value: EmployeeRole.SUPERVISOR, label: "Supervisor" },
  { value: EmployeeRole.ENGINEER, label: "Engineer" },
  { value: EmployeeRole.ARCHITECT, label: "Architect" },
  { value: EmployeeRole.FOREMAN, label: "Foreman" },
  { value: EmployeeRole.WORKER, label: "Worker" },
  { value: EmployeeRole.DESIGNER, label: "Designer" }
];

export const DEPARTMENT_OPTIONS = [
  { value: EmployeeDepartment.MANAGEMENT, label: "Management" },
  { value: EmployeeDepartment.DESIGN, label: "Design" },
  { value: EmployeeDepartment.ENGINEERING, label: "Engineering" },
  { value: EmployeeDepartment.CONSTRUCTION, label: "Construction" },
  { value: EmployeeDepartment.SAFETY, label: "Safety" },
  { value: EmployeeDepartment.QUALITY, label: "Quality" }
];

export const STATUS_OPTIONS = [
  { value: EmployeeStatus.ACTIVE, label: "Active" },
  { value: EmployeeStatus.INACTIVE, label: "Inactive" },
  { value: EmployeeStatus.ON_LEAVE, label: "On Leave" },
  { value: EmployeeStatus.TERMINATED, label: "Terminated" }
];

export const DEFAULT_EMPLOYEE: CreateEmployeeRequest = {
  fullName: '',
  jobTitle: '',
  phone: '',
  email: '',
  role: EmployeeRole.WORKER,
  department: EmployeeDepartment.CONSTRUCTION,
  address: {
    addressLine1: '',
    city: '',
    state: '',
    country: '',
    zipCode: ''
  },
  status: EmployeeStatus.ACTIVE
};


export interface ModalBackdropProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}



export interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateEmployeeRequest) => void;
}