"use client";

import {  AlertCircle, CreditCard, FileText, Users } from "lucide-react";
import {  useState } from "react";
import MetricCard from "./metric_card";
import { FinancialMetric, InvoiceModal } from "@/app/models/common";
import { Search } from "lucide-react";
import {inter} from "@/app/fonts"
import { BTButton } from "@/app/components/buttons/BTButton";
import AddCircleIcon from '@/app/public/add_circle.svg'; 
import InvoiceTable from "./invoice_table";

interface InvoiceTabProps {
    onAdd:() => void;

    onView: (transaction: InvoiceModal) => void;
    onEdit: (transaction: InvoiceModal) => void;
  }


const InvoiceTab: React.FC <InvoiceTabProps> = ({ onEdit, onView, onAdd }) => {

    

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
  
//   const cashflowData: CashflowData[] = [
//     { month: 'Jan', received: 10000, sent: -3000 },
//     { month: 'Feb', received: 8000, sent: -4000 },
//     { month: 'Mar', received: 5000, sent: -7000 },
//     { month: 'Apr', received: 7000, sent: -2000 },
//     { month: 'May', received: 6000, sent: -4000 },
//     { month: 'Jun', received: 9000, sent: -3500 },
//     { month: 'Jul', received: 8500, sent: -2500 },
//     { month: 'Aug', received: 7500, sent: -3000 },
//     { month: 'Sep', received: 6500, sent: -4500 },
//     { month: 'Oct', received: 8000, sent: -3800 },
//     { month: 'Nov', received: 9500, sent: -2800 },
//     { month: 'Dec', received: 10500, sent: -3200 }
//   ];
  
//   const insightsData: InsightItem[] = [
//     {
//       id: '1',
//       icon: <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
//         <TrendingUp className="w-4 h-4 text-blue-600" />
//       </div>,
//       title: 'Cash Flow Trend',
//       description: 'Positive trend over the last 3 months',
//       value: '+8.2%',
//       valueColor: 'text-green-600',
//       type: 'trend'
//     },
//     {
//       id: '2',
//       icon: <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
//         <Calendar className="w-4 h-4 text-blue-600" />
//       </div>,
//       title: 'Anomalies Detected',
//       subtitle: 'Cost Overrun',
//       description: 'Adamson Kitchen- Cabinetry\n+$2,450 (15.3%)',
//       type: 'anomaly'
//     },
//     {
//       id: '3',
//       icon: <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
//         <Calendar className="w-4 h-4 text-blue-600" />
//       </div>,
//       title: 'Opportunities',
//       subtitle: 'Vendor Consolidation',
//       description: 'Consolidating purchases from 5 suppliers to2 could yield volume discounts.',
//       value: '$12,500 annual savings',
//       valueColor: 'text-blue-600',
//       type: 'opportunity'
//     }
//   ];

const [invoices, setInvoices] = useState<InvoiceModal[]>([
    {
      id: 'INV-2025-001',
      client: 'ABC Construction Ltd',
      clientEmail: 'billing@abcconstruction.com',
      projectName: 'Downtown Office Complex',
      projectCode: 'DOC-2024-15',
      amount: 45250.00,
      issueDate: '2025-01-15',
      dueDate: '2025-02-14',
      status: 'sent',
      items: [
        {id: 1, description: 'Bricks', category: "Materials" ,quantity: 100000, unit: "pcs", costPer: 150000000, subTotal: 1500000000000 },
        {id: 2, description: 'Cement jfrklgrlglrnltnglngnjbn kgrtklgnrglnb rknrnlknb', category: "Materials" ,quantity: 1, unit: "pcs", costPer: 1000, subTotal: 1000 },
        {id: 3, description: 'Bricks kgrtgklngln jgntkjgntg nkgmtkrngtkrngt5ng kmgkrmktn5g', category: "Materials" ,quantity: 1, unit: "pcs", costPer: 15000, subTotal: 15000 },
        {id: 4, description: 'Cement', category: "Materials" ,quantity: 100000000, unit: "pcs", costPer: 1000, subTotal: 1000 },
        {id: 5, description: 'Bricks', category: "Materials" ,quantity: 1000000000, unit: "pcs", costPer: 15000, subTotal: 15000 },
        {id: 6, description: 'Cement', category: "Materials" ,quantity: 1, unit: "pcs", costPer: 1000, subTotal: 1000 },
        {id: 7, description: 'Bricks', category: "Materials" ,quantity: 1, unit: "pcs", costPer: 15000, subTotal: 15000 },
        {id: 8, description: 'Cement', category: "Materials" ,quantity: 1, unit: "pcs", costPer: 1000, subTotal: 1000 },
      ]
    },
    {
      id: 'INV-2025-002',
      client: 'Metro Builders Inc',
      clientEmail: 'accounts@metrobuilders.com',
      projectName: 'Residential Tower Phase 2',
      projectCode: 'RT2-2024-08',
      amount: 16000.00,
      issueDate: '2025-01-20',
      dueDate: '2025-02-19',
      status: 'paid',
       items: [
        {id: 1, description: 'Bricks', category: "Materials" ,quantity: 1, unit: "pcs", costPer: 15000, subTotal: 15000 },
        {id: 2, description: 'Cement', category: "Materials" ,quantity: 1, unit: "pcs", costPer: 1000, subTotal: 1000 },
      ]
    },
    {
      id: 'INV-2025-003',
      client: 'Skyline Contractors',
      clientEmail: 'finance@skylinecontractors.com',
      projectName: 'Shopping Mall Renovation',
      projectCode: 'SMR-2024-22',
      amount: 32150.00,
      issueDate: '2025-02-01',
      dueDate: '2025-03-03',
      status: 'overdue',
      items: [
        {id: 1, description: 'Bricks', category: "Materials" ,quantity: 1, unit: "pcs", costPer: 15000, subTotal: 15000 },
        {id: 2, description: 'Cement', category: "Materials" ,quantity: 1, unit: "pcs", costPer: 1000, subTotal: 1000 },
      ]
    }
  ]);

// const [transactions] = useState<Transaction[]>([
//     {
//       id: 'TXN-001',
//       invoiceId: 'INV-2024-001',
//       amount: 1250.00,
//       paymentMethod: 'Credit Card',
//       paymentDate: '2024-03-15',
//       reference: 'REF123456',
//       client: 'John Doe',
//       project: "ABC Project",
//       description: 'Payment for consulting services',
//       fees: 25.00,
//       netAmount: 1225.00
//     },
//     {
//       id: 'TXN-002',
//       invoiceId: 'INV-2024-002',
//       amount: 850.00,
//       paymentMethod: 'Bank Transfer',
//       paymentDate: '2024-03-14',
//       reference: 'REF789012',
//       client: 'Jane Smith',
//       project: "XYZ Project",
//       description: 'Product purchase payment',
//       fees: 0.00,
//       netAmount: 850.00
//     },
//     {
//       id: 'TXN-003',
//       invoiceId: 'INV-2024-003',
//       amount: 2100.00,
//       paymentMethod: 'PayPal',
//       paymentDate: '2024-03-13',
//       reference: 'REF345678',
//       client: 'Mike Johnson',
//       project: "MNO Project",
//       description: 'Software license payment',
//       fees: 63.00,
//       netAmount: 2037.00
//     }
//   ]);
      
    // State for active tab and modal
    const [searchTerm, setSearchTerm] = useState<string>('');


  const filteredInvoices: InvoiceModal[] = invoices.filter(invoice => {
    const matchesSearch: boolean = invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.projectName.toLowerCase().includes(searchTerm.toLowerCase()) 
                        
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
                         <BTButton  text='Invoice' icon={AddCircleIcon} loading={false} size='medium' onClick={() => {
                            onAdd()
                  // Perform login logic here 
                //   setIsNewTransactionModalOpen(true)
                }  }/>

                    </div>
                </div>
            </div>

          {/* Transactions */}
         <InvoiceTable invoices={filteredInvoices} 
          onEdit={
          (invoice: InvoiceModal)=>{
            onEdit(invoice)
          }
         }

         onView={
          (invoice: InvoiceModal)=>{
            onView(invoice)
          }
         }
         
         
         />
         

        </div>
      </div>
    );
  };
  
  export default InvoiceTab;