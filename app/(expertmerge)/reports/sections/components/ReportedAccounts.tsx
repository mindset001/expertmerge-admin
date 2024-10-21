import React, { useState } from 'react';
import { Button, Input, Select, Table, Pagination } from 'antd';
import ExpertButton from '@/components/buttons/ExpertButton';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';

// Sample data (replace with real data or API)
const reportedAccountsData = [
  { id: 1, name: 'Minerva Barnett', reason: 'Spam', lastReported: '2024-05-18 14:30:00' },
  { id: 2, name: 'John Doe', reason: 'Inappropriate Content', lastReported: '2024-05-17 09:15:00' },
  { id: 3, name: 'Jane Smith', reason: 'Harassment', lastReported: '2024-05-16 11:45:00' },
  { id: 4, name: 'Robert Brown', reason: 'Fake Account', lastReported: '2024-05-18 08:30:00' },
  { id: 5, name: 'Emma Watson', reason: 'Scamming', lastReported: '2024-05-17 15:00:00' },
  { id: 6, name: 'Olivia Johnson', reason: 'Multiple Accounts', lastReported: '2024-05-18 10:20:00' },
  { id: 7, name: 'William Martinez', reason: 'Spam', lastReported: '2024-05-16 12:30:00' },
  { id: 8, name: 'Sophia Davis', reason: 'Harassment', lastReported: '2024-05-17 13:40:00' },
  { id: 9, name: 'Lucas Taylor', reason: 'Inappropriate Content', lastReported: '2024-05-16 09:25:00' },
  { id: 10, name: 'Isabella Wilson', reason: 'Scamming', lastReported: '2024-05-18 16:10:00' },
  { id: 11, name: 'Mason Harris', reason: 'Fake Account', lastReported: '2024-05-17 11:55:00' },
  { id: 12, name: 'Amelia Garcia', reason: 'Multiple Accounts', lastReported: '2024-05-18 07:45:00' },
  // Add more entries as needed
];

export default function ReportedAccounts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Number of items per page
  const [searchTerm, setSearchTerm] = useState(''); 
  const [sortOrder, setSortOrder] = useState('Newest reported');

  // Handle pagination change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (value: string) => {
    setSortOrder(value);
  };

  // Calculate the current data to display based on pagination
  const paginatedData = reportedAccountsData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [
    { title: 'SN', dataIndex: 'id', key: 'id', width: '10%' },
    { title: 'Name', dataIndex: 'name', key: 'name', width: '20%' },
    { title: 'Report Reason', dataIndex: 'reason', key: 'reason', width: '30%' },
    { title: 'Last Reported', dataIndex: 'lastReported', key: 'lastReported', width: '30%' },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_: any, record: any) => (
        <ExpertButton text="Suspend" />
      ),
      width: '10%',
    },
  ];

  return (
    <div className="w-full p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold mr-4">Reported Accounts</h1>
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
      <Table dataSource={paginatedData} columns={columns} rowKey="id" pagination={false} />

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
  );
}
