export interface Milestone {
    id: number;
    name: string;
    targetDate: string;
  }
  
  export interface TeamMember {
    id: number;
    name: string;
    role: string;
  }
  
  export interface Permits {
    buildingPermit: boolean;
    electricalPermit: boolean;
    plumbingPermit: boolean;
    hvacPermit: boolean;
    historicDistrict: boolean;
    environmentalAssessment: boolean;
  }
  
  export interface ProjectFormData {
    // Basic Information
    projectName: string;
    client: string;
    projectType: string;
    projectAddress: string;
    city: string;
    state: string;
    zip: string;
    
    // Project Timeline
    startDate: string;
    estimateEndDate: string;
    projectStatus: string;
    milestones: Milestone[];
    
    // Financial Information
    projectBudget: string;
    budgetTemplate: string;
    projectTemplate: string;
    costCodeStructure: string;
    paymentTerms: string;
    
    // Project Team
    projectManager: string;
    siteSupervisor: string;
    additionalTeamMembers: TeamMember[];
    
    // Permits & Approvals
    permits: Permits;
  }
  
  export interface ComponentProps {
    data: ProjectFormData;
    updateData: (data: Partial<ProjectFormData>) => void;
  }