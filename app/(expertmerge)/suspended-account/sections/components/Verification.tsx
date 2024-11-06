import React, { useEffect, useState } from 'react';
import { Button, Input, Select, Table, Pagination, Modal, message } from 'antd';
import ExpertButton from '@/components/buttons/ExpertButton';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import Icon from '@/components/icons/Icon';
import { getSuspendedUsers, verifyUser } from '@/app/api/services/endpoints/signup';

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

export default function Suspended() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Number of items per page
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('Newest reported');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [details, setDetails] = useState<Group[]>([]);
  const [verifyUserId, setVerifyUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { response, error } = await getSuspendedUsers();
      if (response) {
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

  const openModal = (userId: string) => {
    setVerifyUserId(userId);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setVerifyUserId(null);
  };

  const handleVerifyUser = async () => {
    if (verifyUserId) {
      const { response, error } = await verifyUser({ userId: verifyUserId });
      if (response) {
        setDetails(details.filter((user) => user.id !== verifyUserId)); // Remove verified user from list
        message.success("Account verified successfully!"); // Display success message
        closeModal();
      } else {
        message.error("Failed to verify account. Please try again."); // Display error message
        console.error("Verification error:", error);
      }
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
    { title: 'Address', dataIndex: 'address', key: 'address', width: '20%' },
    { title: 'Phone Number', dataIndex: 'phone', key: 'phone', width: '20%' },
    { title: 'Email Address', dataIndex: 'email', key: 'email', width: '20%' },
    {
      title: 'Profile',
      dataIndex: 'action',
      render: (_: any, record: any) => <p>View Profile</p>,
      width: '10%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_: any, record: any) => (
        <ExpertButton text="Verify Account" onClick={() => openModal(record.id)} />
      ),
      width: '10%',
    },
  ];

  return (
    <div className="w-full p-4">
      {/* Table for displaying suspended accounts */}
      <Table
        dataSource={paginatedData}
        columns={columns}
        rowKey="id"
        pagination={false}
        className="border vertical-border"
      />

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <Pagination
          current={currentPage}
          total={details.length}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>

      {/* Verification Confirmation Modal */}
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
    </div>
  );
}
