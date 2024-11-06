import React, { useEffect, useState } from 'react';
import { Button, Input, Select, Table, Pagination, Modal } from 'antd';
import ExpertButton from '@/components/buttons/ExpertButton';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import Icon from '@/components/icons/Icon';
import { getApprovedUsers, removeApproval } from '@/app/api/services/endpoints/signup';


type Group = {
  key: number;
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  about: string;
  post: string;
  profileLink: string;
};

export default function Approved() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Group | null>(null);
  const [details, setDetails] = useState<Group[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { response, error } = await getApprovedUsers();
      if (response) {
        console.log("API Response:", response.data);
        const dataWithKeys = response.data.map((user: any, index: number) => ({
          key: index + 1,
          id: user._id,
          name: `${user.firstName} ${user.lastName}`,
          address: user.location ? `${user.location.city}, ${user.location.country}` : "N/A",
          phone: user.phone,
          email: user.email,
          about: user.about || "N/A",
          post: user.post || "N/A",
          profileLink: user.profileLink || "N/A",
        }));
        setDetails(dataWithKeys);
      } else {
        console.log("API Error:", error);
      }
    };
    fetchData();
  }, []);

  const handleRemoveClick = (user: Group) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleRemoveApproval = async () => {
    if (!selectedUser) return;
    const { response, error } = await removeApproval({ userId: selectedUser.id });
    if (response) {
      setDetails((prevDetails) => prevDetails.filter((user) => user.id !== selectedUser.id));
      setIsModalVisible(false);
    } else {
      console.log("Error removing approval:", error);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = details.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [
    { title: 'SN', dataIndex: 'key', key: 'key', width: '10%' },
    { title: 'id', dataIndex: 'id', key: 'id', width: '10%' },
    { title: 'Name', dataIndex: 'name', key: 'name', width: '20%' },
    { title: 'Address', dataIndex: 'address', key: 'address', width: '20%' },
    { title: 'Phone Number', dataIndex: 'phone', key: 'phone', width: '20%' },
    { title: 'Email Address', dataIndex: 'email', key: 'email', width: '20%' },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_: any, record: Group) => (
        <ExpertButton text="Remove" onClick={() => handleRemoveClick(record)} />
      ),
      width: '10%',
    },
  ];

  return (
    <main>
      <div className="w-full">
        {/* Table for displaying approved accounts */}
        <Table dataSource={paginatedData} columns={columns} rowKey="id" pagination={false} className=' vertical-border' />

        {/* Pagination */}
        <div className="flex justify-end mt-4">
          <Pagination
            current={currentPage}
            total={details.length}
            pageSize={pageSize}
            onChange={handlePageChange}
          />
        </div>

        {/* Confirmation Modal */}
        <Modal   
          visible={isModalVisible}
          onCancel={closeModal}
          footer={null}
          width={500}
        >
          <div className='flex flex-col justify-center items-center'>
            <Icon name='verified'/>
            <div className='flex flex-col items-center text-center'>
              <h1 className='text-[#1D2739] text-[20px] font-[500]'>Warning!</h1>
              <p className='text-[#645D5D] text-[14px] font-[400]'>
                Are you sure you want to remove approval for {selectedUser?.name}?
              </p>
            </div>
            <div className='w-[80%] flex gap-4 mt-4'>
              <ExpertButton
                outlined
                text='No'
                onClick={closeModal}
                fullWidth
              />
              <ExpertButton
                text='Yes, Remove'
                onClick={handleRemoveApproval}
                fullWidth
              />
            </div>
          </div>
        </Modal>
      </div>
    </main>
  );
}
