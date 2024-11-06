import React, { useState, useEffect } from 'react';
import { Button, Input, Select, Table, Pagination } from 'antd';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Icon from '@/components/icons/Icon';
import Avatar from '@/assets/matcap.jpeg'; 
import Frame from '@/assets/Frame.png'
import { getUsers } from '@/app/api/services/endpoints/content';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { setUserProfile } from '@/redux/features/profileSlice';


type Profile = {
  id: any;
  key: number;
  name: string;
  location: {
    city: string;
    country: string;
  };
  profAChievement: [];
  skills: [];
  certification: [];
  workExperience: [];
  education: [];
  phone: string;
  email: string;
  about: string;
  post: string;
  profileLink: string;
  imageUrl: string;
  bannerUrl: string;
  dob: string;
};

export default function Verification() {
  const dispatch = useDispatch<AppDispatch>()
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); 
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('Newest reported');
  const [details, setDetails] = useState<Profile[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { response, error } = await getUsers();
      console.log('normal level', response);
      
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
          imageUrl: user.profilePicture || Avatar,
          bannerUrl: user.profileBanner || Frame,
          dob: user.dob,
          achievement: user.profAchievement || [],
          education: user.education || [],
          experience: user.workExperience ||[],
          skills: user.skills ||[],
          certification: user.certification || []

        }));
        setDetails(dataWithKeys);
      } else {
        console.error("API Error:", error);
      }
    };
    fetchData();
  }, []);

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);

  const handleSortChange = (value: string) => setSortOrder(value);

  const handleRowClick = (record: Profile) => {
    dispatch(setUserProfile({ data: record }));
    router.push(`/data/sections/${record.id}?name=${record.name}`);
  };

  const filteredData = details.filter(
    (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const columns = [
    { title: 'SN', dataIndex: 'key', key: 'key', width: '10%' },
    { title: 'id', dataIndex: 'id', key: 'id', width: '10%' },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      render: (text: string, record: Profile) => (
        <a className="cursor-pointer" onClick={() => handleRowClick(record)}>
          {text}
        </a>
      ),
    },
    { title: 'Address', dataIndex: 'address', key: 'address', width: '20%', },
    { title: 'Phone Number', dataIndex: 'phone', key: 'phone', width: '20%' },
    { title: 'Email Address', dataIndex: 'email', key: 'email', width: '20%' },
    {
      title: 'Profile Link',
      dataIndex: 'email',
      render: (_: any, record: Profile) => (
        <div className="flex items-center cursor-pointer">
          <p>{record.email}</p>
          <Icon name='copy' />
        </div>
      ),
      width: '10%',
    },
  ];

  return (
    <div className="w-full p-4">
      <div>
        <h1 className="text-[#1D2739] text-[24px] font-[500] pl-6 mb-8">Data Management</h1>
      </div>

      <div className="border-2 rounded-lg p-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold mr-4">Professional Profile Data</h1>
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

        <Table
          dataSource={paginatedData}
          columns={columns}
          rowKey="key"
          pagination={false}
          className="vertical-border"
        />

        <div className="flex justify-end mt-4">
          <Pagination
            current={currentPage}
            total={filteredData.length}
            pageSize={pageSize}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
