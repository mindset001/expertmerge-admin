'use client'
import React from 'react'
import { Tabs, TabsProps } from 'antd';
import { Button, Input, Select } from "antd"
import { useState } from "react"
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';

import Verification from './Verification';
import Tab2 from '../../tabs/Tab2';
import Tab3 from '../../tabs/Tab3';
import Tab1 from '../../tabs/Tab1';


const Section2 = () => {
    const [searchTerm, setSearchTerm] = useState(''); 
    const [sortOrder, setSortOrder] = useState('Newest reported');
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
      };
    
      const handleSortChange = (value: string) => {
        setSortOrder(value);
      };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <div className='w-[300px] text-center text-[14px] font-[400]'>Sign up Request</div>,
    //   children: <Tab1 />,
    },
    {
      key: '2',
      label: <div className='w-[300px] text-center text-[14px] font-[400]'>Approved</div>,
    //   children: <Tab2 />,
    },
    {
      key: '3',
      label: <div className='w-[300px] text-center text-[14px] font-[400]'>Rejected</div>,
    //   children: <Tab3 />,
    }
  ];

  return (
    <div className='flex'>

     
     <div className='w-[300px]'>
     <Tabs 
      defaultActiveKey="1" 
      items={items} 
      centered 
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
    
  )
}

export default Section2
