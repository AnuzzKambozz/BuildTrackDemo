// types/budget.ts

export interface BudgetItem {
    category: string;
    budgeted: number;
    actual: number;
    remaining: number;
    percentage: number;
    status: 'On Track' | 'Over' | 'Under';
  }
  
  export interface AdjustmentFormData {
    category: string;
    amount: string;
    reason: string;
  }
  
  export interface BudgetSummary {
    totalBudget: number;
    spentToDate: number;
    remaining: number;
    projectFinal: number;
    contingencyRemaining: number;
  }
  
  export interface Project {
    id: string;
    name: string;
    budget: BudgetSummary;
    items: BudgetItem[];
  }
  
  // Component Props Interfaces
  
  export interface BudgetHeaderProps {
    title?: string;
    subtitle?: string;
    selectedProject: string;
    onProjectChange: (project: string) => void;
    projects?: string[];
    activeTab: string;
    onTabChange: (tab: string) => void;
    tabs?: string[];
  }
  
  export interface BudgetSummaryProps {
    totalBudget?: number;
    spentToDate?: number;
    remaining?: number;
    projectFinal?: number;
    contingencyRemaining?: number;
    onBudgetDetailsClick: () => void;
  }
  
  export interface BudgetBreakdownTableProps {
    budgetData: BudgetItem[];
    onFilter: () => void;
    onExport: () => void;
    loading?: boolean;
    error?: string | null;
  }
  
  export interface BudgetAdjustmentFormProps {
    onSubmit: (formData: AdjustmentFormData) => void;
    onCancel: () => void;
    categories?: string[];
    initialData?: AdjustmentFormData;
    loading?: boolean;
    error?: string | null;
  }
  
  // API Response Types
  export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
  }
  
  export interface BudgetApiData {
    project: Project;
    lastUpdated: string;
  }
  
  // Event Handler Types
  export type ProjectChangeHandler = (project: string) => void;
  export type TabChangeHandler = (tab: string) => void;
  export type FormSubmitHandler = (formData: AdjustmentFormData) => void;
  export type VoidHandler = () => void;
  
  // Utility Types
  export type BudgetStatus = 'On Track' | 'Over' | 'Under';
  export type TabName = 'Budget Planning' | 'Cost Tracking' | 'Invoices' | 'Reports';
  
  // Constants
  export const DEFAULT_CATEGORIES = [
    'Materials',
    'Labors', 
    'Subcontractors',
    'Equipment',
    'Permits & Fees'
  ] as const;
  
  export const DEFAULT_TABS: TabName[] = [
    'Budget Planning',
    'Cost Tracking', 
    'Invoices',
    'Reports'
  ];
  
  export const DEFAULT_PROJECTS = [
    'Spethman Renovation',
    'Downtown Office',
    'Warehouse Project'
  ] as const;