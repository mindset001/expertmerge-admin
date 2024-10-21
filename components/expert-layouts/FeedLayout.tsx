import { FC, ReactNode } from "react"

const FeedLayout:FC<{
    feed1?: ReactNode;
    feed2?: ReactNode;
    feed3?: ReactNode;
}> = ({
    feed1,
    feed2,
    feed3
}) => {
  return (
    <div className="flex gap-2">
      <div className="flex-1 overflow-scroll h-[84vh]">{feed1}</div>
      <div className="flex-[2] overflow-scroll h-[84vh]">{feed2}</div>
      <div className="flex-1 overflow-scroll h-[84vh]">{feed3}</div>
    </div>
  )
}

export default FeedLayout
