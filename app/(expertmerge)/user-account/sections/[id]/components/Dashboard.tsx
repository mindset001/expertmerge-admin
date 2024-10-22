import { useState } from "react";
import { Button, Card, Select } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [selectedYear, setSelectedYear] = useState("2024");

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const years = ["2021", "2022", "2023", "2024"];

  const metrics = [
    { title: "Reactions", value: "45,823", percentage: 10 },
    { title: "Comments", value: "5,823", percentage: 10 },
    { title: "Reposts", value: "823", percentage: 10 },
    { title: "Views", value: "120,823", percentage: 10 },
    { title: "Clicks", value: "123,234,823", percentage: 10 },
  ];

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
  };

  return (
    <div className="dashboard">
         
      <div className="flex flex-col mb-4">
        <h1 className="text-[16px] font-[600] mb-4">{selectedMonth} {selectedYear}</h1>

        <div className="month-year-selector flex items-center gap-2">
          <Select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="w-40"
          >
            {months.map((month) => (
              <Select.Option key={month} value={month}>
                {month}
              </Select.Option>
            ))}
          </Select>

          <div className="flex items-center gap-2">
            <Button
              icon={<LeftOutlined />}
              onClick={() => setSelectedYear(prevYear => `${parseInt(prevYear) - 1}`)}
            />
            <Select
              value={selectedYear}
              onChange={handleYearChange}
              className="w-20"
            >
              {years.map((year) => (
                <Select.Option key={year} value={year}>
                  {year}
                </Select.Option>
              ))}
            </Select>
            <Button
              icon={<RightOutlined />}
              onClick={() => setSelectedYear(prevYear => `${parseInt(prevYear) + 1}`)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index} title={metric.title} bordered={false}>
            <p className="text-[21px] text-[#1D2739] font-[500]">{metric.value}</p>
            <p className="rounded-lg bg-[#EAFCFF] w-[30px]">{metric.percentage}%</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
