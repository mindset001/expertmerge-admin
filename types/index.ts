import { ExpertButtonProps } from "@/components/buttons/ExpertButton";
import { ReactNode } from "react";

export interface BtnProps {
    loading?: boolean;
    icon?: ReactNode;
    disabled?: boolean;
    text?: string | ReactNode;
    onClick?: (event?: any) => void;
    fullWidth?: boolean;
    outlined?: boolean;
    size?: 'large' | 'middle' | 'small';
}

export type ButtonTypes = | 'solid' | 'text' | 'menu';

export interface TextInputProps {
   placeholder?: string | ReactNode;
   prefix?: ReactNode;
   onChange?: (event?: any) => void;
   value?: string;
   suffix?: ReactNode;
   label?: string | ReactNode;
   fullWidth?: boolean;
   type?: 'text' | 'password'
   variant?: "outlined" | "borderless" | "filled"
   className?: string;
   wrapperClassName?: string;
   errorMessage?: string
}
export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export type IconNameTypes = 
| 'expert-merge'
| 'cog'
| 'microphone'
| 'mail-read'
| 'rendered-component'
| 'trend-arrow-down'
| 'forum-repost'
| 'forum-chat'
| 'trend-arrow'
| 'edit'
| 'warning'
| 'pdf'
| 'people'
| 'logo' 
| 'home' 
| 'arrow-left' 
| 'arrow-right' 
| 'verified'
| 'chat'
| 'person'
| 'bell'
| 'more'
| 'team'
| 'blue-check'
| 'arrow-down'
| 'media'
| 'event'
| 'poll'
| 'article'
| 'dots'
| 'comment'
| 'repost'
| 'heart'
| 'share'
| 'save'
| 'metrics'
| 'forum'
| 'group'
| 'help'
| 'settings'
| 'resources'
| 'drop-file'
| 'arrow-up'
| 'log-out'
| 'copy'
| 'download'
| 'delete'
| 'empty-state'
| 'cancel'
| 'eyeslash'
| 'crossbell'

export interface ModalProps {
    open?: boolean;
    onClose?: (event?: any) => void;
    content?: ReactNode
}

export interface NavBarMenuListProps { 
    text?: string; 
    // icon: IconNameTypes;
    route?:| 'dashboard' | 'reports' | 'content' | 'data' | 'accounts' | 'verification' | 'signup' | 'notification' | 'settings' | 'help' | 'forum' | 'group' | 'professionals';
    onClick?: (event?: any) => void;
    className?: string;
    options?: { label: string; value: string; route: string }[]; 
    count?: number
}


export interface NavBarMenuList { 
 
  // icon: IconNameTypes;
  route?: | 'feed' | 'messages' | 'network' | 'notifications' | 'profile' | 'saved-posts' | 'resources' | 'settings' | 'help' | 'forum' | 'group' ;
  onClick?: (event?: any) => void;
  className?: string;
  count?: number
}

export interface FileDropProps {
    name: string;
    label?: string | ReactNode;
    onFileDrop: (e?: any) => void;
    icon?: IconNameTypes;
    desc?: ReactNode;
    errorMessage?: ReactNode;
    value?: any
  
  }

  export interface SearchFeedProps {
    name: 'reports' | 'reported accounts' ;
    count?: number
  }
  
  export interface ProfileModalActionBtnProps {
    text: string
    onClick?: (e?: any) => void;
    loading?: boolean;
    expertBtn?: ExpertButtonProps
}