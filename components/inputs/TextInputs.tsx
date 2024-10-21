
import { Input } from "antd"
import { FC } from "react"

import { Inter } from "next/font/google";
import { TextInputProps } from "@/types";

const inter = Inter({ subsets: ["latin"] });

const TextInput: FC<TextInputProps> = ({
    label,
    onChange,
    placeholder,
    prefix,
    suffix,
    value,
    fullWidth,
    type,
    variant,
    className,
    wrapperClassName,
    errorMessage,
}) => {
  return (
    <div  className={`${fullWidth ? 'w-full' : 'w-[400px]'} text-left ${wrapperClassName}`}>
        <label className="font-[500] text-[14px]">{label}</label>
        <Input 
         size="large"
         type={type}
         onChange={onChange}
         placeholder={placeholder as string}
         prefix={prefix}
         suffix={suffix}
         value={value}
         variant={variant || "outlined"}
         className={`rounded-[6px] text-[14px] overflow-hidden ${inter.className} ${className}`}
        />
        { errorMessage && <div className="text-[14px] text-red-600">{errorMessage}</div> }
    </div>
  )
}

export default TextInput
