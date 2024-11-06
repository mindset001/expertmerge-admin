'use client';
import Icon from '@/components/icons/Icon';
import { useParams, useSearchParams } from 'next/navigation'; // Import both hooks for dynamic route and query params
import React, { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import NewUsersChart from './components/Chart';
import Image from 'next/image';
import Avatar from '@/assets/matcap.jpeg'
import Land from '@/assets/landingimage.jpg'
import { getUserAccount } from '@/app/api/services/endpoints/content';
import { message } from 'antd';


const UserDetailsPage = () => {
    const [userAccount, setUserAccount] = useState<any>(null);
    const { id } = useParams();

    const userId = Array.isArray(id) ? id[0] : id;

    useEffect(() => {
        if (userId) {
            fetchUserAccount(userId);
        }
    }, [userId]);

    const fetchUserAccount = async (userId: string) => {
        const { response, error } = await getUserAccount(userId);
        if (response) {
            setUserAccount(Array.isArray(response) ? response[0] : response);
            message.success("User account loaded successfully");
        } else {
            message.error("Failed to load user account");
            console.error("Error fetching user account:", error);
        }
    };// Retrieve the dynamic route parameter [id]
    const searchParams = useSearchParams(); // Retrieve the query parameters from the URL


    // Access query parameters using searchParams.get('paramName')
    const name = searchParams.get('name');
    const address = searchParams.get('address');
    const phone = searchParams.get('phone');
    const email = searchParams.get('email');



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
            <div className='flex justify-between'>
                <div className="w-[70%] mt-6 py-6">


                    <div>
                        <div className='border-b mb-4 pb-4'>
                            <h1 className='text-[#1D2739] font-[500] text-[24px]'>Highlights</h1>
                        </div>
                        <Dashboard />
                    </div>

                    <div className='mt-6'>
                        <div className='border-b mb-4 pb-4'>
                            <h1 className='text-[#1D2739] font-[500] text-[24px]'>Metrics</h1>
                        </div>
                        <NewUsersChart />
                    </div>

                </div>

                <div className='w-[20%]'>
                    <div className='border-b mb-4 pb-4'>
                        <h1 className='text-[#1D2739] font-[500] text-[24px]'>Recent posts</h1>
                    </div>
                  <div className='gap-4 flex flex-col'>
                  {userAccount && userAccount.recent_posts.map((post: any, index: any) => (
                        <div key={index} className="user-account-details gap-4">


                            <div className="post-details">
                                <div className='flex gap-2'>
                                    <div className='rounded-full w-[60px] h-[60%]'>
                                        <Image src={Avatar} alt='' className='rounded-full' />
                                    </div>
                                    <div>
                                        <h2 className='text-[#1D2739] text-[14px] font-[500]'>{post._id}</h2>
                                        <p className='text-[#98A2B3] text-[12px] font-[400]'>
                                            Creative Brand/Product Designer | Transforming Vision into Reality | Emp...
                                        </p>
                                        <p className='text-[#98A2B3] text-[12px] font-[400]'>12hr</p>
                                    </div>
                                </div>

                                <div className='flex flex-col gap-4'>
                                    <p className='text-[#98A2B3] text-[12px] font-[400]'>
                                        {post.regular?.content}
                                    </p>
                                    <Image src={Land} alt='' />
                                </div>
                            </div>
                        </div>
                    ))}
                  </div>


                </div>
            </div>

        </div>
    );
};

export default UserDetailsPage;
