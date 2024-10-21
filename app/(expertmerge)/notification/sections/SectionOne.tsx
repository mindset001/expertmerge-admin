'use client'
import Image from 'next/image';
import Avatar from '@/assets/matcap.jpeg'
import { CheckCircleOutlined } from '@ant-design/icons';
import Icon from '@/components/icons/Icon';

const posts = [
  {
    id: 1,
    name: 'Anika Calzoni',
    isVerified: true,
    avatar: Avatar, // Replace with correct path
    content:
      'Expertsmerge is a Platform for  professional growth and connection. Designed for professionals across industries, AVI provides a comprehensive suite of features to help professionals network effectively, find new opportunities, and...',
    posted: 'Posted',
  },
  {
    id: 2,
    name: 'Ryan Siphorn',
    isVerified: true,
    avatar:  Avatar,
    content:
      'Expertsmerge is a Platform for  professional growth and connection. Designed for professionals across industries, AVI provides a comprehensive suite of features to help professionals network effectively, find new opportunities, and...',
    posted: 'Reposted',
  },
  // Add more posts here...
];

export default function PostList() {
  return (
    <div className="space-y-4 bg-[#F4FCFECC]">
      {posts.map((post) => (
            <div key={post.id} className=" p-4 rounded-md  border-b border-[#BDF2F9]">
          <div className="flex items-start">
            {/* User Avatar */}
            <div className="mr-4">
              <Image
                src={post.avatar}
                alt={`${post.name}'s avatar`}
                className="rounded-full"
                width={50}
                height={50}
              />
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="text-[#667185] font-[500] text-[24px]">{post.name}</h3>
                {post.isVerified && (
                  <Icon name='blue-check'/>
                )}
                <span className="text-[#98A2B3] font-[400] text-[14px]">{post.posted}</span>
              </div>
              <p className="text-[#98A2B3] font-[400] text-[14px]">{post.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
