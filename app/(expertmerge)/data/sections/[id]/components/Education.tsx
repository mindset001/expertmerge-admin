import React from "react";
import Image, { StaticImageData } from "next/image";
import Avatar from '@/assets/matcap.jpeg'
import ExpertButton from "@/components/buttons/ExpertButton";

// Define the work experience data type
type Experience = {
  id: number;
  companyLogo: string | StaticImageData;
  jobTitle: string;
  companyName: string;
  startDate: string;
  endDate: string;
  description: string;
  skills: string[];
};

const experiences: Experience[] = [
  {
    id: 1,
    companyLogo: Avatar, // Replace with actual image path
    jobTitle: "Library and Information Science",
    companyName: "Federal Polytechnic Offa, Kwara State.",
    startDate: "2022",
    endDate: "2026",
    description:
      "Worked closely with Product Managers and Engineers to identify user needs, sketch solutions, build prototypes, and refine the end-to-end experience with data and user feedback.",
    skills: [
      "Product Management",
      "Interaction Design",
      "Mobile Application Design",
      "Responsive Web Design",
      "User-centered Design",
      "UX Research",
      "User Interface Design",
    ],
  },
  {
    id: 2,
    companyLogo: Avatar, // Replace with actual image path
    jobTitle: "UI/UX Design with Figma: 5+ Real World Projects (2023)",
    companyName: "Udemy",
    startDate: "2023",
    endDate: "2024",
    description:
      "Worked closely with Product Managers and Engineers on product solutions, prototypes, and end-to-end experiences.",
    skills: [
      "Product Management",
      "Interaction Design",
      "Mobile Application Design",
      "Responsive Web Design",
      "Prototyping",
      "UX Research",
    ],
  },
  // Add more experience as needed
];

const Education = () => {
  return (
    <div className="work-experience-list">
      <h2 className="text-[28px] font-bold text-[#1D2739] mb-6">Education</h2>
      <div className="w-[60%]">
      {experiences.map((experience) => (
        <div key={experience.id} className="flex items-start gap-4 mb-8 border-b pb-8">
          {/* Company logo */}
          

          {/* Experience details */}
          <div className="w-full">
            <div className="flex justify-between">
              <div className="flex gap-4">
              <Image
            src={experience.companyLogo}
            alt={experience.companyName}
            width={60}
            height={50}
            className="rounded-md"
          />
                <div>
                <h3 className="font-bold text-[28px] text-[#1D2739]">
                  {experience.jobTitle}
                </h3>
               <div className="flex gap-2 text-[18px]">
               <p className="text-[#1D2739]">{experience.companyName}</p>
                <p className="text-[#1D2739]">
                {experience.startDate} — {experience.endDate}
              </p>
               </div>
                </div>
              </div>
             
            </div>
          

          </div>
        </div>
      ))}
      <ExpertButton
      text='Block Clifford'
      />
      </div>
    </div>
  );
};

export default Education;
