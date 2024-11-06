import React, { useEffect, useState } from 'react';
import { Button, Input, Select, Table, Pagination, message } from 'antd';
import ExpertButton from '@/components/buttons/ExpertButton';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { getReportedAccounts, suspendUser } from '@/app/api/services/endpoints/reports';

type Group = {
  key: number;
  id: string;
  name: string;
  text: string;
  address: string;
  phone: string;
  email: string;
  about: string;
  post: string;
  profileLink: string;
  lastReported: string;
};

export default function ReportedAccounts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Number of items per page
  const [searchTerm, setSearchTerm] = useState(''); 
  const [sortOrder, setSortOrder] = useState('Newest reported');
  const [details, setDetails] = useState<Group[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { response, error } = await getReportedAccounts();
      console.log("Reported Account", response);
      
      if (response) {
        const dataWithKeys = response.map((report: any, index: number) => ({
          key: index + 1,
          id: report.userReported?._id,
          name: `${report.userReported?.firstName || ''} ${report.userReported?.lastName || ''}`,
          address: report.userReported?.location 
            ? `${report.userReported.location.city || ''}, ${report.userReported.location.country || ''}` 
            : "N/A",
          text: report.text,
          phone: report.userReported?.phone || "N/A",
          email: report.userReported?.email || "N/A",
          about: report.userReported?.about || "N/A",
          post: report.userReported?.post || "N/A",
          profileLink: report.userReported?.profileLink || "N/A",
          lastReported: new Date(report.updatedAt).toLocaleString() || "N/A",
        }));
        setDetails(dataWithKeys);
      } else {
        console.log("API Error:", error);
      }
    };
    fetchData();
  }, []);

  const handleSuspendUser = async (userId: string) => {
    const { response, error } = await suspendUser({ userId });
    if (response) {
      message.success("User suspended successfully.");
      setDetails(details.filter((user) => user.id !== userId)); // Remove user from the table
    } else {
      message.error("Failed to suspend user. Please try again.");
      console.error("Suspension error:", error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (value: string) => {
    setSortOrder(value);
  };

  const paginatedData = details.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [
    { title: 'SN', dataIndex: 'key', key: 'key', width: '10%' },
    { title: 'Name', dataIndex: 'name', key: 'name', width: '20%' },
    { title: 'Report Reason', dataIndex: 'text', key: 'text', width: '30%' },
    { title: 'Last Reported', dataIndex: 'lastReported', key: 'lastReported', width: '30%' },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_: any, record: any) => (
        <ExpertButton text="Suspend" onClick={() => handleSuspendUser(record.id)} />
      ),
      width: '10%',
    },
  ];

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold mr-4">Reported Accounts</h1>
          <Button
            icon={<ReloadOutlined />}
            className="text-gray-500 hover:text-black border-none bg-transparent"
            onClick={() => window.location.reload()}
          />
        </div>

        <div className="flex items-center gap-2">
          <Select
            defaultValue={sortOrder}
            onChange={handleSortChange}
            className="w-[200px] rounded-md"
          >
            <Select.Option value="Newest reported">Newest reported</Select.Option>
            <Select.Option value="Oldest reported">Oldest reported</Select.Option>
            <Select.Option value="Most reported">Most reported</Select.Option>
          </Select>

          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            prefix={<SearchOutlined />}
            className="w-[250px] rounded-md"
          />
        </div>
      </div>

      <Table dataSource={paginatedData} columns={columns} rowKey="id" pagination={false} />

      <div className="flex justify-end mt-4">
        <Pagination
          current={currentPage}
          total={details.length}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
