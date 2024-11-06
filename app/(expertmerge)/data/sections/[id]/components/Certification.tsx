import React from "react";
import Image, { StaticImageData } from "next/image";
import Avatar from '@/assets/matcap.jpeg'
import ExpertButton from "@/components/buttons/ExpertButton";
import Icon from "@/components/icons/Icon";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';



const Certification= () => {
  const { user } = useSelector((state: RootState) => state.profileSlice);
  return (
    <div className="work-experience-list">
      <h2 className="text-[28px] font-bold text-[#1D2739] mb-6">Certification</h2>
      <div className="w-[60%]">
      {user.certification.map((experience:any) => (
        <div key={experience.id} className="flex items-start gap-4 mb-8 border-b pb-8">
          {/* Company logo */}
          

          {/* Experience details */}
          <div className="w-full">
            <div className="flex flex-col justify-between">
              <div className="flex gap-4">
              <Image
            src={experience.companyLogo || Avatar}
            alt={experience.companyName}
            width={60}
            height={50}
            className="rounded-md"
          />
                <div>
                <h3 className="font-bold text-[28px] text-[#1D2739]">
                  {experience.name}
                </h3>
               <div className="flex gap-2 text-[18px]">
               <p className="text-[#1D2739]">{experience.organization}</p>
                {/* <p className="text-[#1D2739]">
                {experience.startDate} — {experience.expires}
              </p> */}
               </div>

               
                </div>
              </div>
              <div className="mt-6 ml-[10%]">
                <p>issued {experience.issuedBy}</p>
                <p>Credential Id {experience.credentialId}</p>

                <button className="mt-4 rounded-[100px] border border-[#98A2B3] h-[56px] w-[202px]">
                  <p className="text-[16px] font-[600] text-[#98A2B3]">See credentials</p>
                  <Icon name='arrow-right'/>
                </button>
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

export default Certification;
