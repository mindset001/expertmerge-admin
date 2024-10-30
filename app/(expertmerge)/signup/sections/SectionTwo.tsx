"use client"
import { AnimatePresence } from "framer-motion"
import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"
import Verification from "./components/Verification"
import { Button, Input, Select,  Switch  } from "antd"
import { useState } from "react"
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import Approved from "./components/Approved"
import Rejected from "./components/Rejected"
import Suspended from "../../suspended-account/sections/components/Verification"


const SectionTwo = () => {
    const { searchFeedSection } = useSelector((state: RootState) => state.searchFeedSlice)
    const [searchTerm, setSearchTerm] = useState(''); 
    const [sortOrder, setSortOrder] = useState('Newest reported');
    const [activeSection, setActiveSection] = useState<'verification' | 'approved' | 'rejected'| 'suspended'>('verification');
    const [isApprovalRequired, setIsApprovalRequired] = useState(true);

    // Handle the toggle change
    const handleToggleChange = (checked: boolean) => {
      setIsApprovalRequired(checked);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    };
  
    const handleSortChange = (value: string) => {
      setSortOrder(value);
    };

    const handleSectionChange = (section: 'verification' | 'approved' | 'rejected'| 'suspended') => {
      setActiveSection(section);
    };
  return (
    <AnimatePresence mode="wait">
      
      <div className="flex justify-between items-center mb-6 border-b pb-6">
      <h1 className="text-[#1D2739] font-[500] text-[24px]">Sign up Request</h1>

      <div className="flex items-center gap-2">
        <span className="text-[#1D2739] font-[500] text-[16px]">
          New User Sign-Up Approval Required
        </span>
        <span className="ml-2 text-[#1D2739]">
          {isApprovalRequired ? 'On' : 'Off'}
        </span>
        <Switch
          checked={isApprovalRequired}
          onChange={handleToggleChange}
          className="bg-[#f2f2f2]"
        />
        
      </div>
    </div>
    <div className="border-2  rounded-[10px] p-6">
    <div className="flex justify-between items-center my-8">
    <div className="flex items-center">
            {/* Navigation buttons to switch between sections */}
            <button
              onClick={() => handleSectionChange('verification')}
              className={activeSection === 'verification' ?  'bg-[#BDF2F9] text-[#0A424A] font-[500] rounded-[4px] p-2 border' : 'border bg-white rounded-[4px] p-2'}
            >
              Sign up Request
            </button>
            <button
              onClick={() => handleSectionChange('approved')}
              className={activeSection === 'approved' ? 'bg-[#BDF2F9] text-[#0A424A] font-[500] rounded-[4px] p-2 border' : 'border bg-white rounded-[4px] p-2'}
            >
              Approved
            </button>
            <button
              onClick={() => handleSectionChange('rejected')}
              className={activeSection === 'rejected' ?  'bg-[#BDF2F9] text-[#0A424A] font-[500] rounded-[4px] p-2 border' : 'border bg-white rounded-[4px] p-2'}
            >
              Rejected
            </button>
            <button
              onClick={() => handleSectionChange('suspended')}
              className={activeSection === 'suspended' ?  'bg-[#BDF2F9] text-[#0A424A] font-[500] rounded-[4px] p-2 border' : 'border bg-white rounded-[4px] p-2'}
            >
             Suspended Account
            </button>

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
       {/* Conditional rendering based on the active section */}
       {activeSection === 'verification' && <Verification />}
        {activeSection === 'approved' && <Approved />}
        {activeSection === 'rejected' && <Rejected />}
        {activeSection === 'suspended' && <Suspended />}
        
    </div>
      
       
    </AnimatePresence>
  )
}

export default SectionTwo
