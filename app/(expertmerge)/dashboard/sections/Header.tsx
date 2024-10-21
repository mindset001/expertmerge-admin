'use client';
import { FC } from 'react';

// Card component to display each statistic
interface StatCardProps {
  title: string;
  value: string;
  icon: JSX.Element;
  growth: string; // Growth percentage
}

const StatCard: FC<StatCardProps> = ({ title, value, icon, growth }) => {
  return (
    <div className="w-full border rounded-lg p-4 flex items-center space-x-4 bg-white ">
      <div className="text-2xl">{icon}</div>
      <div className="flex flex-col">
        <span className="text-sm text-[#667185] font-[400] text-[14px]">{title}</span>
        <div className='flex gap-2'>
        <p className="text-[18px] font-[700]">{value}</p>
          <p className="text-[#036B26] text-[12px] font-[400] mt-1 bg-[#E7F6EC] rounded-[10px] flex items-center justify-center px-2">↑ {growth}</p>
        </div>
      </div>
    </div>
  );
};

// Main component to display all the statistics
const DashboardStats: FC = () => {
  return (
    <div className="w-full grid grid-cols-6 gap-6">
      <StatCard
        title="Total users"
        value="9,235,837"
        icon={<i className="fas fa-user"></i>} // Use your preferred icon here
        growth="15%"
      />
      <StatCard
        title="Total Groups"
        value="59,837"
        icon={<i className="fas fa-users"></i>}
        growth="15%"
      />
      <StatCard
        title="Total Forums"
        value="5,837"
        icon={<i className="fas fa-comments"></i>}
        growth="15%"
      />
      <StatCard
        title="Total Resources"
        value="9,837"
        icon={<i className="fas fa-file-alt"></i>}
        growth="15%"
      />
      <StatCard
        title="Total accounts verified"
        value="59,837"
        icon={<i className="fas fa-check-circle"></i>}
        growth="15%"
      />
      <StatCard
        title="Total accounts suspended"
        value="37"
        icon={<i className="fas fa-flag"></i>}
        growth="15%"
      />
    </div>
  );
};

export default DashboardStats;
