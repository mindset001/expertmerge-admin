import { BtnProps } from "@/types"
import { Button } from "antd"
import { FC } from "react"
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const SolidBtn: FC<BtnProps> = ({
    text,
    disabled,
    icon,
    loading,
    onClick,
    fullWidth,
    outlined,
    size
}) => {
  return (
        <Button 
        block={fullWidth}  
        type="primary" 
        ghost={outlined}
        className={`bg-[#0A424A] text-white ${inter.className} my-1 overflow-hidden flex justify-center items-center`}
        size={size || "large"} 
        shape="round" 
        icon={icon} 
        disabled={disabled} 
        loading={loading} 
        onClick={onClick}
        >
            { text }
        </Button>
  )
}

export default SolidBtn
