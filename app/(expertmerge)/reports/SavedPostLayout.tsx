import { FC, ReactNode } from "react"

const SavedPostLayout:FC<{
    feed1?: ReactNode;
    feed2?: ReactNode;
 
}> = ({
    feed1,
    feed2,

}) => {
  return (
    <div className="flex gap-2">
    {/* Feed 1 - Custom scrollbar hiding */}
    <div className="flex-1 h-[84vh] overflow-auto scrollbar-hide">{feed1}</div>
  
    {/* Feed 2 - Custom scrollbar hiding */}
    <div className="flex-[3.5] h-[84vh] overflow-auto scrollbar-hide">{feed2}</div>
  </div>
  
  )
}

export default SavedPostLayout
