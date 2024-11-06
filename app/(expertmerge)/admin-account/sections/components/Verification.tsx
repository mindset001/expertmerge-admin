import React, { useEffect, useState } from 'react';
import { Button, Input, Table, Pagination, Modal } from 'antd';
import ExpertButton from '@/components/buttons/ExpertButton';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import Icon from '@/components/icons/Icon';
import { getAllAdmin } from '@/app/api/services/endpoints/signup';
import CreateAccountForm from './Modal';

type Group = {
  key: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  about: string;
  post: string;
  profileLink: string;
  role: string;
};

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}
export default function Verification() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('Newest reported');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [isModalVisible3, setIsModalVisible3] = useState(false);
  const [data, setData] = useState<Group[]>([]);



  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    let validationErrors: Partial<FormData> = {};
    if (!formData.firstName) validationErrors.firstName = "First Name is required";
    if (!formData.lastName) validationErrors.lastName = "Last Name is required";
    if (!formData.email) validationErrors.email = "Email Address is required";
    if (!formData.role) validationErrors.role = "Role selection is required";
    
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Perform form submission or API call here
      console.log("Form submitted:", formData);
    }
  };




  useEffect(() => {
    const fetchData = async () => {
      const { response, error } = await getAllAdmin();
      if (response) {
        console.log("admin list:", response.data);
        const dataWithKeys = response.data.map((user: any) => ({
          key: user.id,
          name: `${user.firstName} ${user.lastName}`,
          address: `${user.location.city}, ${user.location.country}`,
          phone: user.phone,
          email: user.email,
          about: user.about || "N/A",
          post: user.post || "N/A",
          profileLink: user.profileLink || "N/A",
          role: user.role || "Support Admin"
        }));
        setData(dataWithKeys);
      } else {
        console.error("API Error:", error);
      }
    };
    fetchData();
  }, []);

  const handleRoleChange = (id: number, newRole: string) => {
    const updatedData = data.map(item => 
      item.key === id ? { ...item, role: newRole } : item
    );
    setData(updatedData);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const paginatedData = data
    .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const columns = [
    { title: 'SN', dataIndex: 'key', key: 'key', width: '10%' },
    { title: 'Name', dataIndex: 'name', key: 'name', width: '20%' },
    { title: 'Username', dataIndex: 'address', key: 'address', width: '20%' },
    { title: 'Password', dataIndex: 'phone', key: 'phone', width: '15%' },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string, record: any) => {
        let colorClass = '';
        switch (role) {
          case 'Support Admin':
            colorClass = 'bg-[#E0F7F3] text-[#26B99A]';
            break;
          case 'Account Manager':
            colorClass = 'bg-[#FFE7D9] text-[#F97C6F]';
            break;
          case 'Content Manager':
            colorClass = 'bg-[#F2E5FF] text-[#9B59B6]';
            break;
          case 'Data Manager':
            colorClass = 'bg-[#E7FCD1] text-[#8BC34A]';
            break;
          default:
            colorClass = 'bg-gray-200 text-gray-700';
        }
    
        return (
         <div className='flex gap-2 items-center'>
           <div className={`px-4 py-2 rounded-[3px] inline-flex items-center ${colorClass}`}>
            {role}
           </div>
           <select
                value={role}
                onChange={(e) => handleRoleChange(record.key, e.target.value)}
                className="border ml-2 rounded px-2 py-1"
              >
                <option value="Support Admin">Support Admin</option>
                <option value="Account Manager">Account Manager</option>
                <option value="Content Manager">Content Manager</option>
                <option value="Data Manager">Data Manager</option>
              </select>
         </div>
        );
      },
      width: '15%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <ExpertButton text="Save" onClick={() => setIsModalVisible(true)} />
        
        </div>
      ),
      width: '10%',
    },
    {
      title: '',
      dataIndex: 'action',
      render: (_: any, record: any) => (
        <div className="flex gap-2">
         
          <button onClick={() => setIsModalVisible(true)}>
            <p>Delete</p>
          </button>
        </div>
      ),
      width: '10%',
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
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold mr-4">Admin Profile Data</h1>
            <Button icon={<ReloadOutlined />} onClick={() => window.location.reload()} />
          </div>

          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            prefix={<SearchOutlined />}
            className="w-[250px] rounded-md"
          />
        </div>

        {/* Table */}
        <Table dataSource={paginatedData} columns={columns} rowKey="key" pagination={false} className=' vertical-border' />

        {/* Pagination */}
        <div className="flex justify-end mt-4">
          <Pagination
            current={currentPage}
            total={data.length}
            pageSize={pageSize}
            onChange={handlePageChange}
          />
        </div>
      </div>

      {/* Modals */}
      <Modal visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null} width={500}>
        <div className='flex flex-col justify-center items-center'>
          <Icon name='verified' />
          <div className='flex flex-col items-center text-center'>
            <h1 className='text-[#1D2739] text-[20px] font-[500]'>Account verified!</h1>
            <p className='text-[#645D5D] text-[14px] font-[400]'>You have successfully verified Minerva Barnett's account</p>
          </div>
        </div>
      </Modal>

      <Modal visible={isModalVisible3} onCancel={() => setIsModalVisible3(false)} footer={null} width={800}>
        <div className='flex flex-col justify-center'>
          <div className='border-b mb-4 pb-4'>
            <h1 className='text-[#202224] text-[24px] font-[700]'>Create Admin Account</h1>
          </div>
         <CreateAccountForm/>
        </div>
      </Modal>
    </div>
  );
}
