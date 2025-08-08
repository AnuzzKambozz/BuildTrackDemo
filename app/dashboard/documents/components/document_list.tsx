"use client";

import { DocumentModel, FolderModel } from "@/app/models/common";
import { FileText, Folder } from "lucide-react";
import useWindowSize from '@/app/hooks/useWindowSize';                 


// Document List Component
interface DocumentListProps {
    documents: DocumentModel[];
    folders: FolderModel[];
    selectedDocuments: string[];
    onDocumentSelect: (id: string) => void;
    onSelectAll: () => void;
    onDocumentClick: (document: DocumentModel) => void;
    onFolderClick: (folder: FolderModel) => void;
  }

const DocumentList: React.FC<DocumentListProps> = ({
    documents,
    folders,
    selectedDocuments,
    onDocumentSelect,
    onSelectAll,
    onDocumentClick,
    onFolderClick
  }) => {
    const getFileIcon = () => <FileText className="w-8 h-8 text-red-500" />;
    const {  height } = useWindowSize();

    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden" >
        <div className="px-6 py-3 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={selectedDocuments.length === documents.length && documents.length > 0}
              onChange={onSelectAll}
              className="mr-4 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <div className="grid grid-cols-12 gap-4 w-full text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-6">Name</div>
              <div className="col-span-3">Category</div>
              <div className="col-span-2 text-right">Size</div>
              {/* <div className="col-span-1"></div> */}
            </div>
          </div>
        </div>
  
        <div className="divide-y divide-gray-200 overflow-y-auto" style={{ height: height - 450 }}>
          {/* Folders */}
          {folders.map((folder) => (
            <div
              key={folder.id}
              className="px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-4 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div className="grid grid-cols-12 gap-4 w-full items-center">
                  <div className="col-span-6 flex items-center">
                    <Folder className="w-8 h-8 text-blue-500" />
                    <span 
                      className="ml-3 text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600"
                      onClick={() => onFolderClick(folder)}
                    >
                      {folder.name}
                    </span>
                  </div>
                  <div className="col-span-3">
                    <span className="text-sm text-gray-500">{folder.category}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm text-gray-500">{folder.documentCount} items</span>
                  </div>
                  {/* <div className="col-span-1">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Eye className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          ))}
          
          {/* Documents */}
          {documents.map((document) => (
            <div
              key={document.id}
              className={`px-6 py-4  hover:bg-gray-50 transition-colors ${selectedDocuments.includes(document.id) ? 'bg-[#EBEFFF]' : 'bg-white'}`}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedDocuments.includes(document.id)}
                  onChange={() => onDocumentSelect(document.id)}
                  className="mr-4 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div className="grid grid-cols-12 gap-4 w-full items-center">
                  <div className="col-span-6 flex items-center">
                    {getFileIcon()}
                    <span 
                      className="ml-3 text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600"
                      onClick={() => onDocumentClick(document)}
                    >
                      {document.name}
                    </span>
                  </div>
                  <div className="col-span-3">
                    <span className="text-sm text-gray-500">{document.category}</span>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className="text-sm text-gray-500">{document.size}</span>
                  </div>
                  {/* <div className="col-span-1">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Eye className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Download className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default DocumentList;