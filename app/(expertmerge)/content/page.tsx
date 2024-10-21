'use client';
import { FC, useState } from 'react';
import NewUsersChart from './sections/Chart';
import TotalUser from './sections/TotalUser';
import TotalGroups from './sections/TotalGroups';
import TotalForum from './sections/TotalForum';
import ContentPosted from './sections/ContentPosted';
import TotalAccounts from './sections/TotalAccounts';
import AccountsSuspended from './sections/AccountsSuspended';

// Card component to display each statistic
interface StatCardProps {
  title: string;
  value: string;
  icon: JSX.Element;
  growth: string; // Growth percentage
  isActive: boolean; // To style the active card
  onClick: () => void; // Click handler to control the component display
}
const StatCard: FC<StatCardProps> = ({ title, value, icon, growth, onClick, isActive }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer border rounded-lg p-4 flex items-center space-x-4 ${
        isActive ? 'bg-[#EAFCFF80] border-[#0A424A]' : 'bg-white'
      }`} // Conditional styling for the active state
    >
      <div className="text-2xl">{icon}</div>
      <div className="flex flex-col">
        <span className="text-sm text-[#667185] font-[400] text-[14px]">{title}</span>
        <div className="flex gap-2">
          <p className="text-[18px] font-[700]">{value}</p>
          <p className="text-[#036B26] text-[12px] font-[400] mt-1 bg-[#E7F6EC] rounded-[10px] flex items-center justify-center px-2">
            ↑ {growth}
          </p>
        </div>
      </div>
    </div>
  );
};

const Page: FC = () => {
  // State to manage which component is displayed
  const [activeComponent, setActiveComponent] = useState<string>('TotalUser');

  // Mapping of activeComponent to corresponding components
  const renderComponent = () => {
    switch (activeComponent) {
      case 'TotalUser':
        return <TotalUser />;
      case 'TotalGroups':
        return <TotalGroups />;
      case 'TotalForum':
        return <TotalForum />;
      case 'ContentPosted':
        return <ContentPosted />;
      case 'TotalAccounts':
        return <TotalAccounts />;
      case 'AccountsSuspended':
        return <AccountsSuspended />;
      default:
        return <TotalUser />; // Default component
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="border-b mb-4 pb-4">
        <h1 className="capitalize text-[#1D2739] text-[24px] font-[500]">Content Management</h1>
      </div>
      <div className="w-full grid grid-cols-6 gap-6">
        <StatCard
          title="Total users"
          value="9,235,837"
          icon={<i className="fas fa-user"></i>} // Use your preferred icon here
          growth="15%"
          onClick={() => setActiveComponent('TotalUser')} // Set the active component
          isActive={activeComponent === 'TotalUser'} // Check if this card is active
        />
        <StatCard
          title="Total Groups"
          value="59,837"
          icon={<i className="fas fa-users"></i>}
          growth="15%"
          onClick={() => setActiveComponent('TotalGroups')}
          isActive={activeComponent === 'TotalGroups'}
        />
        <StatCard
          title="Total Forums"
          value="5,837"
          icon={<i className="fas fa-comments"></i>}
          growth="15%"
          onClick={() => setActiveComponent('TotalForum')}
          isActive={activeComponent === 'TotalForum'}
        />
        <StatCard
          title="Content Posted"
          value="9,837"
          icon={<i className="fas fa-file-alt"></i>}
          growth="15%"
          onClick={() => setActiveComponent('ContentPosted')}
          isActive={activeComponent === 'ContentPosted'}
        />
        <StatCard
          title="Total Accounts Deleted"
          value="59,837"
          icon={<i className="fas fa-check-circle"></i>}
          growth="15%"
          onClick={() => setActiveComponent('TotalAccounts')}
          isActive={activeComponent === 'TotalAccounts'}
        />
        <StatCard
          title="Total Accounts Suspended"
          value="37"
          icon={<i className="fas fa-flag"></i>}
          growth="15%"
          onClick={() => setActiveComponent('AccountsSuspended')}
          isActive={activeComponent === 'AccountsSuspended'}
        />
      </div>

      {/* Render the selected component */}
      <div className="mt-6">{renderComponent()}</div>
    </div>
  );
};

export default Page;
