import { AuthPageType } from "../utility/app-enum";


export interface AuthPageProps {
    onPageTypeChange: (pageType: AuthPageType) => void;

}


export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done';

export interface TaskModel {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  assignee?: string;
  dueDate?: string;
  completedDate?: string | null;
}

export interface ColumnModel {
  id: TaskStatus;
  title: string;
}

export interface UserModel {
    id: number;
    name: string;
    avatar?: string | null;
  }
  
export interface AttachmentModel {
    id?: number;
    file?: File;
    name: string;
    size: number;
    type: string;
    preview?: string | null;
    url?: string;
  }
  
export interface MessageModel {
    id: number;
    text: string;
    sender: string;
    time: string;
    isOwn: boolean;
    avatar?: string | null;
    attachments?: AttachmentModel[];
  }
  
export interface ChatModel {
    id: number;
    name: string;
    lastMessage: string;
    time: string;
    avatar?: string | null;
    isOnline?: boolean;
    unreadCount?: number;
    isGroup?: boolean;
    members?: UserModel[];
    messages: MessageModel[];
  }
  
export interface GroupData {
    name: string;
    members: UserModel[];
    isGroup: true;
  }

export  interface PersonalInformationDataModel {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }
  
export interface PasswordDataModel {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }
  
export interface NotificationStateModel {
    email: boolean;
    push: boolean;
  }
  
export  interface IssueModel {
    id: string;
    title: string;
    description: string;
    severity: 'Critical' | 'Medium' | 'Low';
    status: 'Open' | 'In Progress' | 'Under Review' | 'Resolved';
    assignee: string;
    assigneeInitials: string;
    createdDate: string;
    code: string;
  }

export  interface CalendarEvent {
    id: string;
    title: string;
    date: string;
    priority: 'critical' | 'medium' | 'normal' | 'milestone';
    description?: string;
    time?: string;
  }
  

  export interface Transaction {
    id: string;
    date: string;
    time: string;
    source: string;
    destination: string;
    via: string;
    utr: string;
    amount: number;
    type: 'credit' | 'debit';
  }
  
  export interface FinancialMetric {
    title: string;
    amount: string;
    change: string;
    changeType: 'positive' | 'negative';
    icon: React.ReactNode;
  }
  
  export interface CashflowData {
    month: string;
    received: number;
    sent: number;
  }
  
  export interface InsightItem {
    id: string;
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    description?: string;
    value?: string;
    valueColor?: string;
    type: 'trend' | 'anomaly' | 'opportunity';
  }


  export interface ExpenseModel {
    id: number;
    description: string;
    project: string;
    category?: string;
    purchaseOrder?: string;
    amount: number;
    date: string;
    items: ExpenseItem[];
    submittedBy: string;
    invoiceId?: string;
    invoiceAmount?: number;
    invoiceDate?:string
    invoiceDocument?:string
    status: 'pending' | 'approved' | 'rejected';
  }

  export interface ExpenseItem {
    id: number;
    name: string;
    quantity: number;
    unit: string;
    costPer: number;
    subTotal: number;
    category?:string
  }
  
  export interface ExpenseSummaryModel {
    thisMonthExpenses: { count: number; percentage: number };
    pendingApproval: { count: number; budgetUsed: string };
    topCategory: { name: string; percentage: number };
    expenseReport: { count: number; status: string };
  }


  export interface DocumentModel {
    id: string;
    name: string;
    category: string;
    size: string;
    uploadDate: Date;
    type: 'pdf' | 'doc' | 'docx' | 'jpg' | 'png';
    url?: string;
    folderId?: string;
  }
  
  export interface FolderModel {
    id: string;
    name: string;
    category: string;
    documentCount: number;
    createdDate: Date;
  }
  
  export interface CategoryModel {
    id: string;
    name: string;
    color: string;
    documentCount: number;
    createdDate: Date;
  }
  
  export type ViewMode = 'list' | 'grid';
  export type SortOrder = 'newest' | 'oldest' | 'name-asc' | 'name-desc' | 'size-asc' | 'size-desc';


  export interface Client {
    id: string;
    name: string;
    email: string;
    phone: string;
    project: string;
    projectType: string,
    clientType: string;
    status: string;
    initials: string;
    initialsColor: string;
  }


  export interface NewClientForm {
    name: string;
    email: string;
    phone: string;
    project: string;
    type: string;
    status: string;
  }