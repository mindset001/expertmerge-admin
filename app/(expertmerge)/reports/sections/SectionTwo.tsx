"use client"
import { AnimatePresence } from "framer-motion"
import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"

import Reports from "./components/Reports"
import ReportedAccounts from "./components/ReportedAccounts"

const SectionTwo = () => {
    const { searchFeedSection } = useSelector((state: RootState) => state.searchFeedSlice)
  return (
    <AnimatePresence mode="wait">
        { searchFeedSection=== 'reports' && <Reports /> }
        { searchFeedSection === 'reported accounts' && <ReportedAccounts/> }
      
       
    </AnimatePresence>
  )
}

export default SectionTwo
