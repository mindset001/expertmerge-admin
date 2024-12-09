'use client';
import Icon from '@/components/icons/Icon';
import { useParams, useSearchParams } from 'next/navigation'; // Import both hooks for dynamic route and query params
import React, { useState } from 'react';
import General from './components/General';
import WorkExperience from './components/WorkExperience';
import Education from './components/Education';
import Certification from './components/Certification';
import Skills from './components/Skills';
import Recommendations from './components/Recommendations';
import Archievements from './components/Archievements';
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

const UserDetailsPage = () => {
  const { id } = useParams(); // Retrieve the dynamic route parameter [id]
  const { user } = useSelector((state: RootState) => state.profileSlice);
  const currentUserId = user?.id;
  const searchParams = useSearchParams(); // Retrieve the query parameters from the URL

  console.log(user);
  
  // Access query parameters using searchParams.get('paramName')
  const name = searchParams.get('name');
  const address = searchParams.get('address');
  const phone = searchParams.get('phone');
  const email = searchParams.get('email');

  // Track the active tab
  const [activeTab, setActiveTab] = useState('General');

  // Define the tab options
  const tabs = [
    'General',
    'Work Experience',
    'Education',
    'Certification',
    'Achievements',
    'Skills',
    'Recommendations',
  ];

  return (
    <div className="p-6">
      {/* Header section */}
      <div className="flex items-center gap-2 border-b mb-4 pb-4">
        <div className="flex gap-2  cursor-pointer" onClick={() => window.history.back()}>
          <Icon name="arrow-left" />
          <p>Back</p>
        </div>
        <p className="text-[#1D2739] text-[24px] font-[500]">{name || 'N/A'}</p>
      </div>

      {/* Tab navigation */}
      

      {/* User details and active tab content */}
      <div className="mt-6 border border-[#B9B9B9] rounded-[14px] p-6">
      <div className="mt-4 ">
        <ul className="flex">
          {tabs.map((tab) => (
            <li
              key={tab}
              className={`cursor-pointer px-4 py-2 ${activeTab === tab ? 'border border-[#BDF2F9] text-[#101928] bg-[#EAFCFF] font-[500]' : 'text-gray-500 border '}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>
       

        {/* Conditionally render the component based on the active tab */}
        <div className="mt-8">
          {activeTab === 'General' && <General />}
          {activeTab === 'Work Experience' && <WorkExperience />}
          {activeTab === 'Education' && <Education />}
          {activeTab === 'Certification' && <Certification />}
          {activeTab === 'Achievements' && <Archievements />}
          {activeTab === 'Skills' && <Skills />}
          {activeTab === 'Recommendations' && <Recommendations />}
        </div>
      </div>
      {/* <p><strong>ID:</strong> {id}</p>
        <p><strong>Name:</strong> {name || 'N/A'}</p>
        <p><strong>Address:</strong> {address || 'N/A'}</p>
        <p><strong>Phone Number:</strong> {phone || 'N/A'}</p>
        <p><strong>Email Address:</strong> {email || 'N/A'}</p> */}
    </div>
  );
};

export default UserDetailsPage;
