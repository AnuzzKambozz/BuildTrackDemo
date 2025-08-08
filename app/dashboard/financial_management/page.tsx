"use client";

import { Plus, Filter, Download, AlertCircle, CreditCard, FileText, Users, Calendar, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import CashflowChart from "./components/cashflow_card";
import InsightsPanel from "./components/insights_panel";
import MetricCard from "./components/metric_card";
import NewTransactionModal from "./components/new_transaction_modal";
import TransactionRow from "./components/transaction_row";
import { FinancialMetric, CashflowData, Transaction, InsightItem } from "@/app/models/common";
import { useHeaderConfig } from '@/app/context/HeaderContext';


const FinancialManagement: React.FC = () => {

const updateHeader = useHeaderConfig();
    
      useEffect(() => {
              // Update header config for this specific page
              updateHeader({
                title: "Financial Tracking",
                showSearch: false,
                searchPlaceholder: "Search projects...",
                breadcrumbs: [
                  { label: "Dashboard", href: "/dashboard" },
                  { label: "Financial Tracking", href: "" }
                ],
                notificationCount: 5
              });
          }, [updateHeader]);
// Sample data
const financialMetrics: FinancialMetric[] = [
    {
      title: 'Total Invoice',
      amount: '$875,000',
      change: '+15.2% from last month',
      changeType: 'positive',
      icon: <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
        <FileText className="w-5 h-5 text-blue-600" />
      </div>
    },
    {
      title: 'Total Paid',
      amount: '$875,000',
      change: '64.3% of total invoiced',
      changeType: 'positive',
      icon: <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
        <CreditCard className="w-5 h-5 text-green-600" />
      </div>
    },
    {
      title: 'Outstanding',
      amount: '$312,500',
      change: '+35.7% of total invoiced',
      changeType: 'positive',
      icon: <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
        <Users className="w-5 h-5 text-orange-600" />
      </div>
    },
    {
      title: 'Overdue',
      amount: '$87,500',
      change: '+15.2% from last month',
      changeType: 'negative',
      icon: <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
        <AlertCircle className="w-5 h-5 text-red-600" />
      </div>
    }
  ];
  
  const cashflowData: CashflowData[] = [
    { month: 'Jan', received: 10000, sent: -3000 },
    { month: 'Feb', received: 8000, sent: -4000 },
    { month: 'Mar', received: 5000, sent: -7000 },
    { month: 'Apr', received: 7000, sent: -2000 },
    { month: 'May', received: 6000, sent: -4000 },
    { month: 'Jun', received: 9000, sent: -3500 },
    { month: 'Jul', received: 8500, sent: -2500 },
    { month: 'Aug', received: 7500, sent: -3000 },
    { month: 'Sep', received: 6500, sent: -4500 },
    { month: 'Oct', received: 8000, sent: -3800 },
    { month: 'Nov', received: 9500, sent: -2800 },
    { month: 'Dec', received: 10500, sent: -3200 }
  ];
  
  const insightsData: InsightItem[] = [
    {
      id: '1',
      icon: <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
        <TrendingUp className="w-4 h-4 text-blue-600" />
      </div>,
      title: 'Cash Flow Trend',
      description: 'Positive trend over the last 3 months',
      value: '+8.2%',
      valueColor: 'text-green-600',
      type: 'trend'
    },
    {
      id: '2',
      icon: <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
        <Calendar className="w-4 h-4 text-blue-600" />
      </div>,
      title: 'Anomalies Detected',
      subtitle: 'Cost Overrun',
      description: 'Adamson Kitchen- Cabinetry\n+$2,450 (15.3%)',
      type: 'anomaly'
    },
    {
      id: '3',
      icon: <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
        <Calendar className="w-4 h-4 text-blue-600" />
      </div>,
      title: 'Opportunities',
      subtitle: 'Vendor Consolidation',
      description: 'Consolidating purchases from 5 suppliers to2 could yield volume discounts.',
      value: '$12,500 annual savings',
      valueColor: 'text-blue-600',
      type: 'opportunity'
    }
  ];
  
  const transactions: Transaction[] = [
    {
      id: '1',
      date: '25 Jan,2025',
      time: '7:45 AM',
      source: 'SBI2*****3445',
      destination: 'SBI2*****3445',
      via: 'NEFT',
      utr: 'UTR27636478',
      amount: 17806.50,
      type: 'credit'
    },
    {
      id: '2',
      date: '25 Jan,2025',
      time: '7:45 AM',
      source: 'SBI2*****3445',
      destination: 'SBI2*****3445',
      via: 'NEFT',
      utr: 'UTR27636478',
      amount: 17806.50,
      type: 'credit'
    },
    {
      id: '3',
      date: '25 Jan,2025',
      time: '7:45 AM',
      source: 'SBI2*****3445',
      destination: 'SBI2*****3445',
      via: 'NEFT',
      utr: 'UTR27636478',
      amount: 20976.50,
      type: 'debit'
    },
    {
      id: '4',
      date: '25 Jan,2025',
      time: '7:45 AM',
      source: 'SBI2*****3445',
      destination: 'SBI2*****3445',
      via: 'NEFT',
      utr: 'UTR27636478',
      amount: 17806.50,
      type: 'credit'
    },
    {
      id: '5',
      date: '25 Jan,2025',
      time: '7:45 AM',
      source: 'SBI2*****3445',
      destination: 'SBI2*****3445',
      via: 'NEFT',
      utr: 'UTR27636478',
      amount: 20976.50,
      type: 'debit'
    },
    {
      id: '6',
      date: '25 Jan,2025',
      time: '7:45 AM',
      source: 'SBI2*****3445',
      destination: 'SBI2*****3445',
      via: 'NEFT',
      utr: 'UTR27636478',
      amount: 17806.50,
      type: 'credit'
    }
  ];
  
      
    // State for active tab and modal
    const [activeTab, setActiveTab] = useState('Overview');
    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
    
    const tabs = ['Overview', 'Invoices', 'Expenses', 'Project Budgets', 'Reports'];
  
    return (
      <div className="min-h-screen bg-[#f6f6f6]">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Financial Management</h1>
                <p className="text-gray-600">Track invoices, expenses and financial performance</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm">
                  <option>Select Project</option>
                  <option>Project A</option>
                  <option>Project B</option>
                </select>
                
                <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm">
                  <option>Select Date</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
                
                <button
                  onClick={() => setIsNewTransactionModalOpen(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Transaction</span>
                </button>
              </div>
            </div>
            
            {/* Navigation Tabs */}
            <div className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
  
        {/* Content */}
        <div className="max-w-7xl mx-auto  py-8">
          {/* Financial Metrics */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {financialMetrics.map((metric, index) => (
              <MetricCard key={index} metric={metric} />
            ))}
          </div>
  
          {/* Main Content Grid */}
          <div className="grid grid-cols-2 gap-8 ">
            {/* Left Column - Cashflow Chart */}
            <div>
              <CashflowChart data={cashflowData} />
            </div>
  
            {/* Right Column - Insights */}
            <div>
              <InsightsPanel insights={insightsData} />
            </div>
          </div>
  
          {/* Recent Transactions */}
          <div className="mt-8 bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Via</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UTR</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <TransactionRow key={transaction.id} transaction={transaction} />
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-center">
                <button className="text-blue-600 text-sm hover:text-blue-700">
                  View All Transactions
                </button>
              </div>
            </div>
          </div>
        </div>
  
        {/* Modal */}
        <NewTransactionModal 
          isOpen={isNewTransactionModalOpen} 
          onClose={() => setIsNewTransactionModalOpen(false)} 
        />
      </div>
    );
  };
  
  export default FinancialManagement;