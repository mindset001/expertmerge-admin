"use client"
import MenuBtn from "@/components/buttons/MenuBtn"
import Icon from "@/components/icons/Icon"
import { NavBarMenuListProps } from "@/types"
import { SearchOutlined } from "@ant-design/icons"
import Avatar from '@/assets/matcap.jpeg'
import { Select } from "antd"
import { Inter } from "next/font/google"

import Link from "next/link"
import Image from "next/image"

const inter = Inter({ subsets: ["latin"] });

const NavBar = () => {

  const menuBtn: NavBarMenuListProps[] = [
    { route: 'dashboard', text: 'Dashboard' },
    { route: 'reports', text: 'Reports' },
    { route: 'content', text: 'Content' },
    { route: 'data', text: 'Data' },
    { 
      text: 'Accounts', 
      options: [ // Add options here for the select dropdown
        { value: 'admin', label: 'Admin Accounts', route: 'admin-account' },
        { value: 'user', label: 'User Accounts', route: 'user-account' },
      ]
    },
    { text: 'Verification', route: 'verification' },
    { text: 'Sign up Request', route: 'signup' },
    { text: 'Notification', route: 'notification' },
  ]

  return (
    <div className="h-[88.96px] gap-8 bg-white border-b border-b-[#0A424A] flex items-center justify-between px-[50px]">
      <div className="flex ">
        <Icon name="expert-merge" />

        <div className="ml-10 flex items-center gap-4">
  {
    menuBtn.map((item, index: number) => item.route ? (
      <Link key={index} href={`/${item.route}`}>
        <MenuBtn {...item} />
      </Link>
    ) : item.options && item.options.length > 0 ? (
      <div key={index} className="flex items-center">
        <MenuBtn {...item} />
        <Select
         bordered={false} // Remove the border
         dropdownStyle={{ width: '200px' }} 
         className="ml-[-20px] mt-1" 
          onChange={(value) => {
            const selectedOption = item.options?.find(option => option.value === value);
            if (selectedOption?.route) {
              window.location.href = `/${selectedOption.route}`;
            }
          }}
        >
          {item.options?.map((option, subIndex: number) => (
            <Select.Option key={subIndex} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </div>
    ) : (
      <MenuBtn key={index} {...item} className="ml-8" />
    ))
  }
</div>

        
      </div>

      <div className="flex justify-evenly gap-4 items-center">
        <div>
          <SearchOutlined />
        </div>
        <div>
          <Icon name="settings" />
        </div>
        <div>
          <Icon name="bell" />
        </div>
        <div>
          <Image src={Avatar} alt="avatar" className="rounded-full h-[40px] w-[40px]" />
        </div>
      </div>
    </div>
  )
}

export default NavBar
