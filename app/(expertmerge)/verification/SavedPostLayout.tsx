import { FC, ReactNode } from "react"

const SavedPostLayout:FC<{
    feed1?: ReactNode;
    feed2?: ReactNode;
 
}> = ({
    feed1,
    feed2,

}) => {
  return (
    <div className="flex gap-2  border-2 rounded-lg">
   
 
    <div className="flex-[3.5] h-[84vh] overflow-auto scrollbar-hide">{feed2}</div>
  </div>
  
  )
}

export default SavedPostLayout
