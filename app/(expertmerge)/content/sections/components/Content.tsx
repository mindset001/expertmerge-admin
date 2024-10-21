import Image, { StaticImageData } from 'next/image';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Button, Input, Pagination, Select } from 'antd';
import Avatar from '@/assets/matcap.jpeg';
import Big from '@/assets/content.png'
import Icon from '@/components/icons/Icon';

type Group = {
    id: number;
    name: string;
    members: number;
    description: string;
    location: string;
    imageUrl: string | StaticImageData;
};

const groupData: Group[] = [
    {
        id: 1,
        name: "Designers Talk",
        members: 171540,
        description: "A community for Figma users looking to learn from others, share tips and tricks and expand our skillset.",
        location: "Creative Brand/Product Designer | Transforming Vision into Reality | Emp...",
        imageUrl: Avatar,
    },
    {
        id: 2,
        name: "Users Experience",
        members: 171540,
        description: "A community for Figma users looking to learn from others, share tips and tricks and expand our skillset.",
        location: "Creative Brand/Product Designer | Transforming Vision into Reality | Emp...",
        imageUrl: Avatar,
    },
    {
        id: 3,
        name: "Developers - Android",
        members: 145000,
        description: "A community of Android developers sharing tips and resources.",
        location: "Creative Brand/Product Designer | Transforming Vision into Reality | Emp...",
        imageUrl: Avatar,
    },
    {
        id: 4,
        name: "Friends of Figma",
        members: 120340,
        description: "A group for Figma enthusiasts to share designs and ideas.",
        location: "Creative Brand/Product Designer | Transforming Vision into Reality | Emp...",
        imageUrl: Avatar,
    },
    {
        id: 5,
        name: "Industrial Design",
        members: 95000,
        description: "Connecting industrial designers worldwide.",
        location: "Creative Brand/Product Designer | Transforming Vision into Reality | Emp...",
        imageUrl: Avatar,
    },
    {
        id: 6,
        name: "Art of Fashion",
        members: 200000,
        description: "A group for fashion designers and enthusiasts.",
        location: "Creative Brand/Product Designer | Transforming Vision into Reality | Emp...",
        imageUrl: Avatar,
    },
    // Add more groups as needed
];

function Content() {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('Newest reported');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(3); // Number of groups per page

    const handleSortChange = (value: string) => {
        setSortOrder(value);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // Filter and sort the groupData based on searchTerm and sortOrder
    const filteredGroups = groupData
        .filter(group =>
            group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            group.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOrder === 'Newest reported') {
                return b.id - a.id;
            } else if (sortOrder === 'Oldest reported') {
                return a.id - b.id;
            } else if (sortOrder === 'Most reported') {
                return b.members - a.members;
            }
            return 0;
        });

    // Pagination Logic
    const indexOfLastGroup = currentPage * pageSize;
    const indexOfFirstGroup = indexOfLastGroup - pageSize;
    const currentGroups = filteredGroups.slice(indexOfFirstGroup, indexOfLastGroup);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="border p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold mr-4 text-[#1D2739]">Content Posted </h1>
                    <Button
                        icon={<ReloadOutlined />}
                        className="text-gray-500 hover:text-black border-none bg-transparent"
                        onClick={() => window.location.reload()} // Dummy reload for now
                    />
                </div>

                <div className="flex items-center gap-2">
                    {/* Dropdown for sorting */}
                    <Select
                        defaultValue={sortOrder}
                        onChange={handleSortChange}
                        className="w-[200px] rounded-md"
                    >
                        <Select.Option value="Newest reported">Articles only</Select.Option>
                        <Select.Option value="Oldest reported">Oldest reported</Select.Option>
                        <Select.Option value="Most reported">Most reported</Select.Option>
                    </Select>

                    {/* Search bar */}
                    <Input
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        prefix={<SearchOutlined />}
                        className="w-[250px] rounded-md"
                    />
                </div>
            </div>

            {/* Render the current groups */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-6">
                {currentGroups.map((group) => (
                    <div key={group.id} className="  bg-white">
                        <div className="flex space-x-3 p-4">
                            <Image
                                src={group.imageUrl}
                                alt={group.name}
                                width={50}
                                height={50}
                                className="rounded-full h-[50px] w-[50px]"
                            />
                            <div>
                               <div>
                               <h2 className=" flex items-center gap-2"><p className='font-semibold'>{group.name}</p> <div><Icon name='blue-check'/></div></h2>
                               <p className='text-[#98A2B3] text-[10px]'>{group.location}</p>
                               </div>
                                <div className='my-4'>
                                <p className="text-sm text-gray-500">{group.description}</p>
                                </div>
                              
                              
                            </div>      
                            
                        </div>
                        <div>
                                <Image src={Big} alt=''/>
                            </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <Pagination
                current={currentPage}
                total={filteredGroups.length}
                pageSize={pageSize}
                onChange={handlePageChange}
                className="mt-4"
            />
        </div>
    );
}

export default Content;