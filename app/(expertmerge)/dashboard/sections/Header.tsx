'use client';
import { getContent } from '@/app/api/services/endpoints/content';
import { FC, useEffect, useState } from 'react';

// Card component to display each statistic
interface StatCardProps {
  title: string;
  value: any;
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
          <p className="text-[#036B26] text-[12px] font-[400] mt-1 bg-[#E7F6EC] rounded-[10px] flex items-center justify-center px-2">↑ {growth} %</p>
        </div>
      </div>
    </div>
  );
};

// Main component to display all the statistics
const DashboardStats: FC = () => {

  interface UserDetails {
    users: {
      total_users: number;
      user_percent_change: any;
      // add other fields if necessary
    };
    groups: {
      total_groups: number;
      group_percent_change: any;
      // add other fields if necessary
    };
    posts: {
      total_posts: number;
      post_percent_change: any;
      // add other fields if necessary
    };
    forums: {
      total_forums: number;
      forum_percent_change: any;
      // add other fields if necessary
    };
    resources: {
      total_resources: number;
      resources_percent_change: any;
      // add other fields if necessary
    };
    verified_users: {
      total_verified_users: number;
      total_verified_users_percent_change: any;
      // add other fields if necessary
    };
    deletedUsers: {
      total_deleted_users: number;
      deleted_users_percent_change: any;
      // add other fields if necessary
    };
    suspended_users: {
      total_suspended_users: number;
      suspended_users_percent_change: any;
      // add other fields if necessary
    };
  }

  const [details, setDetails] = useState<UserDetails | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const { response, error } = await getContent();
      if (response) {
        // console.log("API Response:", response.result);
        setDetails(response.result)
        // console.log(details , 'real details');
        
      } else {
        console.log("API Error:", error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    console.log(details, 'real details'); // This will log whenever `details` updates
  }, [details]);


  return (
    <div className="w-full grid grid-cols-6 gap-6">
      <StatCard
        title="Total users"
         value={details?.users?.total_users || 0}
        icon={<i className="fas fa-user"></i>} // Use your preferred icon here
        growth={details?.users?.user_percent_change?.toString() || "0"}
      />
      <StatCard
        title="Total Groups"
        value={details?.groups?.total_groups || 0}
        icon={<i className="fas fa-users"></i>}
        growth={details?.groups?.total_groups?.toString() || "0"}
      />
      <StatCard
        title="Total Forums"
        value={details?.forums?.total_forums || 0}
        icon={<i className="fas fa-comments"></i>}
        growth={details?.forums?.forum_percent_change?.toString() || "0"}
      />
      <StatCard
        title="Total Resources"
        value={details?.resources?.total_resources || 0}
        icon={<i className="fas fa-file-alt"></i>}
        growth={details?.resources?.resources_percent_change?.toString() || "0"}
      />
      <StatCard
        title="Total accounts verified"
        value={details?.verified_users?.total_verified_users || 0}
        icon={<i className="fas fa-check-circle"></i>}
        growth={details?.verified_users?.total_verified_users_percent_change?.toString() || "0"}
      />
      <StatCard
        title="Total accounts suspended"
        value={details?.suspended_users?.total_suspended_users || 0}
        icon={<i className="fas fa-flag"></i>}
        growth={details?.suspended_users?.suspended_users_percent_change?.toString() || "0"}
      />
    </div>
  );
};

export default DashboardStats;
