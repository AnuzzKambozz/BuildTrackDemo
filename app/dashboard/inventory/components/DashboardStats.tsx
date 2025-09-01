// components/DashboardStats.tsx
"use client";

import React from 'react';
import StatsCard from './statscard';
import { DashboardStatsProps } from '../types/inventory';

import TotalProjectsIcon from '@/app/public/total_projects_icon.svg';
import InProgressProjectsIcon from '@/app/public/in_progress_projects_icon.svg';
import NeedsAttentionProjectsIcon from '@/app/public/needs_attention_icon.svg';

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      <StatsCard
        icon={TotalProjectsIcon}
        title="Total Items"
        value={stats.totalItems}
        subtitle="+23 this week"
        subtitleColor="text-[#0FBC81]"
      />
      <StatsCard
        icon={TotalProjectsIcon}
        title="Total Value"
        value={`$${(stats.totalValue / 1000).toFixed(0)}K`}
        subtitle="+$12K this month"
        subtitleColor="text-[#0FBC81]"        
      />
      <StatsCard
        icon={InProgressProjectsIcon}
        title="Low Stock Items"
        value={stats.lowStockItems}
        subtitle="Needs attention"
        subtitleColor="text-[#FF6621]"
      />
      <StatsCard
        icon={NeedsAttentionProjectsIcon}
        title="Out of Stock"
        value={stats.outOfStockItems}
        subtitle="Critical"
        subtitleColor="text-[#FC3A3A]"
      />
    </div>
  );
};

export default DashboardStats;