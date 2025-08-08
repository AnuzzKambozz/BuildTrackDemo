"use clients";

import { Plus } from "lucide-react";


interface HeaderProps {
    title: string;
    subtitle: string;
    onNewTransaction: () => void;
  }




  const Header: React.FC<HeaderProps> = ({ title, subtitle, onNewTransaction }) => (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-600">{subtitle}</p>
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
              onClick={onNewTransaction}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              <span>New Transaction</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
  export default Header;