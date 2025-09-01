'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
// import { Button } from '@/app/components/ui/button';
import { Dropdown, DropdownOption } from '@/app/components/ui/dropdown';
// import { DatePicker } from '@/app/components/ui/date-picker';
import { Badge } from '@/app/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import DownloadIcon from '@/app/public/export_white_icon.svg';
import { BTButton } from '@/app/components/buttons/BTButton';
import { inter } from '@/app/fonts';
import { useHeaderConfig } from '@/app/context/HeaderContext';

interface AnalyticsData {
  projectMetrics: {
    totalProjects: number;
    activeProjects: number;
    completedProjects: number;
    delayedProjects: number;
  };
  financialMetrics: {
    totalRevenue: number;
    totalExpenses: number;
    profitMargin: number;
    outstandingInvoices: number;
  };
  taskMetrics: {
    totalTasks: number;
    completedTasks: number;
    inProgressTasks: number;
    overdueTasks: number;
  };
  resourceMetrics: {
    totalResources: number;
    availableResources: number;
    allocatedResources: number;
    utilizationRate: number;
  };
}

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState('30');
  const [loading, setLoading] = useState(true);
  const [selectedProject] = useState('all');//setSelectedProject
  const updateHeader = useHeaderConfig();
      
  useEffect(() => {
          // Update header config for this specific page
          updateHeader({
            title: "Analytics",
            showSearch: false,
            searchPlaceholder: "Search projects...",
            breadcrumbs: [
              { label: "Dashboard", href: "/dashboard" },
              { label: "Analytics", href: "" }
            ],
            notificationCount: 5
          });
      }, [updateHeader]);

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange, selectedProject]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      const mockData: AnalyticsData = {
        projectMetrics: {
          totalProjects: 24,
          activeProjects: 18,
          completedProjects: 6,
          delayedProjects: 3,
        },
        financialMetrics: {
          totalRevenue: 1250000,
          totalExpenses: 850000,
          profitMargin: 32,
          outstandingInvoices: 125000,
        },
        taskMetrics: {
          totalTasks: 156,
          completedTasks: 89,
          inProgressTasks: 45,
          overdueTasks: 22,
        },
        resourceMetrics: {
          totalResources: 45,
          availableResources: 28,
          allocatedResources: 17,
          utilizationRate: 62,
        },
      };
      setAnalyticsData(mockData);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const projectStatusData = [
    { name: 'Active', value: analyticsData?.projectMetrics.activeProjects || 0, color: '#4CAB02' },
    { name: 'Completed', value: analyticsData?.projectMetrics.completedProjects || 0, color: '#375DED' },
    { name: 'Delayed', value: analyticsData?.projectMetrics.delayedProjects || 0, color: '#EA5050' },
  ];

  const monthlyRevenueData = [
    { month: 'Jan', revenue: 85000, expenses: 65000 },
    { month: 'Feb', revenue: 92000, expenses: 72000 },
    { month: 'Mar', revenue: 105000, expenses: 78000 },
    { month: 'Apr', revenue: 98000, expenses: 82000 },
    { month: 'May', revenue: 115000, expenses: 85000 },
    { month: 'Jun', revenue: 125000, expenses: 90000 },
  ];

  const taskProgressData = [
    { name: 'Completed', value: analyticsData?.taskMetrics.completedTasks || 0, color: '#375DED' },
    { name: 'In Progress', value: analyticsData?.taskMetrics.inProgressTasks || 0, color: '#4CAB02' },
    { name: 'Overdue', value: analyticsData?.taskMetrics.overdueTasks || 0, color: '#EA5050' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className={`${inter.className} antialiased space-y-6 bg-[#f6f6f6]`}>
      {/* Header */}
        <div className="flex justify-between items-center mt-2 mb-8 p-[38px] h-[100px] rounded-md border-b shadow-sm bg-white">
            <div>
              <div className={`${inter.className} antialiased text-[24px] font-semibold mb-2 text-[#171E34]` }>Analytics</div>
              <p className={`${inter.className} antialiased text-[14px] font-medium text-[#525252]` }>Comprehensive insights into your construction projects</p>
            </div>
            
            <div className="flex space-x-3">
            <Dropdown value={timeRange} onValueChange={setTimeRange} className="w-32" placeholder="Time Range">
            <DropdownOption value="7">Last 7 days</DropdownOption>
            <DropdownOption value="30">Last 30 days</DropdownOption>
            <DropdownOption value="90">Last 90 days</DropdownOption>
            <DropdownOption value="365">Last year</DropdownOption>
          </Dropdown>
          <BTButton text='Export' icon={DownloadIcon} type='primary' onClick={()=>{}} size='medium'/>             </div>
          </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className={"bg-white"}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold">Total Revenue</CardTitle>
            <Badge variant="secondary" className="text-green-600">+12.5%</Badge>
          </CardHeader>
          <CardContent className={""}>
            <div className="text-2xl font-bold">
              ${analyticsData?.financialMetrics.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +$125,000 from last month
            </p>
          </CardContent>
        </Card>

        <Card className={"bg-white"}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold">Active Projects</CardTitle>
            <Badge variant="secondary" className="text-blue-600">Active</Badge>
          </CardHeader>
          <CardContent className={""}>
            <div className="text-2xl font-bold">{analyticsData?.projectMetrics.activeProjects}</div>
            <p className="text-xs text-muted-foreground">
              {analyticsData?.projectMetrics.totalProjects} total projects
            </p>
          </CardContent>
        </Card>

        <Card className={"bg-white"}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold">Task Completion</CardTitle>
            <Badge variant="secondary" className="text-green-600">57%</Badge>
          </CardHeader>
          <CardContent className={""}>
            <div className="text-2xl font-bold">{analyticsData?.taskMetrics.completedTasks}</div>
            <p className="text-xs text-muted-foreground">
              of {analyticsData?.taskMetrics.totalTasks} total tasks
            </p>
          </CardContent>
        </Card>

        <Card className={"bg-white"}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold">Resource Utilization</CardTitle>
            <Badge variant="secondary" className="text-orange-600">62%</Badge>
          </CardHeader>
          <CardContent className={""}>
            <div className="text-2xl font-bold">{analyticsData?.resourceMetrics.utilizationRate}%</div>
            <p className="text-xs text-muted-foreground">
              {analyticsData?.resourceMetrics.allocatedResources} of {analyticsData?.resourceMetrics.totalResources} resources
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Expenses */}
        <Card className={"bg-white"}>
          <CardHeader className={""}>
            <CardTitle className={""}>Revenue vs Expenses</CardTitle>
          </CardHeader>
          <CardContent className={""}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#375DED" name="Revenue" />
                <Bar dataKey="expenses" fill="#EA5050" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Project Status Distribution */}
        <Card className={"bg-white"}>
          <CardHeader className={""}>
            <CardTitle className={""}>Project Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className={""}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Task Progress */}
        <Card className={"bg-white"}>
          <CardHeader className={""}>
            <CardTitle className={""}>Task Progress Overview</CardTitle>
          </CardHeader>
          <CardContent className={""}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={taskProgressData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {taskProgressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Profit Margin Trend */}
        <Card className={"bg-white"}>
          <CardHeader className={""}>
            <CardTitle className={""}>Profit Margin Trend</CardTitle>
          </CardHeader>
          <CardContent className={""}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#375DED" 
                  strokeWidth={2}
                  name="Revenue"
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#EA5050" 
                  strokeWidth={2}
                  name="Expenses"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className={"bg-white"}>
          <CardHeader className={""}>
            <CardTitle className={""}>Financial Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Total Revenue:</span>
              <span className="font-semibold">${analyticsData?.financialMetrics.totalRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Expenses:</span>
              <span className="font-semibold">${analyticsData?.financialMetrics.totalExpenses.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Profit Margin:</span>
              <span className="font-semibold text-green-600">{analyticsData?.financialMetrics.profitMargin}%</span>
            </div>
            <div className="flex justify-between">
              <span>Outstanding Invoices:</span>
              <span className="font-semibold text-orange-600">${analyticsData?.financialMetrics.outstandingInvoices.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card className={"bg-white"}>
          <CardHeader className={""}>
            <CardTitle className={""}>Project Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Total Projects:</span>
              <span className="font-semibold">{analyticsData?.projectMetrics.totalProjects}</span>
            </div>
            <div className="flex justify-between">
              <span>Active Projects:</span>
              <span className="font-semibold text-blue-600">{analyticsData?.projectMetrics.activeProjects}</span>
            </div>
            <div className="flex justify-between">
              <span>Completed Projects:</span>
              <span className="font-semibold text-green-600">{analyticsData?.projectMetrics.completedProjects}</span>
            </div>
            <div className="flex justify-between">
              <span>Delayed Projects:</span>
              <span className="font-semibold text-red-600">{analyticsData?.projectMetrics.delayedProjects}</span>
            </div>
          </CardContent>
        </Card>

        <Card className={"bg-white"}>
          <CardHeader className={""}>
            <CardTitle className={""}>Resource Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Total Resources:</span>
              <span className="font-semibold">{analyticsData?.resourceMetrics.totalResources}</span>
            </div>
            <div className="flex justify-between">
              <span>Available Resources:</span>
              <span className="font-semibold text-green-600">{analyticsData?.resourceMetrics.availableResources}</span>
            </div>
            <div className="flex justify-between">
              <span>Allocated Resources:</span>
              <span className="font-semibold text-blue-600">{analyticsData?.resourceMetrics.allocatedResources}</span>
            </div>
            <div className="flex justify-between">
              <span>Utilization Rate:</span>
              <span className="font-semibold text-orange-600">{analyticsData?.resourceMetrics.utilizationRate}%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 