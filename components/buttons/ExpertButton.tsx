import { BtnProps, ButtonTypes } from "@/types"
import { FC } from "react"
import SolidBtn from "./SolidBtn";
import TextBtn from "./TextBtn";
import MenuBtn from "./MenuBtn";

export interface ExpertButtonProps extends BtnProps {
    variant?: ButtonTypes
}
const ExpertButton: FC<ExpertButtonProps> = ({ variant, ...props }) => {

switch (variant) {
    case 'text':
       return <TextBtn  {...props}/>;
   
    default:
        return <SolidBtn {...props}/>;
}
}

export default ExpertButton
