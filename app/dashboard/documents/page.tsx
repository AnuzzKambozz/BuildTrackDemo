"use client";

import Sidebar from "./components/sidebar";
import { useState, useMemo, useEffect } from "react";
import AddDocumentModal from "./components/add_document_modal";
import BulkActionsBar from "./components/bulk_action_bar";
import DocumentList from "./components/document_list";
import Header from "./components/header";
import NewCategoryModal from "./components/new_category_modal";
import Toolbar from "./components/toolbar";
import { CategoryModel, DocumentModel, ViewMode, SortOrder } from "@/app/models/common";
import EmptyState from "./components/empty_state";
import { useHeaderConfig } from '@/app/context/HeaderContext';

// Main Document Management Component
const DocumentManagement = () => {

const updateHeader = useHeaderConfig();
  
    useEffect(() => {
            // Update header config for this specific page
            updateHeader({
              title: "Documents",
              showSearch: false,
              searchPlaceholder: "Search projects...",
              breadcrumbs: [
                { label: "Dashboard", href: "/dashboard" },
                { label: "Documents", href: "" }
              ],
              notificationCount: 5
            });
        }, [updateHeader]);

    // Sample data
    const sampleDocuments : DocumentModel[] = [
      {
        id: '1',
        name: 'Kitchen Layout Final.pdf',
        category: 'Plans & Drawings',
        size: '4.8 MB',
        uploadDate: new Date('2024-01-15'),
        type: 'pdf'
      },
      {
        id: '2',
        name: 'Electrical Plan v2.pdf',
        category: 'Plans & Drawings',
        size: '6.3 MB',
        uploadDate: new Date('2024-01-14'),
        type: 'pdf'
      },
      {
        id: '3',
        name: 'Client Contract Signed.pdf',
        category: 'Contracts',
        size: '4.8 MB',
        uploadDate: new Date('2024-01-13'),
        type: 'pdf'
      },
      {
        id: '4',
        name: 'Building Approval.pdf',
        category: 'Permits & Approvals',
        size: '8.2 MB',
        uploadDate: new Date('2024-01-12'),
        type: 'pdf'
      },
      {
        id: '5',
        name: 'Invoice Ipsum 2024-25.pdf',
        category: 'Invoices & Receipts',
        size: '2.7 MB',
        uploadDate: new Date('2024-01-11'),
        type: 'pdf'
      },
      {
        id: '6',
        name: 'Bathroom Layout Final.pdf',
        category: 'Plans & Drawings',
        size: '3.4 MB',
        uploadDate: new Date('2024-01-10'),
        type: 'pdf'
      },
      {
        id: '7',
        name: 'Kitchen Layout Final.pdf',
        category: 'Plans & Drawings',
        size: '4.8 MB',
        uploadDate: new Date('2024-01-15'),
        type: 'pdf'
      },
      {
        id: '8',
        name: 'Electrical Plan v2.pdf',
        category: 'Plans & Drawings',
        size: '6.3 MB',
        uploadDate: new Date('2024-01-14'),
        type: 'pdf'
      },
      {
        id: '9',
        name: 'Client Contract Signed.pdf',
        category: 'Contracts',
        size: '4.8 MB',
        uploadDate: new Date('2024-01-13'),
        type: 'pdf'
      },
      {
        id: '10',
        name: 'Building Approval.pdf',
        category: 'Permits & Approvals',
        size: '8.2 MB',
        uploadDate: new Date('2024-01-12'),
        type: 'pdf'
      },
      {
        id: '11',
        name: 'Invoice Ipsum 2024-25.pdf',
        category: 'Invoices & Receipts',
        size: '2.7 MB',
        uploadDate: new Date('2024-01-11'),
        type: 'pdf'
      },
      {
        id: '12',
        name: 'Bathroom Layout Final.pdf',
        category: 'Plans & Drawings',
        size: '3.4 MB',
        uploadDate: new Date('2024-01-10'),
        type: 'pdf'
      }
    ];
  

  
    // Default categories
    const defaultCategories : CategoryModel[] = [
      {
        id: 'cat1',
        name: 'Plans & Drawings',
        color: 'blue',
        documentCount: 0,
        createdDate: new Date('2024-01-01')
      },
      {
        id: 'cat2',
        name: 'Contracts',
        color: 'green',
        documentCount: 0,
        createdDate: new Date('2024-01-01')
      },
      {
        id: 'cat3',
        name: 'Invoices & Receipts',
        color: 'purple',
        documentCount: 0,
        createdDate: new Date('2024-01-01')
      },
      {
        id: 'cat4',
        name: 'Permits & Approvals',
        color: 'orange',
        documentCount: 0,
        createdDate: new Date('2024-01-01')
      },
      {
        id: 'cat5',
        name: 'Site Photos',
        color: 'pink',
        documentCount: 0,
        createdDate: new Date('2024-01-01')
      }
    ];
  
    // State management
    const [documents, setDocuments] = useState<DocumentModel[]>(sampleDocuments);
    const [categories, setCategories] = useState<CategoryModel[]>(defaultCategories);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Documents');
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
    const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
    const [showFilter, setShowFilter] = useState(false);
    
    // Modal states
    const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
    const [showAddDocumentModal, setShowAddDocumentModal] = useState(false);
    
    // Form states
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryColor, setNewCategoryColor] = useState('blue');
    const [newDocumentName, setNewDocumentName] = useState('');
    const [newDocumentCategory, setNewDocumentCategory] = useState('Plans & Drawings');
    const [newDocumentFile, setNewDocumentFile] = useState<File | null>(null);
  
    // Calculate category counts
    const categoryCounts = useMemo(() => {
      const counts: { [key: string]: number } = {};
      documents.forEach(doc => {
        counts[doc.category] = (counts[doc.category] || 0) + 1;
      });

      return counts;
    }, [documents]);
  
    // Filter and sort documents
    const filteredDocuments = useMemo(() => {
      const filtered = documents.filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All Documents' || doc.category === selectedCategory;
        return matchesSearch && matchesCategory;
      });
  
      filtered.sort((a, b) => {
        switch (sortOrder) {
          case 'newest':
            return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
          case 'oldest':
            return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          case 'size-asc':
            return parseFloat(a.size) - parseFloat(b.size);
          case 'size-desc':
            return parseFloat(b.size) - parseFloat(a.size);
          default:
            return 0;
        }
      });
  
      return filtered;
    }, [documents, searchTerm, selectedCategory, sortOrder]);
  

  
    // Event handlers
    const handleDocumentSelect = (documentId: string) => {
      setSelectedDocuments(prev => 
        prev.includes(documentId) 
          ? prev.filter(id => id !== documentId)
          : [...prev, documentId]
      );
    };
  
    const handleSelectAll = () => {
      if (selectedDocuments.length === filteredDocuments.length) {
        setSelectedDocuments([]);
      } else {
        setSelectedDocuments(filteredDocuments.map(doc => doc.id));
      }
    };
  
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files) {
        console.log('Files uploaded:', files);
      }
    };
  
    const handleCreateCategory = () => {
      if (newCategoryName.trim()) {
        const newCategory = {
          id: `cat${Date.now()}`,
          name: newCategoryName.trim(),
          color: newCategoryColor,
          documentCount: 0,
          createdDate: new Date()
        };
        setCategories(prev => [...prev, newCategory]);
        setNewCategoryName('');
        setNewCategoryColor('blue');
        setShowNewCategoryModal(false);
      }
    };
  
    const handleAddDocument = () => {
      if (newDocumentName.trim()) {
        const newDocument: DocumentModel = {
          id: `doc${Date.now()}`,
          name: newDocumentName.trim(),
          category: newDocumentCategory,
          size: newDocumentFile ? `${(newDocumentFile.size / (1024 * 1024)).toFixed(1)} MB` : '0 MB',
          uploadDate: new Date(),
          type: 'pdf'
        };
        setDocuments(prev => [...prev, newDocument]);
        setNewDocumentName('');
        setNewDocumentCategory('Plans & Drawings');
        setNewDocumentFile(null);
        setShowAddDocumentModal(false);
      }
    };
  
    const handleDocumentFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setNewDocumentFile(file);
        setNewDocumentName(file.name);
      }
    };
  
    const totalDocuments = documents.length ;
  
    return (
      <div className="h-full bg-[#f6f6f6] space-y-6">
        <Header
          onUpload={handleFileUpload}
          onNewCategory={() => setShowNewCategoryModal(true)}
          onAddDocument={() => setShowAddDocumentModal(true)}
        />
  
        <div className="flex">
          <div className="">
          <Sidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            categoryCounts={categoryCounts}
            totalDocuments={totalDocuments}
          />
          </div>
         
  
          <div className="flex-1 pb-6 px-6">
            <Toolbar
                        selectedCategory={selectedCategory}
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        viewMode={viewMode}
                        onViewModeChange={setViewMode}
                        sortOrder={sortOrder}
                        onSortOrderChange={setSortOrder}
                        onFilterToggle={() => setShowFilter(!showFilter)} showFilter={false}            />
  
            <DocumentList
              documents={filteredDocuments}
              folders={[]}
              selectedDocuments={selectedDocuments}
              onDocumentSelect={handleDocumentSelect}
              onSelectAll={handleSelectAll}
              onDocumentClick={(doc) => console.log('Document clicked:', doc)}
              onFolderClick={(folder) => console.log('Folder clicked:', folder)}
            />
  
            {filteredDocuments.length === 0  && (
              <EmptyState />
            )}
          </div>
        </div>
  
        <BulkActionsBar
          selectedCount={selectedDocuments.length}
          onDownload={() => console.log('Bulk download')}
          onDelete={() => console.log('Bulk delete')}
          onCancel={() => setSelectedDocuments([])}
        />
  
        <NewCategoryModal
          isOpen={showNewCategoryModal}
          onClose={() => setShowNewCategoryModal(false)}
          categoryName={newCategoryName}
          onCategoryNameChange={setNewCategoryName}
          categoryColor={newCategoryColor}
          onCategoryColorChange={setNewCategoryColor}
          onSubmit={handleCreateCategory}
        />
  
        <AddDocumentModal
          isOpen={showAddDocumentModal}
          onClose={() => setShowAddDocumentModal(false)}
          documentName={newDocumentName}
          onDocumentNameChange={setNewDocumentName}
          documentCategory={newDocumentCategory}
          onDocumentCategoryChange={setNewDocumentCategory}
          documentFile={newDocumentFile}
          onDocumentFileChange={handleDocumentFileChange}
          categories={categories}
          onSubmit={handleAddDocument}
        />
      </div>
    );
  };
  
  export default DocumentManagement;