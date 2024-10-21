'use client';

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

// Sample data
const data = [
  { name: 'Jan', users: 20 },
  { name: 'Feb', users: 45 },
  { name: 'Mar', users: 40 },
  { name: 'Apr', users: 100 }, // Peak in April
  { name: 'May', users: 60 },
  { name: 'Jun', users: 70 },
  { name: 'Jul', users: 30 },
  { name: 'Aug', users: 80 },
  { name: 'Sep', users: 50 },
  { name: 'Oct', users: 65 },
  { name: 'Nov', users: 55 },
  { name: 'Dec', users: 60 },
];

const NewUsersChart: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedDataType, setSelectedDataType] = useState('New Users');

  return (
    <div className="w-full p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">NEW USERS</h2>

        <div className="flex space-x-4">
          {/* Dropdown for selecting year */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>

          {/* Dropdown for selecting data type */}
          <select
            value={selectedDataType}
            onChange={(e) => setSelectedDataType(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="New Users">New Users</option>
            <option value="Active Users">Active Users</option>
          </select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="users" stroke="#00626F" dot={true} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NewUsersChart;
