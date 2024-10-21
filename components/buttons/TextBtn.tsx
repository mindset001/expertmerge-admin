import { BtnProps } from "@/types"
import { Button } from "antd"
import { FC } from "react"
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const TextBtn: FC<BtnProps> = ({
    text,
    disabled,
    icon,
    loading,
    onClick,
    fullWidth
}) => {
  return (
        <Button 
        block={fullWidth}  
        type="text"
        className={`text-[#0A424A] ${inter.className}`} 
        size="large" 
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

export default TextBtn
