import { Card } from "antd"
import ConnectCard from "./components/ConnectCard"

const SectionThree = () => {
  return (
    <Card
    >
      <div className="text-[18px] font-[400] text-[#1D2739]">Connect with more professionals</div>
        {[0,1,3,4,5,6,7,8,9,10].map((_, i: number) => (
            <ConnectCard key={i}/>
        ))}
    </Card>
  )
}

export default SectionThree
