import React, { useState } from 'react';
import { Button, Input, Select, Table, Pagination, Modal } from 'antd';
import ExpertButton from '@/components/buttons/ExpertButton';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import Icon from '@/components/icons/Icon';
import TextInput from '@/components/inputs/TextInputs';

// Sample data (replace with real data or API)
const reportedAccountsData = [
  { id: 1, name: 'Minerva Barnett', address: 'Glasgow, United Kingdom', phone: '+44 783 330 3333', role: 'Support Admin' },
  { id: 2, name: 'John Doe', address: 'London, United Kingdom', phone: '+44 7911 123456', role: 'Account Manager' },
  { id: 3, name: 'Jane Smith', address: 'Manchester, United Kingdom', phone: '+44 7911 654321', role: 'Content Manager'},
  { id: 4, name: 'Robert Brown', address: 'Birmingham, United Kingdom', phone: '+44 7888 123456', role: 'Data Manager' },
  { id: 5, name: 'Emma Watson', address: 'Liverpool, United Kingdom', phone: '+44 7912 123456', role: 'Support Admin' },
  { id: 6, name: 'Olivia Johnson', address: 'Edinburgh, United Kingdom', phone: '+44 7777 123456', role: 'Support Admin'},
  { id: 7, name: 'William Martinez', address: 'Cardiff, United Kingdom', phone: '+44 7945 123456', role: 'Support Admin' },
  { id: 8, name: 'Sophia Davis', address: 'Bristol, United Kingdom', phone: '+44 7988 123456', role: 'Support Admin' },
  { id: 9, name: 'Lucas Taylor', address: 'Leeds, United Kingdom', phone: '+44 7855 123456', role: 'Support Admin' },
  { id: 10, name: 'Isabella Wilson', address: 'Glasgow, United Kingdom', phone: '+44 7919 123456', role: 'Support Admin' },
  { id: 11, name: 'Mason Harris', address: 'Sheffield, United Kingdom', phone: '+44 7822 123456', role: 'Support Admin' },
  { id: 12, name: 'Amelia Garcia', address: 'Newcastle, United Kingdom', phone: '+44 7800 123456', role: 'Support Admin'},
  { id: 13, name: 'James Johnson', address: 'Nottingham, United Kingdom', phone: '+44 7755 123456', role: 'Support Admin'},
  { id: 14, name: 'Emily Brown', address: 'Liverpool, United Kingdom', phone: '+44 7733 123456', role: 'Support Admin' },
  { id: 15, name: 'Henry White', address: 'Coventry, United Kingdom', phone: '+44 7699 123456', role: 'Support Admin' },
  { id: 16, name: 'Charlotte Davis', address: 'Brighton, United Kingdom', phone: '+44 7644 123456', role: 'Support Admin' },
  { id: 17, name: 'Daniel King', address: 'Glasgow, United Kingdom', phone: '+44 7600 123456', role: 'Support Admin' },
  { id: 18, name: 'Victoria Lewis', address: 'Southampton, United Kingdom', phone: '+44 7599 123456', role: 'Support Admin' },
  { id: 19, name: 'Alexander Walker', address: 'Plymouth, United Kingdom', phone: '+44 7544 123456', role: 'Support Admin' },
  { id: 20, name: 'Ella Thompson', address: 'Cardiff, United Kingdom', phone: '+44 7533 123456', role: 'Support Admin' }
  // Add more entries as needed
];


export default function Verification() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Number of items per page
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('Newest reported');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [isModalVisible3, setIsModalVisible3] = useState(false);
  const [data, setData] = useState(reportedAccountsData);

  const handleRoleChange = (id: number, newRole: string) => {
    const updatedData = data.map(item => 
      item.id === id ? { ...item, role: newRole } : item
    );
    setData(updatedData);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  const closeModal2 = () => {
    setIsModalVisible2(false);
  };

  const closeModal3 = () => {
    setIsModalVisible3(false);
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
    { title: 'Username', dataIndex: 'address', key: 'address', width: '20%' },
    { title: 'Password', dataIndex: 'phone', key: 'phone', width: '15%' },
    {
      title: 'Role',
      dataIndex: 'role', // Assuming you have a 'role' key in your data
      key: 'role',
      render: (role: string, record: any) => {
        let colorClass = '';
        
        // Assign colors based on role
        switch (role) {
          case 'Support Admin':
            colorClass = 'bg-[#E0F7F3] text-[#26B99A]'; // Mint Green background
            break;
          case 'Account Manager':
            colorClass = 'bg-[#FFE7D9] text-[#F97C6F]'; // Light Orange background
            break;
          case 'Content Manager':
            colorClass = 'bg-[#F2E5FF] text-[#9B59B6]'; // Light Purple background
            break;
          case 'Data Manager':
            colorClass = 'bg-[#E7FCD1] text-[#8BC34A]'; // Light Green background
            break;
          default:
            colorClass = 'bg-gray-200 text-gray-700'; // Default background and text
        }
    
        return (
         <div className='flex gap-2 items-center'>
           <div className={`px-4 py-2 rounded-[3px] inline-flex items-center ${colorClass}`}>
            {role}
            {/* Optional dropdown icon */}
          </div>
           <div className='border'>
           <select
                value={role}
                onChange={(e) => handleRoleChange(record.id, e.target.value)}
              >
                <option value=""></option>
                {/* <option value="Support Admin">Support Admin</option>
                <option value="Account Manager">Account Manager</option>
                <option value="Content Manager">Content Manager</option>
                <option value="Data Manager">Data Manager</option> */}
              </select>
           </div>
         </div>
        );
      },
      width: '15%',
    },
    
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_: any, record: any) => (
        <ExpertButton text="Save"

          onClick={() => setIsModalVisible(true)}
        />

      ),
      width: '10%',
    },
    {
      title: '',
      dataIndex: 'action',
      render: (_: any, record: any) => (
        <button onClick={() => setIsModalVisible(true)}>
          <p>Delete</p>
        </button>

      ),
      width: '15%',
    },


  ];

  return (
    <div className="w-full p-4">
      {/* Header */}
      <div className='flex justify-between'>
        <h1 className='text-[#1D2739] text-[24px] font-[500] pl-6 mb-8'>Admin Management</h1>
        <h1 className='text-[#1D2739] text-[24px] font-[500] pl-6 mb-8 cursor-pointer' onClick={() => setIsModalVisible3(true)}>Create Admin Account</h1>

      </div>

      <div className='border-2 rounded-lg p-6'>
        <div className="flex justify-between items-center mb-8  ">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold mr-4">Admin Profile Data</h1>
            <Button
              icon={<ReloadOutlined />}
              className="text-gray-500 hover:text-black border-none bg-transparent"
              onClick={() => window.location.reload()} // Dummy reload for now
            />
          </div>

          <div className="flex items-center gap-2">


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
        <Table dataSource={paginatedData} columns={columns} rowKey="id" pagination={false} className=' vertical-border' />

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

      <Modal
        // title="Report"
        visible={isModalVisible}
        onCancel={closeModal}
        footer={null}
        width={500}
      >
        <div className='flex flex-col justify-center items-center'>
          <div>
            <Icon name='verified' />
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

      <Modal
        // title="Report"
        visible={isModalVisible3}
        onCancel={closeModal3}
        footer={null}
        width={800}
      >
        <div className='flex flex-col justify-center '>
          <div className='border-b mb-4 pb-4'>
            <h1 className='text-[#202224] text-[24px] font-[700]'>Create Admin Account</h1>
          </div>
          <form action="">
            <div className='w-full flex flex-col items-center border rounded-lg  p-6 mb-6'>

              <div className='w-full flex justify-between'>
                <div >
                  <p className='text-[#101928] text-[14px] font-[500]'>First Name <span className='text-[#FF0000]'>*</span></p>
                  <input className='border border-[#D0D5DD] rounded-[6px] h-[56px] w-[340px]' />
                </div>

                <div >
                  <p className='text-[#101928] text-[14px] font-[500]'>Last Name <span className='text-[#FF0000]'>*</span></p>
                  <input className='border border-[#D0D5DD] rounded-[6px] h-[56px] w-[340px] ' />
                </div>
              </div>

              <div className='w-full flex justify-between mt-6'>
                <div >
                  <p className='text-[#101928] text-[14px] font-[500]'>First Name <span className='text-[#FF0000]'>*</span></p>
                  <input className='border border-[#D0D5DD] rounded-[6px] h-[56px] w-[340px]' />
                </div>

                <div >
                  <p className='text-[#101928] text-[14px] font-[500]'>Last Name <span className='text-[#FF0000]'>*</span></p>
                  <input className='border border-[#D0D5DD] rounded-[6px] h-[56px] w-[340px] ' />
                </div>
              </div>
            </div>

            <ExpertButton 
            text='Create Account'
            />
          </form>
        </div>
      </Modal>
    </div>
  );
}
