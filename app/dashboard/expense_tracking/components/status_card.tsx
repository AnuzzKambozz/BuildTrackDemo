"use client";


interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: string | number;
    subtitle: string;
    subtitleColor?: string;
  }
  


  const StatCard: React.FC<StatCardProps> = ({ icon, title, value, subtitle, subtitleColor = 'text-green-600' }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-blue-50 rounded-lg">
          {icon}
        </div>
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      </div>
      <div className="space-y-1">
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className={`text-sm ${subtitleColor}`}>{subtitle}</div>
      </div>
    </div>
  );
  
  export default StatCard;