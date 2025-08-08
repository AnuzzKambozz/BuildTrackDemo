export interface ChangeOrder {
    id: string;
    description: string;
    type: 'Client' | 'Required';
    requestor: string;
    costImpact: number;
    timeImpact: number;
    status: 'Pending' | 'Approved' | 'Rejected';
    date: string;
  }
  
  export interface KPIData {
    totalChangeOrders: number;
    pendingApproval: number;
    budgetImpact: number;
    scheduleImpact: number;
    budgetPercentage: number;
  }
  
  export interface AddChangeOrderForm {
    description: string;
    type: 'Client' | 'Required';
    requestor: string;
    costImpact: string;
    timeImpact: string;
    priority: 'Low' | 'Medium' | 'High';
    reason: string;
  }
  
  export interface FilterState {
    searchTerm: string;
    statusFilter: 'All' | 'Pending' | 'Approved' | 'Rejected';
    typeFilter: 'All' | 'Client' | 'Required';
    dateFilter: string;
    sortBy: string;
  }
  