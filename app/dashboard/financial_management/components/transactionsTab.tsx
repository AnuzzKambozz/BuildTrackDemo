"use client";

import {  AlertCircle, CreditCard, FileText, Users } from "lucide-react";
import {  useState } from "react";
import MetricCard from "./metric_card";
import { FinancialMetric, Transaction } from "@/app/models/common";
import TransactionsTable from "./transactional_table"
import { Search } from "lucide-react";
import {inter} from "@/app/fonts"
import { BTButton } from "@/app/components/buttons/BTButton";
import AddCircleIcon from '@/app/public/add_circle.svg'; 

interface TransactionsTabProps {

    onView: (transaction: Transaction) => void;
    onEdit: (transaction: Transaction) => void;
    onAdd: () => void;

  }


const TransactionTab: React.FC <TransactionsTabProps> = ({ onEdit, onView, onAdd }) => {

    

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
    const [searchTerm, setSearchTerm] = useState<string>('');


  const filteredTransactions: Transaction[] = transactions.filter(txn => {
    const matchesSearch: boolean = txn.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         txn.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         txn.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         txn.reference.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });
    
  
    return (
      <div className="min-h-screen bg-[#f6f6f6]">

  
        {/* Content */}
        <div className="max-w-7xl mx-auto  py-8">
          {/* Financial Metrics */}
          
          <div className="grid grid-cols-4 gap-6 mb-8">
            {financialMetrics.map((metric, index) => (
              <MetricCard key={index} metric={metric} />
            ))}
          </div>

            <div className="bg-white rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex flex-row flex-wrap items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-md  bg-[#F9FAFC]">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                            type="text"
                            placeholder="Search by invoice, customer, or reference..."
                            value={searchTerm}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                            className={`${inter.className} antialiased font-normal text-[13px] text-[#98989C] h-[42px]  w-full pl-12 pr-4 py-3 bg-[#F9FAFC] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            />
                        </div>
                         <BTButton  text='Transaction' icon={AddCircleIcon} loading={false} size='medium' onClick={onAdd}/>

                    </div>
                </div>
            </div>

          {/* Transactions */}
         <TransactionsTable transactions={filteredTransactions} isRecentTransaction={false}
          onEdit={
          (transaction: Transaction)=>{
            onEdit(transaction)
          }
         }

         onView={
          (transaction: Transaction)=>{
            onView(transaction)
          }
         }
         
         
         />
         

        </div>
      </div>
    );
  };
  
  export default TransactionTab;