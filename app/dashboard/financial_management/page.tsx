"use client";

// import {  AlertCircle, CreditCard, FileText, Users, Calendar, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { BTButton } from "@/app/components/buttons/BTButton";
import AddCircleIcon from '@/app/public/add_circle.svg'; 

import OverviewTab from "./components/overviewTab";
import TransactionTab from "./components/transactionsTab";
import InvoiceTab from "./components/invoicesTab";

import CreateTransactionModal from "./components/new_transaction_modal";
import AddInvoiceModal from "./components/add-invoice-modal";
import InvoiceView from "./components/view-invoice-modal"
import ViewTransactionModal from "./components/view-transaction-modal"

import {  Transaction, InvoiceModal } from "@/app/models/common";
import { useHeaderConfig } from '@/app/context/HeaderContext';
import NavigationTabs from "./components/navigation_tabs"
import Dropdown from '@/app/components/dropdowns/dropdown_new';


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


  


  const projects = ['Project A', 'Project B', 'Project C'];
  const [project, setProject] = useState('');

  


  


// const [transactions, setTransactions] = useState<Transaction[]>([
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
    const [activeTab, setActiveTab] = useState('Overview');
    const [isNewInvoiceModalOpen, setIsNewInvoiceModalOpen] = useState(false);
    const [invoiceModalMode, setInvoiceModalMode] = useState<'add' | 'edit'>('add');
    const [editingInvoice, setEditingInvoice] = useState<InvoiceModal | undefined>(undefined);
    const [isViewInvoiceModal, setViewInvoiceModal] = useState(false);


    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
    const [transactionModalMode, setTransactionModalMode] = useState<'add' | 'edit'>('add');
    const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>(undefined);
    const [isViewTransactionModal, setViewTransactionModal] = useState(false);

    
    const tabs = ['Overview', 'Transactions', 'Invoices'];
  
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
              
              <div className="flex  items-center space-x-4 ">
                {/* <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm">
                  <option>Select Project</option>
                  <option>Project A</option>
                  <option>Project B</option>
                </select> */}
                <Dropdown
                name="project"
                value={project}
                options={projects}
                onChange={(value: string | number) => setProject( String(value))}
                label=""
                placeholder="Select Project"
                mandatory={false}
                searchable={false}
                showAddButton={false}
                // addButtonText='+ Add Client'
                // onAddItem={() => {
                //   console.log('Add Client clicked');
                // }}
                // searchPlaceholder="Search client..."
              />

              { ( activeTab === "Transactions") && <BTButton className="w-full" text='Transaction' icon={AddCircleIcon} loading={false} size='medium' onClick={() => {
                  // Perform login logic here 
                  setIsNewTransactionModalOpen(true)
                }  }/>}
                
                { (activeTab === "Invoices") && <BTButton className="w-full" text='Invoice' icon={AddCircleIcon} loading={false} size='medium' onClick={() => {
                  // Perform login logic here 
                  setIsNewInvoiceModalOpen(true)
                }  }/> }


              </div>
            </div>
            
            {/* Navigation Tabs */}
            <NavigationTabs activeTab={activeTab} tabs={tabs} onTabChange={setActiveTab}/>
          </div>
        </div>
  
        {/* Content */}
        {activeTab === "Overview" && <OverviewTab onEdit={(transaction: Transaction)=>{ 
            setTransactionModalMode('edit')
            setEditingTransaction(transaction)
            setIsNewTransactionModalOpen(true)
        }} onView={(transaction: Transaction)=>{ 
            setEditingTransaction(transaction)
            setViewTransactionModal(true)
        }} />}
        {activeTab === "Transactions" && <TransactionTab onEdit={(transaction: Transaction)=>{ 
            setTransactionModalMode('edit')
            setEditingTransaction(transaction)
            setIsNewTransactionModalOpen(true)
          }} 
          onView={(transaction: Transaction)=>{ 
            setEditingTransaction(transaction)
            setViewTransactionModal(true)
          }} 
          onAdd={() => {
          setTransactionModalMode('add')
          setIsNewTransactionModalOpen(true)
          }}/>
          }
        {activeTab === "Invoices" && <InvoiceTab onEdit={(invoice: InvoiceModal)=>{ 
            setInvoiceModalMode('edit')
            setEditingInvoice(invoice)
            setIsNewInvoiceModalOpen(true)
        }} onView={(invoice: InvoiceModal)=>{ 
            setEditingInvoice(invoice)
            setViewInvoiceModal(true)
        }} onAdd={() => {
          setInvoiceModalMode('add')
          setIsNewInvoiceModalOpen(true)
          }}
        />}


        {/*Add Transaction Modal */}
        {isNewTransactionModalOpen && 
        <CreateTransactionModal
        key={1}
          isOpen={isNewTransactionModalOpen}
          onClose={() => setIsNewTransactionModalOpen(false)}
          onSubmit={(transactionData) => {
            console.log('Transaction submitted:', transactionData);
            // Handle the transaction data
            setIsNewTransactionModalOpen(false);
          }}
          transaction={editingTransaction}
          mode={transactionModalMode || 'add'} // Provide fallback
        />}

      {/* Add Invoice Modal */}
          <AddInvoiceModal
            isOpen={isNewInvoiceModalOpen}
            onClose={() => setIsNewInvoiceModalOpen(false)}
            onSubmit={()=>{}}
            invoice={editingInvoice}
            mode={invoiceModalMode}
          />


          {/* View Invoice Modal */}
          <InvoiceView
            isOpen={isViewInvoiceModal}
            onClose={() => setViewInvoiceModal(false)}
            invoice={editingInvoice}
            onEdit={(invoice: InvoiceModal) => {
              console.log("Edit Tapped ", invoice )
              setViewInvoiceModal(false)
              setEditingInvoice(invoice);
              setInvoiceModalMode("edit")
              setIsNewInvoiceModalOpen(true)
            }}
            onGeneratePDF={(invoice: InvoiceModal)=>{}}
          />

         {/* View Transaction Modal */}
          <ViewTransactionModal
            isOpen={isViewTransactionModal}
            onClose={() => setViewTransactionModal(false)}
            transaction={editingTransaction}
            onEdit={(transaction: Transaction) => {
              console.log("Edit Tapped ", transaction )
              setViewTransactionModal(false)
              setEditingTransaction(transaction);
              setTransactionModalMode("edit")
              setIsNewTransactionModalOpen(true)
            }}
          />
      </div>
    );
  };
  
  export default FinancialManagement;