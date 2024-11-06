import React, { useEffect, useState } from 'react';
import { Button, Input, Select, Table, Pagination, Modal } from 'antd';
import ExpertButton from '@/components/buttons/ExpertButton';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation'; // Use this to navigate to the new page
import Icon from '@/components/icons/Icon';
import Avatar from '@/assets/matcap.jpeg';
import { getUsers } from '@/app/api/services/endpoints/content';


type Profile = {
  key: number;
  name: string;
  id: string;
 
  location: {
      city:string;
      country: string;
  }
  phone: string;
  email: string;
  about: string;
  post: string;
  profileLink: string;
  imageUrl: string;
};


export default function Verification() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Number of items per page
  const [searchTerm, setSearchTerm] = useState(''); 
  const [sortOrder, setSortOrder] = useState('Newest reported');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const router = useRouter(); // Use the router hook for navigation
  const [details, setDetails] = useState<Profile[]>([]); // Set initial type as an empty array

  useEffect(() => {
      const fetchData = async () => {
          const { response, error } = await getUsers();
          if (response) {
              console.log("API Response:", response.data);
              // Ensure response data matches the Profile structure or map it accordingly
              const dataWithKeys = response.data.map((user: any, index: number) => ({
                  key: index + 1, // Add a unique key for each row
                  id: user._id,
                  name: `${user.firstName} ${user.lastName}`,
                  address: user.location ? `${user.location.city}, ${user.location.country}` : "N/A",
                  phone: user.phone,
                  email: user.email,
                  about: user.about || "N/A",
                  post: user.post || "N/A",
                  profileLink: user.profileLink || "N/A",
                  imageUrl: user.profilePicture || Avatar,
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

  const handleRowClick = (record: { id: any; name: any; address: any; phone: any; email: any; }) => {
    // Navigate to the user's detail page using the dynamic route [id]
    router.push(`/user-account/sections/${record.id}?name=${record.name}`);

  }
  // Calculate the current data to display based on pagination
  const paginatedData = details.slice(
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
      render: (text: string, record: any) => (
        <span
          className=" cursor-pointer"
          onClick={() => handleRowClick(record)}
        >
          {text}
        </span>
      ),
    },
    { title: 'Address', dataIndex: 'address', key: 'address', width: '20%' },
    { title: 'Phone Number', dataIndex: 'phone', key: 'phone', width: '20%' },
    { title: 'Email Address', dataIndex: 'email', key: 'email', width: '20%' },
    {
      title: 'Profile Link',
      dataIndex: 'email', // reference to the correct key in the record object
      render: (_: any, record: any) => (
        <div onClick={() => setIsModalVisible2(true)} className="flex items-center cursor-pointer">
          <p>{record.email}</p> {/* Correctly reference the email from the record */}
          
        </div>
      ),
      width: '10%',
    }
    
  
  ];

  return (
    <div className="w-full p-4">
      {/* Header */}
      <div>
        <h1 className='text-[#1D2739] text-[24px] font-[500] pl-6 mb-8'>User Account</h1>
      </div>

      <div className='border-2 rounded-lg p-6'>
      <div className="flex justify-between items-center mb-8  ">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold mr-4">User Activities</h1>
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
      <Table dataSource={paginatedData} columns={columns} rowKey="id" pagination={false} className=' vertical-border'/>

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <Pagination
          current={currentPage}
          total={details.length}
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
