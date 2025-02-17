import React, { useEffect, useState } from 'react';
import { Button, Input, Select, Table, Pagination, Modal, message } from 'antd';
import ExpertButton from '@/components/buttons/ExpertButton';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import Icon from '@/components/icons/Icon';
import { getVerification, verifyUser } from '@/app/api/services/endpoints/signup';
import Image from 'next/image';

// Sample data (replace with real data or API)
type Group = {
  id: string;
  key: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  about: string;
  post: string;
  profileLink: string;
  frontImage: string;
  backImage: string;

};
  

export default function Verification() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Number of items per page
  const [searchTerm, setSearchTerm] = useState(''); 
  const [sortOrder, setSortOrder] = useState('Newest reported');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Group | null>(null);
  const [details, setDetails] = useState<Group[]>([]);
    const [verifyUserId, setVerifyUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { response, error } = await getVerification();
      if (response) {
        console.log("API Response:", response.data);
        const dataWithKeys = response.data.map((user: any, index: number) => ({
          key: user._id,
          name: `${user.firstName} ${user.lastName}`,
          address: `${user.location.city}, ${user.location.country}`,
          phone: user.phone,
          email: user.email,
          about: user.about || "N/A",
          post: user.post || "N/A",
          profileLink: user.profileLink || "N/A",
          frontImage: user.verification.front,
          backImage: user.verification.back,
          verificationState: user.verification.state,
        }));
        setDetails(dataWithKeys);
      } else {
        console.log("API Error:", error);
      }
    };
    fetchData();
  }, []);

  const openModal = (userId: string) => {
    console.log("Verifying User ID:", userId); // Debugging log
    setVerifyUserId(userId);
    setIsModalVisible(true);
  };
  

  
  const closeModal = () => {
    setIsModalVisible(false);
  };
  const openDocsModal = (user: Group) => {
    setSelectedUser(user);
    setIsModalVisible2(true);
  };
  
  const closeModal2 = () => {
    setIsModalVisible2(false);
    setSelectedUser(null);
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
  const paginatedData = details.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );


  const [loading, setLoading] = useState(false);

  const handleVerifyUser = async () => {
    if (verifyUserId) {
      const { response, error } = await verifyUser({ userId: verifyUserId });
      if (response) {
        // setDetails(details.filter((user) => user.id !== verifyUserId)); 
        // Remove verified user from list
        message.success("Account verified successfully!"); // Display success message
        closeModal();
      } else {
        message.error("Failed to verify account. Please try again."); // Display error message
        console.error("Verification error:", error);
      }
    }
  };
  
  const columns = [
    { title: 'SN', dataIndex: 'id', key: 'id', width: '10%' },
    { title: 'Name', dataIndex: 'name', key: 'name', width: '20%' },
    { title: 'Address', dataIndex: 'address', key: 'address', width: '20%' },
    { title: 'Phone Number', dataIndex: 'phone', key: 'phone', width: '20%' },
    { title: 'Email Address', dataIndex: 'email', key: 'email', width: '20%' },
    {
        title: 'Documents',
        dataIndex: 'action',
        render: (_: any, record: any) => (
          <div  onClick={() => openDocsModal(record)} className='cursor-pointer'>
           <p> View Docs</p>
            </div>
          
        ),
        width: '10%',
      },
      {
        title: 'Action',
        dataIndex: 'action',
        render: (_: any, record: any) => (
          record.verificationState ? (
            <ExpertButton 
            text="Verified" 
            disabled
          />
          ) : (
            <ExpertButton 
              text="Verify Account" 
              loading={loading} 
              onClick={() => openModal(record.key)} 
            />
          )
        ),
        width: '10%',
      },
  ];

  return (
    <div className="w-full p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold mr-4">Verification</h1>
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
          total={details.length}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>

      <Modal
        visible={isModalVisible}
        onCancel={closeModal}
        footer={null}
        width={500}
      >
        <div className="flex flex-col justify-center items-center">
          <Icon name="verified" />
          <div className="flex flex-col items-center text-center">
            <h1 className="text-[#1D2739] text-[20px] font-[500]">Account Verification</h1>
            <p className="text-[#645D5D] text-[14px] font-[400]">
              Are you sure you want to verify this account?
            </p>
          </div>
          <div className="w-[80%] flex gap-4 mt-4">
            <ExpertButton outlined text="No" fullWidth onClick={closeModal} />
            <ExpertButton text="Yes, Verify" fullWidth onClick={handleVerifyUser} />
          </div>
        </div>
      </Modal>

      <Modal
  visible={isModalVisible2}
  onCancel={closeModal2}
  footer={null}
  width={500}
>
  {selectedUser && (
    <div className='flex flex-col '>
      <div className='flex gap-4'>
        <h2 className='text-[#667185] font-[700] text-[15px]'>Documents</h2>
        <div className='bg-[#0A424A] rounded-full h-[24px] w-[24px] flex justify-center items-center'>
          <p className='text-[#FFFFFF] text-[11px] mt-2 font-[600] flex justify-center items-center'>2</p>
        </div>
      </div>

      <div className='flex flex-col items-center mt-10'>
        <div>
          <h3 className='text-[#667185] font-[700] text-[15px]'>Front</h3>
          <div className='bg-[#666562] w-[430px] h-[229px] rounded-[14px] flex justify-center items-center'>
            <Image src={selectedUser.frontImage} alt='Front Document' width={430} height={229}  className='w-[410px] h-[209px]'/>
          </div>
        </div>

        <div>
          <h3 className='text-[#667185] font-[700] text-[15px] mt-6'>Back</h3>
          <div className='bg-[#F6F1EA] w-[430px] h-[229px] rounded-[14px] flex justify-center items-center'>
            <Image src={selectedUser.backImage} alt='Back Document' width={430} height={229} className='w-[410px] h-[209px]'/>
          </div>
        </div>
      </div>
    </div>
  )}
</Modal>

    </div>
  );
}


