"use client";

import {  AlertCircle, CreditCard, FileText, Users, Calendar, TrendingUp } from "lucide-react";
import { useState } from "react";
import CashflowChart from "./cashflow_card";
import InsightsPanel from "./insights_panel";
import MetricCard from "./metric_card";
import { FinancialMetric, CashflowData, Transaction, InsightItem } from "@/app/models/common";
import TransactionsTable from "./transactional_table"

interface OverviewTabProps {

     onView: (transaction: Transaction) => void;
    onEdit: (transaction: Transaction) => void;
  }

const OverviewTab: React.FC <OverviewTabProps> = ({ onEdit, onView }) =>{

    

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

const [transactions] = useState<Transaction[]>([
    {
      id: 'TXN-001',
      invoiceId: 'INV-2024-001',
      amount: 1250.00,
      paymentMethod: 'Credit Card',
      paymentDate: '2024-03-15',
      reference: 'REF123456',
      client: 'John Doe',
      project: "ABC Project",
      description: 'Payment for consulting services',
      fees: 25.00,
      netAmount: 1225.00
    },
    {
      id: 'TXN-002',
      invoiceId: 'INV-2024-002',
      amount: 850.00,
      paymentMethod: 'Bank Transfer',
      paymentDate: '2024-03-14',
      reference: 'REF789012',
      client: 'Jane Smith',
      project: "XYZ Project",
      description: 'Product purchase payment',
      fees: 0.00,
      netAmount: 850.00
    },
    {
      id: 'TXN-003',
      invoiceId: 'INV-2024-003',
      amount: 2100.00,
      paymentMethod: 'PayPal',
      paymentDate: '2024-03-13',
      reference: 'REF345678',
      client: 'Mike Johnson',
      project: "MNO Project",
      description: 'Software license payment',
      fees: 63.00,
      netAmount: 2037.00
    }
  ]);
      
    // State for active tab and modal
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [activeTab, setActiveTab] = useState('Overview');
    
  
    return (
      <div className="min-h-screen bg-[#f6f6f6]">
        {/* Header */}

  
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
  
          {/* Transactions */}
         {(activeTab === "Overview" || activeTab === "Transactions") && 
         <TransactionsTable transactions={transactions} isRecentTransaction={true} 
         onEdit={(t)=> onEdit(t)}
         onView={(t) => onView(t)}
         />} 

        </div>
      </div>
    );
  };
  
  export default OverviewTab;