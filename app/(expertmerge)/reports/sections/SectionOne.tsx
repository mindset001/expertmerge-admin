"use client"

import { setActivedSearchSection } from "@/redux/features/searchFeedSlice"
import { AppDispatch, RootState } from "@/redux/store"
import { SearchFeedProps} from "@/types"
import { Card } from "antd"
import Image from "next/image"
// import Verify from '../../../../../src/assets/images/Verify now.png'
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const SectionOne = () => {
    const { searchFeedSection } = useSelector((state: RootState) => state.searchFeedSlice)
    const dispatch = useDispatch<AppDispatch>()
    const [sideBarSections, setSiderBarSections] = useState<SearchFeedProps[]>([
      { name: "reports", count: 120},
      { name: "reported accounts", count: 20 },
 
    ])

  return (
    <div>
      <Card
      className="rounded-[12px]"
      >
        <div className="text-[#000] px-2 text-[14px] font-[500]">Reports</div>
       
          {
            sideBarSections.map((item, i: number) => (
                <div 
                onClick={() => dispatch(setActivedSearchSection({ search: item.name }))}
                 key={i} className={`flex cursor-pointer transition-all px-2 rounded-[4px] ${searchFeedSection ===  item.name && 'bg-[#EAFCFF]'} justify-between h-[44px] items-center mt-3`}>
                    <span className={`text-[#101928] text-[14px] font-[400] ${searchFeedSection ===  item.name && 'bg-[#EAFCFF] font-[500]'} capitalize`}>{item.name}</span> 
                    <span className={`bg-[#F0F2F5]  ${searchFeedSection ===  item.name && 'bg-[#DDFBFF]'} font-[400] text-[12px] py-1 rounded-full px-2`}>{item.count}</span>
                </div>
            ))
          }
          <div className="mt-4">
            {/* <Image src={Verify} alt=""/> */}
          </div>
      </Card>
    </div>
  )
}

export default SectionOne
