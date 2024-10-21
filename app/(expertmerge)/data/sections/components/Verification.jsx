import React, { useState } from 'react';
import { Button, Input, Select, Table, Pagination } from 'antd';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation'; // Use this to navigate to the new page
import Icon from '@/components/icons/Icon';

// Sample data (replace with real data or API)
const reportedAccountsData = [
  { id: 1, name: 'Minerva Barnett', address: 'Glasgow, United Kingdom', phone: '+44 783 330 3333', email: 'iamtemplate@gmail.com' },
  { id: 2, name: 'John Doe', address: 'London, United Kingdom', phone: '+44 7911 123456', email: 'johndoe@gmail.com' },
  { id: 3, name: 'Jane Smith', address: 'Manchester, United Kingdom', phone: '+44 7911 654321', email: 'janesmith@example.com' },
  { id: 4, name: 'Robert Brown', address: 'Birmingham, United Kingdom', phone: '+44 7888 123456', email: 'robert.brown@email.com' },
  { id: 5, name: 'Emma Watson', address: 'Liverpool, United Kingdom', phone: '+44 7912 123456', email: 'emmawatson@mail.com' },
  // Add more entries as needed
];

export default function Verification() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Number of items per page
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('Newest reported');
  const router = useRouter(); // Use the router hook for navigation

  // Handle pagination change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
  };

  // Navigate to user details page on row click
  const handleRowClick = (record) => {
    // Navigate to the user's detail page using the dynamic route [id]
    router.push(`/data/sections/${record.id}?name=${record.name}&address=${record.address}&phone=${record.phone}&email=${record.email}`);

  }
  // Calculate the current data to display based on pagination
  const paginatedData = reportedAccountsData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [
    { title: 'SN', dataIndex: 'id', key: 'id', width: '10%' },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      render: (text, record) => (
        <a className="cursor-pointer " onClick={() => handleRowClick(record)}>
          {text}
        </a>
      ),
    },
    { title: 'Address', dataIndex: 'address', key: 'address', width: '20%' },
    { title: 'Phone Number', dataIndex: 'phone', key: 'phone', width: '20%' },
    { title: 'Email Address', dataIndex: 'email', key: 'email', width: '20%' },
    {
      title: 'Profile Link',
      dataIndex: 'email', // reference to the correct key in the record object
      render: (_, record ) => (
        <div className="flex items-center cursor-pointer">
          <p>{record.email}</p>
          <Icon name='copy' />
        </div>
      ),
      width: '10%',
    },
  ];

  return (
    <div className="w-full p-4">
      {/* Header */}
      <div>
        <h1 className='text-[#1D2739] text-[24px] font-[500] pl-6 mb-8'>Data Management</h1>
      </div>

      <div className='border-2 rounded-lg p-6'>
        <div className="flex justify-between items-center mb-8  ">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold mr-4">Professional Profile Data</h1>
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
              <Select.Option value="Newest reported">Newest reported</Select.Option>
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

        {/* Table for displaying reported accounts */}
        <Table
          dataSource={paginatedData}
          columns={columns}
          rowKey="id"
          pagination={false}
          className='vertical-border'
        />

        {/* Pagination */}
        <div className="flex justify-end mt-4">
          <Pagination
            current={currentPage}
            total={reportedAccountsData.length}
            pageSize={pageSize}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
