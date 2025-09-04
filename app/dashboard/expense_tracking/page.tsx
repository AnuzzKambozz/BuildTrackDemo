"use client";

import FilterDropdown from "@/app/components/dropdowns/title_dropdown";
import { Calendar, FileText, TrendingUp, DollarSign, Search } from "lucide-react";
import { useEffect, useState } from "react";
import ExpenseModal from "./components/expense_modal";
import POExpenseModal from "./components/po_expense_modal";

import StatCard from "./components/status_card";
import { ExpenseModel, ExpenseSummaryModel } from "@/app/models/common";
import ExpenseRow from "./components/expense_row";
import { useHeaderConfig } from '@/app/context/HeaderContext';
import { BTButton } from '@/app/components/buttons/BTButton'; 
import  AddCircleIcon  from '@/app/public/add_circle.svg';

const ExpenseTrackingDashboard: React.FC = () => {

  const updateHeader = useHeaderConfig();
    
      useEffect(() => {
              // Update header config for this specific page
              updateHeader({
                title: "Expense Tracking",
                showSearch: false,
                searchPlaceholder: "Search projects...",
                breadcrumbs: [
                  { label: "Dashboard", href: "/dashboard" },
                  { label: "Expense Tracking", href: "" }
                ],
                notificationCount: 5
              });
          }, [updateHeader]);

// Mock data
const initialExpenses: ExpenseModel[] = [
    {
      id: 1,
      description: 'Lumber for framing',
      project: 'Spethman Renovation',
      category: 'Materials',
      items: [],
      amount: 4250.00,
      date: 'Mar 28 2025',
      submittedBy: 'Daniel James',
      status: 'pending'
    },
    {
      id: 2,
      description: 'Kitchen appliances',
      project: "Steven's Kitchen",
      category: 'Equipments',
      amount: 4250.00,
            items: [],

      date: 'Mar 28 2025',
      submittedBy: 'Steven Robert',
      status: 'pending'
    },
    {
      id: 3,
      description: 'Concrete delivery',
      project: 'Nerolac Custom Home',
      category: 'Materials',
      amount: 4250.00,
            items: [],

      date: 'Mar 28 2025',
      submittedBy: 'Juleha Anana',
      status: 'rejected'
    },
    {
      id: 4,
      description: 'window installation labor',
      project: 'Bruke Roof Siding',
      category: 'Labor',
      amount: 4250.00,
            items: [],

      date: 'Mar 28 2025',
      submittedBy: 'Carlos Lopez',
      status: 'approved'
    },
    {
      id: 5,
      description: 'Electrical supplies',
      project: 'Asian Zone Spec Home',
      category: 'Materials',
      amount: 8460.00,
       items: [],

      date: 'Mar 28 2025',
      submittedBy: 'Elite Electric',
      status: 'approved'
    }
  ];
  


    const [expenses, setExpenses] = useState<ExpenseModel[]>(initialExpenses);
    const [filters, setFilters] = useState<{
      project: string;
      category: string;
      dateRange: string;
      sort: string;
    }>({
      project: 'All',
      category: 'All',
      dateRange: 'All',
      sort: 'Newest'
    });
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [activeTab, setActiveTab] = useState<string>('All Expenses');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [editingExpense, setEditingExpense] = useState<ExpenseModel | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isPOModalOpen, setIsPOModalOpen] = useState<boolean>(false);

  
    // Calculate summary data dynamically
    const summary: ExpenseSummaryModel = {
      thisMonthExpenses: {
        count: expenses.length,
        percentage: 8.3
      },
      pendingApproval: {
        count: expenses.filter(e => e.status === 'pending').length,
        budgetUsed: `$${expenses.filter(e => e.status === 'pending').reduce((sum, e) => sum + e.amount, 0).toFixed(0)}/75`
      },
      topCategory: {
        name: 'Materials',
        percentage: expenses.length > 0 ? Math.round((expenses.filter(e => e.category === 'Materials').length / expenses.length) * 100) : 0
      },
      expenseReport: {
        count: expenses.filter(e => e.status !== 'pending').length,
        status: 'All Submitted'
      }
    };
  
    const tabs: string[] = ['All Expenses', 'Pending', 'Approved', 'Rejected', 'Reports'];
    const projects: string[] = ['All', ...Array.from(new Set(expenses.map(e => e.project)))];
    const categories: string[] = ['All', 'Materials', 'Equipments', 'Labor'];
    const dateRanges: string[] = ['All', 'Today', 'This Week', 'This Month', 'Last Month'];
    const sortOptions: string[] = ['Newest', 'Oldest', 'Amount High to Low', 'Amount Low to High'];
  
    const filteredExpenses: ExpenseModel[] = expenses.filter(expense => {
      const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           expense.project.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesProject = filters.project === 'All' || expense.project === filters.project;
      const matchesCategory = filters.category === 'All' || expense.category === filters.category;
      const matchesTab = activeTab === 'All Expenses' || 
                        (activeTab === 'Pending' && expense.status === 'pending') ||
                        (activeTab === 'Approved' && expense.status === 'approved') ||
                        (activeTab === 'Rejected' && expense.status === 'rejected');
      
      return matchesSearch && matchesProject && matchesCategory && matchesTab;
    });
  
    const handleAddExpense = (): void => {
      setModalMode('add');
      setEditingExpense(undefined);
      setIsModalOpen(true);
    };

    const handleAddPOExpense = (): void => {
      setModalMode('add');
      setEditingExpense(undefined);
      setIsPOModalOpen(true);
    };
  
    const handleEditExpense = (expense: ExpenseModel): void => {
      setModalMode('edit');
      setEditingExpense(expense);
      if (expense.category === "Purchase Order"){
        setIsPOModalOpen(true);
      } else {
      setIsModalOpen(true);
      }
    };

    
  
    const handleSubmitExpense = (expenseData: ExpenseModel | Omit<ExpenseModel, 'id'>): void => {
      if (modalMode === 'edit' && 'id' in expenseData) {
        setExpenses(expenses.map(e => e.id === expenseData.id ? expenseData : e));
      } else {
        const newExpense = {
          ...expenseData,
          id: Math.max(...expenses.map(e => e.id), 0) + 1,
        };
        setExpenses([newExpense, ...expenses]);
      }
    };
  
    const handleDeleteExpense = (id: number): void => {
      setExpenses(expenses.filter(e => e.id !== id));
    };
  
    const handleStatusChange = (id: number, status: 'pending' | 'approved' | 'rejected'): void => {
      setExpenses(expenses.map(e => e.id === id ? { ...e, status } : e));
    };
  
    return (
      <div className="min-h-screen bg-[#f6f6f6] ">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-6">
            <StatCard
              icon={<Calendar className="w-5 h-5 text-blue-600" />}
              title="This Month's Expenses"
              value={summary.thisMonthExpenses.count}
              subtitle={`+${summary.thisMonthExpenses.percentage}%`}
            />
            <StatCard
              icon={<FileText className="w-5 h-5 text-blue-600" />}
              title="Pending Approval"
              value={summary.pendingApproval.count}
              subtitle={summary.pendingApproval.budgetUsed}
              subtitleColor="text-orange-600"
            />
            <StatCard
              icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
              title="Top Category"
              value={summary.topCategory.name}
              subtitle={`${summary.topCategory.percentage}% of total`}
              subtitleColor="text-blue-600"
            />
            <StatCard
              icon={<DollarSign className="w-5 h-5 text-blue-600" />}
              title="Expense Report"
              value={summary.expenseReport.count}
              subtitle={summary.expenseReport.status}
              subtitleColor="text-green-600"
            />
          </div>
  
          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header */}
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">Expense Tracking</h1>
                  <p className="text-gray-600">Lorem Ipsum is a dummy text to fill space</p>
                </div>
                <div className="flex space-x-4">
                  <BTButton text='Add Purchase Order Expense' icon={AddCircleIcon} loading={false} size='medium' onClick={handleAddPOExpense}  />
                  <BTButton text='Add General Expense' icon={AddCircleIcon} loading={false} size='medium' onClick={handleAddExpense}  />
                </div>
                  
              </div>
            </div>
  
            {/* Tabs */}
            <div className="px-6 border-b border-gray-200">
              <div className="flex space-x-6">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 px-1 text-sm font-medium border-b-2 ${
                      activeTab === tab
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
  
            {/* Filters */}
            <div className="p-6 space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                {/* Search */}
                <div className="relative flex-1 min-w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search expenses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
  
                {/* Filter Dropdowns */}
                <FilterDropdown
                  label="Project"
                  value={filters.project}
                  options={projects}
                  onChange={(value) => setFilters({ ...filters, project: value })}
                />
                <FilterDropdown
                  label="Category"
                  value={filters.category}
                  options={categories}
                  onChange={(value) => setFilters({ ...filters, category: value })}
                />
                <FilterDropdown
                  label="Date Range"
                  value={filters.dateRange}
                  options={dateRanges}
                  onChange={(value) => setFilters({ ...filters, dateRange: value })}
                />
                <FilterDropdown
                  label="Sort"
                  value={filters.sort}
                  options={sortOptions}
                  onChange={(value) => setFilters({ ...filters, sort: value })}
                />
              </div>
            </div>
  
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted by
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredExpenses.length > 0 ? (
                    filteredExpenses.map((expense) => (
                      <ExpenseRow
                        key={expense.id}
                        expense={expense}
                        onEdit={handleEditExpense}
                        onDelete={handleDeleteExpense}
                        onStatusChange={handleStatusChange}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center">
                          <FileText className="w-12 h-12 text-gray-300 mb-4" />
                          <p className="text-lg font-medium">No records found</p>
                          <p className="text-sm text-gray-400 mt-1">
                            {activeTab === 'All Expenses' 
                              ? 'Try adjusting your search or filters to find what you\'re looking for.'
                              : `No expenses found in ${activeTab.toLowerCase()} status.`
                            }
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
  
            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  1 of 10
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    &lt;
                  </button>
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">
                    {currentPage}
                  </button>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          </div>
  
          {/* Expense Modal */}
          <ExpenseModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleSubmitExpense}
            expense={editingExpense}
            mode={modalMode}
          />

          {/*PO  Expense Modal */}
          <POExpenseModal
            isOpen={isPOModalOpen}
            onClose={() => setIsPOModalOpen(false)}
            onSubmit={handleSubmitExpense}
            expense={editingExpense}
            mode={modalMode}
          />
        </div>
      </div>
    );
  };
  
  export default ExpenseTrackingDashboard;