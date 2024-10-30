import React, { useEffect, useState } from 'react';
import { Button, Input, Select, Table, Pagination, Modal } from 'antd';
import ExpertButton from '@/components/buttons/ExpertButton';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import Icon from '@/components/icons/Icon';
import { main } from 'framer-motion/client';
import { getApprovedUsers } from '@/app/api/services/endpoints/signup';

// Sample data (replace with real data or API)
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

  

export default function Approved() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Number of items per page

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  
  const [details, setDetails] = useState<Group[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { response, error } = await getApprovedUsers();
      if (response) {
        console.log("API Response:", response.data);
        const dataWithKeys = response.data.map((user: any, index: number) => ({
          key: user.id,
          name: `${user.firstName} ${user.lastName}`,
          address: `${user.location.city}, ${user.location.country}`,
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
  // Handle pagination change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

 

  // Calculate the current data to display based on pagination
  const paginatedData = details.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [
    { title: 'SN', dataIndex: 'id', key: 'id', width: '10%' },
    { title: 'Name', dataIndex: 'name', key: 'name', width: '20%' },
    { title: 'Address', dataIndex: 'address', key: 'address', width: '20%' },
    { title: 'Phone Number', dataIndex: 'phone', key: 'phone', width: '20%' },
    { title: 'Email Address', dataIndex: 'email', key: 'email', width: '20%' },
    // {
    //     title: 'Action',
    //     dataIndex: 'action',
    //     render: (_: any, record: any) => (
    //       <div  onClick={()=> setIsModalVisible2(true)}>
    //        <p> Reject</p>
    //         </div>
          
    //     ),
    //     width: '10%',
    //   },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_: any, record: any) => (
        <ExpertButton text="Remove" 
          onClick={()=> setIsModalVisible(true)}
        />
      ),
      width: '10%',
    },
  ];

  return (
    <main>
   

      <div className="w-full ">
     
  

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
         <h1 className='text-[#1D2739] text-[20px] font-[500]'>Warning!</h1>
         <p className='text-[#645D5D] text-[14px] font-[400]'>By activating sign-up approvals, you will be responsible for manually approving all new users before they can access ExpertsMerge. This could lead to delays in user access and increased administrative workload. Are you sure you want to proceed?</p>
       </div>
       <div className='w-[80%] flex gap-4 mt-4'>
        <ExpertButton
          outlined
          text='No'
          fullWidth
        />
        <ExpertButton
          text='Yes, Activate!'
          fullWidth
          
        />
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
      <div className='flex flex-col justify-center items-center'>
      <div>
         <Icon name='verified'/>
       </div>
       <div className='flex flex-col items-center text-center'>
         <h1 className='text-[#1D2739] text-[20px] font-[500]'>Warning!</h1>
         <p className='text-[#645D5D] text-[14px] font-[400]'>By deactivating sign-up approvals, new users will be able to access ExpertsMerge without requiring your approval. This could result in less control over who joins the platform. Are you sure you want to proceed?</p>
       </div>
       <div className='w-[80%] flex gap-4 mt-4'>
        <ExpertButton
          outlined
          text='No'
          fullWidth
        />
        <ExpertButton
          text='Yes, Deactivate!'
          fullWidth
          
        />
       </div>
      </div>
     </Modal>
   </div>
    </main>
  );
}
