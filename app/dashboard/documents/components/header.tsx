"use client";

import { BTButton } from "@/app/components/buttons/BTButton";
import { inter } from "@/app/fonts";
import AddCircleIcon from '@/app/public/add_circle.svg';
import AddFolderIcon from '@/app/public/add_folder_icon.svg';
// Header Component
interface HeaderProps {
    onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onNewCategory: () => void;
    onAddDocument: () => void;
  }
  
const Header: React.FC<HeaderProps> = ({  onNewCategory, onAddDocument }) => {
    return (
      <div className="bg-white shadow-sm rounded-lg  px-6 py-4   h-[100px]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`${inter.className} antialiased text-[24px] font-semibold mb-2 text-[#171E34]` }>Documents</h1>
            <p className={`${inter.className} antialiased text-[14px] font-medium text-[#525252]` }>Track invoices, expenses and financial performance</p>
          </div>
          <div className="flex items-center space-x-3">
            {/* <label className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <Upload className="w-4 h-4 mr-2 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Upload Files</span>
              <input
                type="file"
                multiple
                className="hidden"
                onChange={onUpload}
              />
            </label> */}
            <BTButton text="New Folder" icon={AddFolderIcon} onClick={onNewCategory} type="outline_gray"/>
            <BTButton text="Add Document" icon={AddCircleIcon} onClick={onAddDocument}/>

            {/* <button
              onClick={onNewCategory}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FolderPlus className="w-4 h-4 mr-2 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">New Category</span>
            </button>
            <button
              onClick={onAddDocument}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Add Document</span>
            </button> */}
          </div>
        </div>
      </div>
    );
  };
export default Header;  