export interface TaskItem {
    id: string;
    title: string;
    description: string;
    type: 'overdue' | 'warning' | 'pending';
    actionLabel: string;
    amount?: string;
  }
  
  export  interface ScheduleItem {
    date: number;
    day: string;
    month: string;
    year: number;
    activities: {
      title: string;
      time: string;
      type: 'framing' | 'electrical' | 'insulation';
    }[];
  }
  
  export  interface TeamMember {
    id: string;
    name: string;
    role: string;
    avatar: string;
  }
  
  export interface InsightItem {
    type: 'cost' | 'schedule' | 'recommendation';
    title: string;
    value: string;
    description: string;
    icon: React.ReactNode;
  }
  
  export interface ProjectDashboardProps {
      projectName: string;
      projectAddress: string;
      completionPercentage: number;
      status: string;
      tasks: TaskItem[];
      schedule: ScheduleItem[];
      teamMembers: TeamMember[];
      insights: InsightItem[];
    }