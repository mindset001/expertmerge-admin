import React, { useEffect, useState } from 'react';
import { Button, Input, Select, Table, Pagination, Modal } from 'antd';
import ExpertButton from '@/components/buttons/ExpertButton';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import Icon from '@/components/icons/Icon';
import { getSuspendedUsers } from '@/app/api/services/endpoints/content';

type Group = {
  key: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  about: string;
  post: string;
  profileLink: string;
};

export default function AccountsSuspended() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Number of items per page
  const [searchTerm, setSearchTerm] = useState(''); 
  const [sortOrder, setSortOrder] = useState('Newest reported');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);

  const [details, setDetails] = useState<Group[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { response, error } = await getSuspendedUsers();
      if (response) {
        console.log("API Response:", response.data);
        const dataWithKeys = response.data.map((user: any, index: number) => ({
          key: index + 1,
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

  const closeModal = () => {
    setIsModalVisible(false);
  };
  
  const closeModal2 = () => {
    setIsModalVisible2(false);
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
    { title: 'Phone Number', dataIndex: 'phone', key: 'phone', width: '15%' },
    { title: 'Email Address', dataIndex: 'email', key: 'email', width: '20%' },
    { title: 'Profile Link', dataIndex: 'profileLink', key: 'profileLink', width: '20%' },
  ];

  return (
    <div className="w-full border bg-white rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold mr-4 text-[#1D2739]">Suspended Accounts</h1>
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

      <Table dataSource={paginatedData} columns={columns} rowKey="key" pagination={false} className='vertical-border' />

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
        <div className='flex flex-col justify-center items-center'>
          <Icon name='verified'/>
          <div className='flex flex-col items-center text-center'>
            <h1 className='text-[#1D2739] text-[20px] font-[500]'>Account Restored!</h1>
            <p className='text-[#645D5D] text-[14px] font-[400]'>You have successfully restored Minerva Barnett account</p>
          </div>
        </div>
      </Modal>

      <Modal   
        visible={isModalVisible2}
        onCancel={closeModal2}
        footer={null}
        width={500}
      >
        <div className='flex flex-col '>
          <div className='flex gap-4'>
            <h2 className='text-[#667185] font-[700] text-[15px]'>Documents</h2>
            <div className='bg-[#0A424A] rounded-full h-[24px] w-[24px] flex justify-center items-center'>
              <p className='text-[#FFFFFF] text-[11px] font-[600]'>2</p>
            </div>
          </div>
          <div className='flex flex-col items-center mt-10'>
            <div>
              <h3 className='text-[#667185] font-[700] text-[15px]'>Front</h3>
              <div className='bg-[#666562] w-[430px] h-[229px] rounded-[14px]'></div>
            </div>
            <div>
              <h3 className='text-[#667185] font-[700] text-[15px] mt-6'>Back</h3>
              <div className='bg-[#F6F1EA] w-[430px] h-[229px] rounded-[14px]'></div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
