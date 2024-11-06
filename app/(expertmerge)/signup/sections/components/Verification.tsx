import React, { useEffect, useState } from 'react';
import { Table, Pagination, Modal } from 'antd';
import ExpertButton from '@/components/buttons/ExpertButton';
import Icon from '@/components/icons/Icon';
import { approve, getSignUpRequest, removeApproval } from '@/app/api/services/endpoints/signup';

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

export default function Verification() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [selectedUser, setSelectedUser] = useState<Group | null>(null);
  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [details, setDetails] = useState<Group[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { response, error } = await getSignUpRequest();
      console.log('Signup', response);
      
      if (response) {
        const dataWithKeys = response.map((user: any, index: number) => ({
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

  const closeApproveModal = () => {
    setIsApproveModalVisible(false);
    setSelectedUser(null);
  };

  const closeRejectModal = () => {
    setIsRejectModalVisible(false);
    setSelectedUser(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleApprovalClick = (user: Group) => {
    setSelectedUser(user);
    setIsApproveModalVisible(true);
  };

  const handleRejectClick = (user: Group) => {
    setSelectedUser(user);
    setIsRejectModalVisible(true);
  };

  const handleApproval = async () => {
    if (!selectedUser) return;
    const { response, error } = await approve({ userId: selectedUser.id });
    if (response) {
      setDetails((prevDetails) => prevDetails.filter((user) => user.id !== selectedUser.id));
      closeApproveModal();
    } else {
      console.log("Error approving user:", error);
    }
  };

  const handleRemoveApproval = async () => {
    if (!selectedUser) return;
    const { response, error } = await removeApproval({ userId: selectedUser.id });
    if (response) {
      setDetails((prevDetails) => prevDetails.filter((user) => user.id !== selectedUser.id));
      closeRejectModal();
    } else {
      console.log("Error rejecting user:", error);
    }
  };

  const paginatedData = details.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [
    { title: 'SN', dataIndex: 'key', key: 'key', width: '10%' },
    { title: 'Name', dataIndex: 'name', key: 'name', width: '20%' },
    { title: 'Address', dataIndex: 'address', key: 'address', width: '20%' },
    { title: 'Phone Number', dataIndex: 'phone', key: 'phone', width: '20%' },
    { title: 'Email Address', dataIndex: 'email', key: 'email', width: '20%' },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Group) => (
        <div className="flex">
          <p onClick={() => handleRejectClick(record)} style={{ color: '', cursor: 'pointer' }}>
            Reject
          </p>
          
        </div>
      ),
      width: '20%',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Group) => (
        <div className="flex">
         
          <ExpertButton text="Approve" onClick={() => handleApprovalClick(record)} />
        </div>
      ),
      width: '20%',
    },
  ];

  return (
    <main>
      <div className="w-full">
        <Table
          dataSource={paginatedData}
          columns={columns}
          rowKey="id"
          pagination={false}
          className='vertical-border'
        />

        <div className="flex justify-end mt-4">
          <Pagination
            current={currentPage}
            total={details.length}
            pageSize={pageSize}
            onChange={handlePageChange}
          />
        </div>

        {/* Approval Confirmation Modal */}
        <Modal
          visible={isApproveModalVisible}
          onCancel={closeApproveModal}
          footer={null}
          width={500}
        >
          <div className='flex flex-col justify-center items-center'>
            <Icon name='verified'/>
            <div className='flex flex-col items-center text-center'>
              <h1 className='text-[#1D2739] text-[20px] font-[500]'>Approve User</h1>
              <p className='text-[#645D5D] text-[14px] font-[400]'>
                Are you sure you want to approve {selectedUser?.name}?
              </p>
            </div>
            <div className='w-[80%] flex gap-4 mt-4'>
              <ExpertButton outlined text='No' onClick={closeApproveModal} fullWidth />
              <ExpertButton text='Yes, Approve' onClick={handleApproval} fullWidth />
            </div>
          </div>
        </Modal>

        {/* Rejection Confirmation Modal */}
        <Modal
          visible={isRejectModalVisible}
          onCancel={closeRejectModal}
          footer={null}
          width={500}
        >
          <div className='flex flex-col justify-center items-center'>
            <Icon name='verified'/>
            <div className='flex flex-col items-center text-center'>
              <h1 className='text-[#1D2739] text-[20px] font-[500]'>Reject User</h1>
              <p className='text-[#645D5D] text-[14px] font-[400]'>
                Are you sure you want to reject {selectedUser?.name}?
              </p>
            </div>
            <div className='w-[80%] flex gap-4 mt-4'>
              <ExpertButton outlined text='No' onClick={closeRejectModal} fullWidth />
              <ExpertButton text='Yes, Reject' onClick={handleRemoveApproval} fullWidth />
            </div>
          </div>
        </Modal>
      </div>
    </main>
  );
}
