import React, { useState } from 'react';
import { Button, Input, Select, Table, Pagination, Modal } from 'antd';
import ExpertButton from '@/components/buttons/ExpertButton';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import Icon from '@/components/icons/Icon';

// Sample data (replace with real data or API)
const reportedAccountsData = [
    { id: 1, name: 'Minerva Barnett', address: 'Glasgow, United Kingdom', phone: '+44 783 330 3333', email: 'iamtemplate@gmail.com' },
    { id: 2, name: 'John Doe', address: 'London, United Kingdom', phone: '+44 7911 123456', email: 'johndoe@gmail.com' },
    { id: 3, name: 'Jane Smith', address: 'Manchester, United Kingdom', phone: '+44 7911 654321', email: 'janesmith@example.com' },
    { id: 4, name: 'Robert Brown', address: 'Birmingham, United Kingdom', phone: '+44 7888 123456', email: 'robert.brown@email.com' },
    { id: 5, name: 'Emma Watson', address: 'Liverpool, United Kingdom', phone: '+44 7912 123456', email: 'emmawatson@mail.com' },
    { id: 6, name: 'Olivia Johnson', address: 'Edinburgh, United Kingdom', phone: '+44 7777 123456', email: 'olivia.johnson@yahoo.com' },
    { id: 7, name: 'William Martinez', address: 'Cardiff, United Kingdom', phone: '+44 7945 123456', email: 'willmartinez@outlook.com' },
    { id: 8, name: 'Sophia Davis', address: 'Bristol, United Kingdom', phone: '+44 7988 123456', email: 'sophiadavis@gmail.com' },
    { id: 9, name: 'Lucas Taylor', address: 'Leeds, United Kingdom', phone: '+44 7855 123456', email: 'lucastaylor@example.com' },
    { id: 10, name: 'Isabella Wilson', address: 'Glasgow, United Kingdom', phone: '+44 7919 123456', email: 'isabellawilson@mail.com' },
    { id: 11, name: 'Mason Harris', address: 'Sheffield, United Kingdom', phone: '+44 7822 123456', email: 'masonharris@gmail.com' },
    { id: 12, name: 'Amelia Garcia', address: 'Newcastle, United Kingdom', phone: '+44 7800 123456', email: 'amelia.garcia@yahoo.com' },
    { id: 13, name: 'James Johnson', address: 'Nottingham, United Kingdom', phone: '+44 7755 123456', email: 'jamesjohnson@outlook.com' },
    { id: 14, name: 'Emily Brown', address: 'Liverpool, United Kingdom', phone: '+44 7733 123456', email: 'emily.brown@email.com' },
    { id: 15, name: 'Henry White', address: 'Coventry, United Kingdom', phone: '+44 7699 123456', email: 'henrywhite@gmail.com' },
    { id: 16, name: 'Charlotte Davis', address: 'Brighton, United Kingdom', phone: '+44 7644 123456', email: 'charlottedavis@gmail.com' },
    { id: 17, name: 'Daniel King', address: 'Glasgow, United Kingdom', phone: '+44 7600 123456', email: 'danielking@yahoo.com' },
    { id: 18, name: 'Victoria Lewis', address: 'Southampton, United Kingdom', phone: '+44 7599 123456', email: 'victorialewis@example.com' },
    { id: 19, name: 'Alexander Walker', address: 'Plymouth, United Kingdom', phone: '+44 7544 123456', email: 'alexanderwalker@mail.com' },
    { id: 20, name: 'Ella Thompson', address: 'Cardiff, United Kingdom', phone: '+44 7533 123456', email: 'ellathompson@gmail.com' }
    // Add more entries as needed
  ];
  

export default function Verification() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Number of items per page
  const [searchTerm, setSearchTerm] = useState(''); 
  const [sortOrder, setSortOrder] = useState('Newest reported');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);

  const closeModal = () => {
    setIsModalVisible(false);
  };
  const closeModal2 = () => {
    setIsModalVisible2(false);
  };
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
    { title: 'Address', dataIndex: 'address', key: 'address', width: '20%' },
    { title: 'Phone Number', dataIndex: 'phone', key: 'phone', width: '20%' },
    { title: 'Email Address', dataIndex: 'email', key: 'email', width: '20%' },
    {
        title: 'Profile',
        dataIndex: 'action',
        render: (_: any, record: any) => (
          <p>View Profile</p>
          // <ExpertButton text="View Docs" 
          // onClick={()=> setIsModalVisible2(true)}
          // />
        ),
        width: '10%',
      },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_: any, record: any) => (
        <ExpertButton text="Verify Account" 
          onClick={()=> setIsModalVisible(true)}
        />
      ),
      width: '10%',
    },
  ];

  return (
    <div className="w-full p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold mr-4">Suspended Accounts</h1>
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
      <Table dataSource={paginatedData} columns={columns} rowKey="id" pagination={false} className='border vertical-border'/>

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <Pagination
          current={currentPage}
          total={reportedAccountsData.length}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>

      <Modal   
      // title="Report"
  visible={isModalVisible}
  onCancel={closeModal}
  footer={null}
  width={500}
  >
       <div className='flex flex-col justify-center items-center'>
       <div>
          <Icon name='verified'/>
        </div>
        <div className='flex flex-col items-center text-center'>
          <h1 className='text-[#1D2739] text-[20px] font-[500]'>Account verified!</h1>
          <p className='text-[#645D5D] text-[14px] font-[400]'>You have successfully verified Minerva Barnett account</p>
        </div>
       </div>
      </Modal>

      <Modal   
      // title="Report"
  visible={isModalVisible2}
  onCancel={closeModal2}
  footer={null}
  width={500}
  >
       <div className='flex flex-col '>
       <div className='flex gap-4'>
         <h2 className='text-[#667185] font-[700] text-[15px]'>Documents</h2>
         <div className='bg-[#0A424A] rounded-full h-[24px] w-[24px] flex justify-center items-center'><p className='text-[#FFFFFF] text-[11px] font-[600]'>2</p></div>
        </div>
        <div className='flex flex-col items-center mt-10'>
          <div>
            <h3 className='text-[#667185] font-[700] text-[15px]'>Front</h3>
            <div className='bg-[#666562] w-[430px] h-[229px] rounded-[14px]'>

          </div>
          </div>
          
          <div>
            <h3 className='text-[#667185] font-[700] text-[15px] mt-6'>Back</h3>
            <div className='bg-[#F6F1EA] w-[430px] h-[229px] rounded-[14px]'>

          </div>
          </div>
        </div>
       </div>
      </Modal>
    </div>
  );
}
