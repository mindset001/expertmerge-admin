'use client';

import Image from 'next/image';
import Icon from '@/components/icons/Icon';
import { useEffect, useState } from 'react';
import { getAllNotification } from '@/app/api/services/endpoints/content';


type Group = {
  key: number;
  name: string;
  avatar: string; // Assuming the API provides an avatar URL
  phone: string;
  email: string;
  about: string;
  post: string;
  profileLink: string;
  role: string;
  isVerified: boolean; // Assuming a verification status field exists
  content: string; // Assuming a content field for the post
  posted: string; // Assuming a timestamp or similar field for posting time
};

export default function PostList() {
  const [data, setData] = useState<Group[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { response, error } = await getAllNotification();
      if (response) {
        console.log('Fetched notification:', response.data);

        const dataWithKeys = response.data.map((user: any) => ({
          key: user.id,
          name: user.createdAt,
          avatar: user.avatar || '/default-avatar.png', // Fallback for missing avatar
          phone: user.phone,
          email: user.email,
          about: user.about || 'N/A',
          post: user.post || 'N/A',
          profileLink: user.profileLink || 'N/A',
          role: user.role || 'Support Admin',
          isVerified: user.isVerified || false,
          content: user.data || 'No content available',
          posted: user.posted || 'N/A',
        }));
        setData(dataWithKeys);
      } else {
        console.error('API Error:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-4 bg-[#F4FCFECC] p-4 rounded-md">
      {data.length > 0 ? (
        data.map((post) => (
          <div key={post.key} className="p-4 rounded-md border-b border-[#BDF2F9]">
            <div className="flex items-start">
              {/* User Avatar */}
              <div className="mr-4">
                <Image
                  src={post.avatar}
                  alt='avatar'
                  className="rounded-full"
                  width={50}
                  height={50}
                />
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                <h3 className="text-[#667185] font-[500] text-[24px]">
  {new Date(post.name).toLocaleString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).replace(',', ' /')}
</h3>
                  {post.isVerified && <Icon name="blue-check" />}
                  <span className="text-[#98A2B3] font-[400] text-[14px]">{post.posted}</span>
                </div>
                <p className="text-[#98A2B3] font-[400] text-[14px]">{post.content}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-[#667185] text-center">No posts available</p>
      )}
    </div>
  );
}
