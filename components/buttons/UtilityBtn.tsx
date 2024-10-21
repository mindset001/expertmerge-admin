import { Button, ButtonProps } from "antd"
import { FC } from "react"

const UtilityBtn: FC<ButtonProps> = ({
    onClick,
    icon,
    title
}) => {
  return (
    <Button
      type="text"
      block
      size="large"
      onClick={onClick}
      icon={icon}
     className="bg-[#F9FAFB] rounded-[12px] h-[87px] mb-4 font-[500] text-[#98A2B3] text-[18px]"
      >{title}</Button>
  )
}

export default UtilityBtn
