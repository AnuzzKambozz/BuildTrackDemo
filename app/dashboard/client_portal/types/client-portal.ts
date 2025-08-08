// types/client-portal.ts

export interface Client {
    id: string;
    name: string;
    email: string;
    type: 'Residential Client' | 'Commercial Client';
    projectCount: number;
    initials: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    role: 'Owner' | 'Designer' | 'Admin' | 'Viewer';
    status: 'Active' | 'Pending' | 'Inactive';
    lastLogin: string | null;
    avatar?: string;
    initials: string;
  }
  
  export interface ProjectAccess {
    clientId: string;
    clientName: string;
    projectName: string;
    enableProjectPortal: boolean;
    accessExpires: string | null;
    visibilityAccess: boolean;
    timelineProgress: boolean;
    projectPhotos: boolean;
    financialInformation: boolean;
    documentsFiles: boolean;
  }
  
  export interface ClientPortalSettings {
    enableClientPortal: boolean;
    defaultProjectVisibility: 'Limited Access' | 'Full Access' | 'No Access';
  }
  
  export interface TabConfig {
    id: string;
    label: string;
    isActive?: boolean;
  }
  
  export interface AddClientModalData {
    name: string;
    email: string;
    type: 'Residential Client' | 'Commercial Client';
  }
  
  export interface AddUserModalData {
    name: string;
    email: string;
    role: 'Owner' | 'Designer' | 'Admin' | 'Viewer';
  }