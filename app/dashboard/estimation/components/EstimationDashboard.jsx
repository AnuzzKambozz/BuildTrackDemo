/**
 * Estimation Dashboard Component
 * Main dashboard for project estimation and bidding system
 */

import { useState, useEffect, act } from 'react';
import FilterDropdown from '@/app/components/dropdowns/title_dropdown';

import { 
  Plus, 
  Search, 
  Calculator, 
  FileText, 
  DollarSign,
  Clock,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';

import { motion, AnimatePresence } from 'framer-motion';
import { BTButton } from '@/app/components/buttons/BTButton'; 
import  AddCircleIcon  from '@/app/public/add_circle.svg';
// import  FilterIcon  from '@/app/public/filter_icon.svg'; // Assuming you have a filter icon
import { inter } from '@/app/fonts'; // Assuming you have a custom font setup

const EstimationDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [estimates, setEstimates] = useState([]);
  const [activeTab, setActiveTab] = useState('Estimates');

  // const [loading, setLoading] = useState(false);
  const tabs = ['Estimates', 'Templates', 'History'];

  const statusOptions = ['All', 'Draft', 'Submitted', 'Approved', 'Rejected'];
  const typeOptions = ['All', 'Residential', 'Commercial', 'Industrial', 'Infrastructure'];


  // Mock data for demonstration
  const mockEstimates = [
    {
      id: 1,
      name: 'Downtown Office Complex',
      project_type: 'commercial',
      status: 'draft',
      total_cost: 2500000,
      created_date: '2025-01-10',
      client: 'ABC Corporation',
      materials_cost: 1200000,
      labor_cost: 800000,
      equipment_cost: 300000,
      overhead: 200000,
      profit_margin: 15,
    },
    {
      id: 2,
      name: 'Residential Villa Project',
      project_type: 'residential',
      status: 'submitted',
      total_cost: 850000,
      created_date: '2025-01-08',
      client: 'Johnson Family',
      materials_cost: 400000,
      labor_cost: 300000,
      equipment_cost: 100000,
      overhead: 50000,
      profit_margin: 12,
    },
    {
      id: 3,
      name: 'Highway Bridge Renovation',
      project_type: 'infrastructure',
      status: 'approved',
      total_cost: 5200000,
      created_date: '2025-01-05',
      client: 'State Department of Transportation',
      materials_cost: 2800000,
      labor_cost: 1500000,
      equipment_cost: 600000,
      overhead: 300000,
      profit_margin: 18,
    },
  ];

  useEffect(() => {
    setEstimates(mockEstimates);
  }, []);

  // Filter estimates based on search and filters
  const filteredEstimates = estimates.filter(estimate => {
    const matchesSearch = estimate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         estimate.client.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || estimate.status === statusFilter;
    const matchesType = typeFilter === 'all' || estimate.project_type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Calculate dashboard statistics
  const stats = {
    total: estimates.length,
    draft: estimates.filter(e => e.status === 'draft').length,
    submitted: estimates.filter(e => e.status === 'submitted').length,
    approved: estimates.filter(e => e.status === 'approved').length,
    totalValue: estimates.reduce((sum, e) => sum + e.total_cost, 0),
    avgMargin: estimates.reduce((sum, e) => sum + e.profit_margin, 0) / estimates.length || 0,
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'submitted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const EstimateCard = ({ estimate }) => (
    <Card className="hover:shadow-lg bg-white transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-gray-900 truncate">
              {estimate.name}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {estimate.client}
            </p>
          </div>
          <Badge variant="outline" className={getStatusColor(estimate.status)}>
            {estimate.status.charAt(0).toUpperCase() + estimate.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Total Cost */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Total Estimate</span>
          <span className="text-lg font-bold text-green-600">
            {formatCurrency(estimate.total_cost)}
          </span>
        </div>

        {/* Cost Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Materials</span>
            <span>{formatCurrency(estimate.materials_cost)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Labor</span>
            <span>{formatCurrency(estimate.labor_cost)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Equipment</span>
            <span>{formatCurrency(estimate.equipment_cost)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Overhead</span>
            <span>{formatCurrency(estimate.overhead)}</span>
          </div>
        </div>

        {/* Profit Margin */}
        <div className="flex justify-between items-center pt-2 border-t">
          <span className="text-sm text-gray-600">Profit Margin</span>
          <span className="text-sm font-medium text-blue-600">
            {estimate.profit_margin}%
          </span>
        </div>

        {/* Project Type */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Type</span>
          <Badge variant="secondary" className="text-xs">
            {estimate.project_type.replace('_', ' ').toUpperCase()}
          </Badge>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            <FileText className="h-4 w-4 mr-2" />
            View
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Calculator className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto  space-y-6 ">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 p-[38px] h-[100px] rounded-md border-b shadow-sm bg-white">
        <div>
          <div className={`${inter.className} antialiased text-[24px] font-semibold mb-2 text-[#171E34]` }>Estimation</div>
          <p className={`${inter.className} antialiased text-[14px] font-medium text-[#525252]` }>Create accurate project estimates and manage bids</p>
        </div>
        
        <div className="flex space-x-3">
          {/* <BTButton text='Cost Calulator' loading={false} size='medium' type='outline_gray'   /> */}
          <BTButton text='Add Estimate' icon={AddCircleIcon} loading={false} size='medium'  />
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">


        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                {/* <Image src={icon} alt="" width={24} height={24} className="center"/> */}
                <FileText className="h-6 w-6 text-blue-600" />
                <span className={`${inter.className} antialiased text-[#313030] text-[16ps] font-medium`}>Total Estimates</span>
              </div>
              <div className={`${inter.className} antialiased text-[30px] font-bold text-[#1F2546] mb-1 text-wrap overflow-hidden whitespace-nowrap`}>
                {stats.total}
              </div>
            </div>


<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                {/* <Image src={icon} alt="" width={24} height={24} className="center"/> */}
                <Clock className="h-6 w-6 text-gray-600" />
                <span className={`${inter.className} antialiased text-[#313030] text-[16ps] font-medium`}>Draft</span>
              </div>
              <div className={`${inter.className} antialiased text-[30px] font-bold text-[#1F2546] mb-1 text-wrap overflow-hidden whitespace-nowrap`}>
                {stats.draft}
              </div>
            </div>


<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                {/* <Image src={icon} alt="" width={24} height={24} className="center"/> */}
                <TrendingUp className="h-6 w-6 text-yellow-600" />
                <span className={`${inter.className} antialiased text-[#313030] text-[16ps] font-medium`}>Submitted</span>
              </div>
              <div className={`${inter.className} antialiased text-[30px] font-bold text-[#1F2546] mb-1 text-wrap overflow-hidden whitespace-nowrap`}>
                {stats.submitted}
              </div>
            </div>



<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                {/* <Image src={icon} alt="" width={24} height={24} className="center"/> */}
                <Users className="h-6 w-6 text-green-600" />
                <span className={`${inter.className} antialiased text-[#313030] text-[16ps] font-medium`}>Approved</span>
              </div>
              <div className={`${inter.className} antialiased text-[30px] font-bold text-[#1F2546] mb-1 text-wrap overflow-hidden whitespace-nowrap`}>
                {stats.approved}
              </div>
            </div>



<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                {/* <Image src={icon} alt="" width={24} height={24} className="center"/> */}
                <DollarSign className="h-6 w-6 text-purple-600" />
                <span className={`${inter.className} antialiased text-[#313030] text-[16ps] font-medium`}>Total Value</span>
              </div>
              <div className={`${inter.className} antialiased text-[30px]  font-bold text-[#1F2546] mb-1 w-fit break-all overflow-hidden whitespace-nowrap`}>
                {formatCurrency(stats.totalValue)}
              </div>
            </div>



<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                {/* <Image src={icon} alt="" width={24} height={24} className="center"/> */}
                <TrendingUp className="h-6 w-6 text-orange-600" />
                <span className={`${inter.className} antialiased text-[#313030] text-[16ps] font-medium`}>Avg Margin</span>
              </div>
              <div className={`${inter.className} antialiased text-[30px] font-bold text-[#1F2546] mb-1 text-wrap overflow-hidden whitespace-nowrap`}>
                {stats.avgMargin.toFixed(1)}%
              </div>
            </div>
      </div>

      {/* Quick Actions */}
      {/* <div className="flex flex-col justify-between items-center mb-8 p-[38px] rounded-md border-b shadow-sm bg-[#DFE5FF] gap-5">
        <div>
          <div className={`${inter.className} antialiased text-[24px] font-semibold mb-2 text-[#171E34] text-center` }>Quick Actions</div>
          <p className={`${inter.className} antialiased text-[14px] font-medium text-[#525252] text-center` }>Common estimation and bidding tasks</p>
        </div>
        
        <div className="flex space-x-3">
          <BTButton text='Material Cost Calculator' loading={false} size='large' type='outline_gray'   />
          <BTButton text='Labor Cost Estimator'  loading={false} size='large' type='outline_gray' />
          <BTButton text='Equipment Cost Tracker'  loading={false} size='large' type='outline_gray' />

        </div>
      </div> */}

                {/* <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
                  <div className="px-8 pt-8">         */}
                    {/* Tabs */}
                    {/* <div className="flex space-x-8 border-b border-gray-200">
                      {tabs.map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`${inter.className} antialiased pb-2 text-[14px]  transition-colors ${
                            activeTab === tab
                              ? 'text-[#375DED] border-b-2 border-[#375DED] font-semibold'
                              : 'text-gray-600 hover:text-[#272727] font-normal'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>
                </div> */}
        
                {/* Search and Filters Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-6">
                      <div className="relative flex-1 max-w-md  bg-[#F9FAFC]">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="Search Suppliers"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className={`${inter.className} antialiased font-normal text-[13px] text-[#98989C] h-[42px]  w-full pl-12 pr-4 py-3 bg-[#F9FAFC] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        />
                      </div>
                      
                      <div className="flex gap-3">
                        <FilterDropdown
                          label="Status"
                          value={statusFilter}
                          options={statusOptions}
                          onChange={(val) => setStatusFilter(val.toLowerCase())}
                        />
                        <FilterDropdown
                          label="Rating"
                          value={typeFilter}
                          options={typeOptions}
                          onChange={(val) => setTypeFilter(val.toLowerCase())}
                        />

                      </div>
                    </div>
                  </div>
                </div>


      {/* Estimates Grid */}
      
      {/* <Tabs defaultValue="estimates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="estimates">Estimates</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="estimates" className="space-y-4">
          {filteredEstimates.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Estimates Found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                    ? 'No estimates match your current filters.'
                    : 'Get started by creating your first estimate.'
                  }
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Estimate
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredEstimates.map((estimate, index) => (
                  <motion.div
                    key={estimate.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <EstimateCard estimate={estimate} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Estimate Templates</h3>
              <p className="text-gray-600 mb-4">
                Create and manage reusable estimate templates for different project types.
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Template
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardContent className="p-8 text-center">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Estimation History</h3>
              <p className="text-gray-600">
                View historical estimates and track accuracy over time.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs> */}

{activeTab === "Estimates" && (
  filteredEstimates.length === 0 ? (
    <Card>
      <CardContent className="p-8 text-center">
        <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Estimates Found</h3>
        <p className="text-gray-600 mb-4">
          {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
            ? 'No estimates match your current filters.'
            : 'Get started by creating your first estimate.'
          }
        </p>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Estimate
        </Button>
      </CardContent>
    </Card>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {filteredEstimates.map((estimate, index) => (
          <motion.div
            key={estimate.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <EstimateCard estimate={estimate} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
)}


          {/* {activeTab === "Templates" &&
          <Card>
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Estimate Templates</h3>
            <p className="text-gray-600 mb-4">
              Create and manage reusable estimate templates for different project types.
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          </CardContent>
        </Card>
          }

          {activeTab === "History" && 
          <Card>
          <CardContent className="p-8 text-center">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Estimation History</h3>
            <p className="text-gray-600">
              View historical estimates and track accuracy over time.
            </p>
          </CardContent>
        </Card>
        } */}

        <div className='h-9'/>
    </div>
  );
};

export default EstimationDashboard;

