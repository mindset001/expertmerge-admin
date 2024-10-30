"use client"
import { AnimatePresence } from "framer-motion"
import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"
import Verification from "./components/Verification"




const SectionTwo = () => {
    const { searchFeedSection } = useSelector((state: RootState) => state.searchFeedSlice)
  return (
    <AnimatePresence mode="wait">
      
        <Verification/>
         
    </AnimatePresence>
  )
}

export default SectionTwo
