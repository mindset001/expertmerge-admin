"use client";

import { useEffect, useState } from "react";
import MenuBtn from "@/components/buttons/MenuBtn";
import Icon from "@/components/icons/Icon";
import { NavBarMenuListProps } from "@/types";
import { SearchOutlined } from "@ant-design/icons";
import { Modal, Select } from "antd";
import Link from "next/link";
import EditPassword from "./Modal";

type AdminDetails = {
  firstName?: string;
  lastName?: string;
  role?: string;
};

const NavBar = () => {
  const [adminDetails, setAdminDetails] = useState<AdminDetails | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalVisible3, setIsModalVisible3] = useState(false);

  // Fetch admin details from localStorage
  useEffect(() => {
    try {
      const storedDetails = localStorage.getItem("adminDetails");
      if (storedDetails) {
        setAdminDetails(JSON.parse(storedDetails));
      }
    } catch (error) {
      console.error("Error parsing adminDetails from localStorage:", error);
    }
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleChangePassword = () => {
    console.log("Change password clicked");
  };

  // Dynamically generate the menu based on admin role
  const generateMenuButtons = (): NavBarMenuListProps[] => {
    if (!adminDetails?.role) return [];
    switch (adminDetails.role) {
      case "super":
        return [
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
        ];
      case "data":
        return [
          { route: "dashboard", text: "Dashboard" },
          { route: "data", text: "Data" },
          { route: "content", text: "Content" },
        ];
      case "content":
        return [
          { route: "dashboard", text: "Dashboard" },
          { route: "reports", text: "Reports" },
          { route: "content", text: "Content" },
          { text: "Notification", route: "notification" },
        ];
      case "account":
        return [
          { route: "dashboard", text: "Dashboard" },
          { route: "reports", text: "Reports" },
          { route: "content", text: "Content" },
          { route: "data", text: "Data" },
          {
            text: "Accounts",
            options: [{ value: "user", label: "User Accounts", route: "user-account" }],
          },
          { text: "Verification", route: "verification" },
          { text: "Sign up Request", route: "signup" },
          { text: "Notification", route: "notification" },
        ];
      case "admin":
        return [
          { route: "dashboard", text: "Dashboard" },
          { route: "reports", text: "Reports" },
          { route: "content", text: "Content" },
          { route: "data", text: "Data" },
          {
            text: "Accounts",
            options: [{ value: "user", label: "User Accounts", route: "user-account" }],
          },
          { text: "Verification", route: "verification" },
          { text: "Sign up Request", route: "signup" },
          { text: "Notification", route: "notification" },
        ];
      default:
        return [];
    }
  };

  const menuBtn = generateMenuButtons();

  return (
    <div className="h-[88.96px] gap-8 bg-white border-b border-b-[#0A424A] flex items-center justify-between px-[50px]">
      {/* Left Section */}
      <div className="flex">
        <Icon name="expert-merge" />
        <div className="ml-10 flex items-center gap-4">
          {menuBtn.map((item, index) =>
            item.route ? (
              <Link key={index} href={`/${item.route}`}>
                <MenuBtn {...item} />
              </Link>
            ) : item.options && item.options.length > 0 ? (
              <div key={index} className="flex items-center">
                <MenuBtn {...item} />
                <Select
                  bordered={false}
                  className="ml-[-20px] mt-1 w-[200px]"
                  onChange={(value) => {
                    const selectedOption = item.options?.find((option) => option.value === value);
                    if (selectedOption?.route) {
                      window.location.href = `/${selectedOption.route}`;
                    }
                  }}
                >
                  {item.options?.map((option, subIndex) => (
                    <Select.Option key={subIndex} value={option.value} >
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

      {/* Right Section */}
      <div className="flex justify-evenly gap-4 items-center">
        {/* <SearchOutlined /> */}
        {/* <Icon name="settings" /> */}
        <Link href="/notification">
          <Icon name="bell" />
        </Link>
        <div className="relative">
          {/* Avatar Button */}
          <div onClick={toggleDropdown} className="cursor-pointer flex items-center space-x-2">
            <div className="bg-[#036B26] border rounded-full text-white flex items-center justify-center h-10 w-10">
              {`${adminDetails?.firstName?.charAt(0)?.toUpperCase() || ""}${adminDetails?.lastName?.charAt(0)?.toUpperCase() || ""}`}
            </div>
          </div>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-[150px] bg-white shadow-lg rounded-md z-10">
              <ul className="py-2 text-sm text-gray-700">
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700">
              {`${adminDetails?.firstName || ""} ${adminDetails?.lastName || ""}`}
            </div>
              <li onClick={() => setIsModalVisible3(true)}className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700">
                  Change Password
                </li>
           
                
                <li onClick={handleSignOut} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Sign Out
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <Modal visible={isModalVisible3} onCancel={() => setIsModalVisible3(false)} footer={null} width={800}>
                <EditPassword/>
              </Modal>
    </div>
  );
};

export default NavBar;
