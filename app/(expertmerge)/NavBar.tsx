"use client";

import { useEffect, useState } from "react";
import MenuBtn from "@/components/buttons/MenuBtn";
import Icon from "@/components/icons/Icon";
import { NavBarMenuListProps } from "@/types";
import { SearchOutlined } from "@ant-design/icons";
import Avatar from "@/assets/matcap.jpeg";
import { Select } from "antd";
import Link from "next/link";
import Image from "next/image";


const NavBar = () => {

  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    // Clear all content in localStorage
    localStorage.clear();
  
    // Redirect to home page
    window.location.href = "/";
  };;

  const handleChangePassword = () => {
    console.log("Change password clicked");
    // Add change password logic here
  };

  const adminDetails = JSON.parse(localStorage.getItem("adminDetails") || '{}');
  console.log(adminDetails);

  const menuBtn: NavBarMenuListProps[] = 
  adminDetails?.role === "super"
    ? [
        { route: "dashboard", text: "Dashboard" },
        { route: "reports", text: "Reports" },
        { route: "content", text: "Content" },
        { route: "data", text: "Data" },
        {
          text: "Accounts",
          options: [
            { value: "admin", label: "Admin Accounts", route: "admin-account" },
            { value: "user", label: "User Accounts", route: "user-account" },
          ],
        },
        { text: "Verification", route: "verification" },
        { text: "Sign up Request", route: "signup" },
        { text: "Notification", route: "notification" },
      ]
    : adminDetails?.role === "data"
    ? [
        { route: "dashboard", text: "Dashboard" },
        { route: "data", text: "Data" },
        { route: "content", text: "Content" },
      ]
    : adminDetails?.role === "content"
    ? [
        { route: "dashboard", text: "Dashboard" },
        { route: "reports", text: "Reports" },
        { route: "content", text: "Content" },
        { text: "Notification", route: "notification" },
      ]
    : adminDetails?.role === "account"
    ?  [
      { route: "dashboard", text: "Dashboard" },
      { route: "reports", text: "Reports" },
      { route: "content", text: "Content" },
      { route: "data", text: "Data" },
      {
        text: "Accounts",
        options: [
        
          { value: "user", label: "User Accounts", route: "user-account" },
        ],
      },
      { text: "Verification", route: "verification" },
      { text: "Sign up Request", route: "signup" },
      { text: "Notification", route: "notification" },
    ]
    : adminDetails?.role === "admin"
    ?  [
      { route: "dashboard", text: "Dashboard" },
      { route: "reports", text: "Reports" },
      { route: "content", text: "Content" },
      { route: "data", text: "Data" },
      {
        text: "Accounts",
        options: [
          // { value: "admin", label: "Admin Accounts", route: "admin-account" },
          { value: "user", label: "User Accounts", route: "user-account" },
        ],
      },
      { text: "Verification", route: "verification" },
      { text: "Sign up Request", route: "signup" },
      { text: "Notification", route: "notification" },
    ]
    : [];


  return (
    <div className="h-[88.96px] gap-8 bg-white border-b border-b-[#0A424A] flex items-center justify-between px-[50px]">
      <div className="flex">
        <Icon name="expert-merge" />

        <div className="ml-10 flex items-center gap-4">
          {menuBtn.map((item, index: number) =>
            item.route ? (
              <Link key={index} href={`/${item.route}`}>
                <MenuBtn {...item} />
              </Link>
            ) : item.options && item.options.length > 0 ? (
              <div key={index} className="flex items-center">
                <MenuBtn {...item} />
                <Select
                  bordered={false}
                  dropdownStyle={{ width: "200px" }}
                  className="ml-[-20px] mt-1"
                  onChange={(value) => {
                    const selectedOption = item.options?.find(
                      (option) => option.value === value
                    );
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
            )
          )}
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
          <Link href="/notification">
            <Icon name="bell" />
          </Link>
        </div>
        <div className="relative">
          {/* Avatar Button */}
          <div
            onClick={toggleDropdown}
            className="cursor-pointer flex items-center space-x-2"
          >
            <div className="bg-[#036B26] border rounded-full text-white flex items-center justify-center h-10 w-10">
              {`${adminDetails.firstName?.charAt(0).toUpperCase() || ''}${adminDetails.lastName?.charAt(0).toUpperCase() || ''}`}
            </div>
{/* 
            <Image
              src={Avatar}
              alt="avatar"
              className="rounded-full h-[40px] w-[40px]"
            /> */}
          </div>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-[150px] bg-white shadow-lg rounded-md z-10">
              <ul className="py-2 text-sm text-gray-700">
                <li
                  onClick={handleChangePassword}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Change Password
                </li>
                <li
                  onClick={handleSignOut}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Sign Out
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
