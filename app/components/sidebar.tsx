// components/Sidebar.tsx
'use client';

import { useState, useRef, useMemo, useCallback } from 'react';
import Image from "next/image";
import AppIcon from "@/app/public/app-icon.svg";
import { usePathname } from 'next/navigation';

import {
  ChevronDown,
  ChevronRight,
  // LogOut,
  Settings,
  FileText,
  // BarChart,
  MessageCircle,
  Folder,
  Clipboard,
  Briefcase,
  LayoutGrid,
  Calendar,
  Zap,
  Camera,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';

// Type definitions for menu items
type MenuItem = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path?: string;
  children?: { label: string; path: string }[];
};

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  // Memoize menuItems to prevent recreation on every render
  const menuItems: MenuItem[] = useMemo(() => [
    { label: 'Dashboard', icon: LayoutGrid, path: '/dashboard' },
    { label: 'Projects', icon: Zap, path: '/dashboard/projects' },
    { label: 'Tasks', icon: Briefcase, path: '/dashboard/tasks' },
    {
      label: 'Messaging',
      icon: MessageCircle,
      path: '/dashboard/messaging',
    },
    { label: 'Resources Management', icon: Calendar, path: '/dashboard/resources_management' },
    { label: 'Analytics', icon: FileText, path: '/dashboard/analytics' },
    { label: 'Budget Planning', icon: Calendar, path: '/dashboard/budget_planning' },
    { label: 'Change Orders', icon: Clipboard, path: '/dashboard/change_orders' },
    { label: 'Client Management', icon: Clipboard, path: '/dashboard/client_management' },
    { label: 'Estimation', icon: Clipboard, path: '/dashboard/estimation' },
    { label: 'Inventory', icon: Folder, path: '/dashboard/inventory' },
    { label: 'Procurements', icon: Folder, path: '/dashboard/procurement' },
    { label: 'Documents', icon: Folder, path: '/dashboard/documents' },
    { label: 'Expense Tracking', icon: Clipboard, path: '/dashboard/expense_tracking' },
    { label: 'Financial Management', icon: FileText, path: '/dashboard/financial_management' },
    { label: 'Schedule', icon: Calendar, path: '/dashboard/schedule' },
    { label: 'Supplier Management', icon: FileText, path: '/dashboard/supplier_management' },
    { label: 'Quality Control', icon: Clipboard, path: '/dashboard/quality_control' },
    { label: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ], []);

  const toggleMenu = useCallback((key: string) => {
    setOpenMenus((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  }, []);

  const handleLogoClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCustomLogo(result);
        // Optionally save to localStorage to persist across sessions
        localStorage.setItem('customLogo', result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // Load custom logo from localStorage on component mount
  React.useEffect(() => {
    const savedLogo = localStorage.getItem('customLogo');
    if (savedLogo) {
      setCustomLogo(savedLogo);
    }
  }, []);

  // Auto-expand parent menu if child is active
  React.useEffect(() => {
    menuItems.forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some(child => child.path === pathname);
        if (hasActiveChild && !openMenus.includes(item.label)) {
          setOpenMenus(prev => [...prev, item.label]);
        }
      }
    });
  }, [pathname, menuItems, openMenus]);

  return (
    <aside className="w-64 h-screen bg-white text-black border-r flex flex-col shadow-none">
      {/* Logo - Fixed at top with upload functionality */}
      <div className="flex items-center justify-center h-16 px-4 py-12">
        <div 
          className="relative cursor-pointer group"
          onClick={handleLogoClick}
          onMouseEnter={() => setIsHoveringLogo(true)}
          onMouseLeave={() => setIsHoveringLogo(false)}
        >
          {customLogo ? (
            <Image 
              src={customLogo} 
              alt="Custom Logo" 
              width={160} 
              height={40} 
              className="object-contain max-w-[160px] max-h-[40px]"
              unoptimized // Add this for base64 images
            />
          ) : (
            <Image 
              src={AppIcon} 
              alt="Default Logo" 
              width={160} 
              height={40} 
              className="flex center"
            />
          )}
          
          {/* Overlay with camera icon on hover */}
          {isHoveringLogo && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
              <Camera className="w-6 h-6 text-white" />
            </div>
          )}
          
          {/* Tooltip */}
          {isHoveringLogo && (
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              Click to change logo
            </div>
          )}
        </div>
        
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Scrollable Menu Area */}
      <div className="flex-1 overflow-y-auto px-4">
        <nav className="flex flex-col gap-1 pb-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            const hasActiveChild = item.children?.some(child => child.path === pathname);

            return (
              item.children ? (
                <div key={item.label}>
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className={`flex items-center justify-between w-full px-3 py-3 text-sm text-left rounded-lg border-l-4 transition-colors ${
                      hasActiveChild
                        ? 'bg-blue-50 text-blue-600 border-l-blue-600 font-medium'
                        : 'hover:bg-gray-100 border-l-transparent text-gray-700 hover:text-black'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </span>
                    {openMenus.includes(item.label) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  {openMenus.includes(item.label) && (
                    <div className="pl-8">
                      {item.children?.map((sub) => {
                        const isSubActive = pathname === sub.path;
                        return (
                          <Link
                            key={sub.label}
                            href={sub.path}
                            className={`block py-2 px-3 text-sm rounded-lg border-l-4 transition-colors ${
                              isSubActive
                                ? 'bg-blue-50 text-blue-600 border-l-blue-600 font-medium'
                                : 'text-gray-700 hover:text-black hover:bg-gray-100 border-l-transparent'
                            }`}
                          >
                            {sub.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.path || '#'}
                  className={`flex items-center gap-3 px-3 py-3 text-sm rounded-lg border-l-4 transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 border-l-blue-600 font-medium'
                      : 'hover:bg-gray-100 border-l-transparent text-gray-700 hover:text-black'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            );
          })}
        </nav>
      </div>

      {/* Logout - Fixed at bottom */}
      <div className="flex-shrink-0 p-4">
        <button className="flex items-center gap-2 text-blue-600 font-bold text-[14px] italic underline hover:underline px-2">
          powered by buildtrack
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;