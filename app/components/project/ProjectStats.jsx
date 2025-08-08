import React from 'react';
import { FileText, BarChart3, Users, Bell } from 'lucide-react';
import StatsCard from '../ui/StatsCard';

const ProjectStats = ({ stats }) => {
  const statsConfig = [
    {
      title: 'Total Projects',
      value: stats?.total || 24,
      icon: FileText,
      color: 'blue'
    },
    {
      title: 'In Progress',
      value: stats?.inProgress || 12,
      icon: BarChart3,
      color: 'orange'
    },
    {
      title: 'On Schedule',
      value: stats?.onSchedule || 9,
      icon: Users,
      color: 'green'
    },
    {
      title: 'Needs Attention',
      value: stats?.needsAttention || 3,
      icon: Bell,
      color: 'red'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsConfig.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default ProjectStats;