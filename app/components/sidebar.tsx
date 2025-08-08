// components/Sidebar.tsx
'use client';

import { useState } from 'react';
import Image from "next/image";
import AppIcon from "@/app/public/app-icon.svg";

import {
  ChevronDown,
  ChevronRight,
  LogOut,
  Settings,
  FileText,
  BarChart,
  MessageCircle,
  Folder,
  Clipboard,
  Briefcase,
  LayoutGrid,
  Calendar,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const menuItems = [
    { label: 'Dashboard', icon: LayoutGrid, path: '/dashboard' },
    { label: 'Projects', icon: Zap, path: '/dashboard/projects' },
    { label: 'Tasks', icon: Briefcase, path: '/dashboard/tasks' },
    // {
    //   label: 'Project Management',
    //   icon: Clipboard,
    //   children: [
    //     { label: 'Tasks', path: '/project/tasks' },
    //     { label: 'Timeline', path: '/project/timeline' },
    //   ],
    // },
    // {
    //   label: 'Files',
    //   icon: Folder,
    //   children: [
    //     { label: 'Documents', path: '/files/docs' },
    //     { label: 'Media', path: '/files/media' },
    //   ],
    // },
    {
      label: 'Messaging',
      icon: MessageCircle,
      path: '/dashboard/messaging',
    },
    // {
    //   label: 'Financial',
    //   icon: FileText,
    //   children: [
    //     { label: 'Invoices', path: '/financial/invoices' },
    //     { label: 'Expenses', path: '/financial/expenses' },
    //   ],
    // },
    {
      label: 'Reports',
      icon: BarChart,
      children: [
        { label: 'Sales Reports', path: '/reports/sales' },
        { label: 'Performance', path: '/reports/performance' },
      ],
    },
    { label: 'Budget Planning', icon: Calendar, path: '/dashboard/budget_planning' },
    { label: 'Change Orders', icon: Clipboard, path: '/dashboard/change_orders' },
    { label: 'Client Management', icon: Clipboard, path: '/dashboard/client_management' },
    // { label: 'Client Portal', icon: Clipboard, path: '/dashboard/client_portal' },
    { label: 'Documents', icon: Folder, path: '/dashboard/documents' },
    { label: 'Expense Tracking', icon: Clipboard, path: '/dashboard/expense_tracking' },
    { label: 'Financial Management', icon: FileText, path: '/dashboard/financial_management' },
    { label: 'Schedule', icon: Calendar, path: '/dashboard/schedule' },
    { label: 'Supplier Management', icon: FileText, path: '/dashboard/supplier_management' },
    { label: 'Quality Control', icon: Clipboard, path: '/dashboard/quality_control' },
    { label: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ];

  return (
    <aside className="w-64 h-screen bg-white text-black border-r flex flex-col justify-between p-4 shadow-none">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2 px-2 mb-6">
          <Image src={AppIcon} alt="info" width={20} height={20} className="center"/>
          <span className="text-lg font-semibold">Constructor AI</span>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) =>
            item.children ? (
              <div key={item.label}>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className="flex items-center justify-between w-full px-2 py-2 text-sm text-left hover:bg-gray-100 rounded-md"
                >
                  <span className="flex items-center gap-2">
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
                    {item.children.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.path}
                        className="block py-1 text-sm text-gray-700 hover:text-black"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.path}
                className="flex items-center gap-2 px-2 py-2 text-sm hover:bg-gray-100 rounded-md"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            )
          )}
        </nav>
      </div>

      {/* Logout */}
      <div className="px-2">
        <button className="flex items-center gap-2 text-blue-600 hover:underline">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
