'use client';
import Icon from '@/components/icons/Icon';
import { useParams, useSearchParams } from 'next/navigation'; // Import both hooks for dynamic route and query params
import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import NewUsersChart from './components/Chart';


const UserDetailsPage = () => {
    const { id } = useParams(); // Retrieve the dynamic route parameter [id]
    const searchParams = useSearchParams(); // Retrieve the query parameters from the URL

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

                <div className="flex gap-2 items-center cursor-pointer" onClick={() => window.history.back()}>
                    <Icon name="arrow-left" />
                    <p>Back</p>
                </div>
                <p className="text-[#1D2739] text-[24px] font-[500]">{name || 'N/A'}</p>
            </div>
            <div className='border-b mb-4 pb-4'>
                <h1 className='text-[#1D2739] font-[500] text-[24px]'>User Account</h1>
            </div>

            {/* Tab navigation */}


            {/* User details and active tab content */}
            <div className="mt-6 py-6">


                {/* <div>
                    <div className='border-b mb-4 pb-4'>
                        <h1 className='text-[#1D2739] font-[500] text-[24px]'>Highlights</h1>
                    </div>
                    <Dashboard />
                </div> */}

                <div className='mt-6'>
                    <div className='border-b mb-4 pb-4'>
                        <h1 className='text-[#1D2739] font-[500] text-[24px]'>Metrics</h1>
                    </div>
                    <NewUsersChart />
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
