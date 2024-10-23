"use client"
import { FC, ReactNode, useEffect } from "react"
import NavBar from "./NavBar"
import { useRouter } from "next/navigation"
// import { getUserInfo } from "../api/services/endpoints/profile"


const ExpertMergeLayout: FC<{children: ReactNode}> =  ({
    children
}) => {
 const navigation = useRouter()
//  const token = localStorage.getItem("token")
 useEffect(() => {
  // getUserInfo()
 }, [])
//  if(!token) {
//   navigation.replace("/")
//   return null
//  }

  return (
    <div className="bg-slate-100">
       <NavBar />
      <div className="px-[50px] pb-3 bg-slate-100 pt-8  ">
      { children }
      </div>
    </div>
  )
}

export default ExpertMergeLayout
