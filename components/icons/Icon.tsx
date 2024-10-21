import { IconNameTypes } from "@/types"
import { FC, ReactNode } from "react"
import Home from "./Home";
import Logo from "./Logo";
import ArrowLeft from "./ArrowLeft";
import ArrowRight from "./ArrowRight";
import Verified from "./Verified";
import Bell from "./Bell";
import Chat from "./Chat";
import Person from "./Person";
import Team from "./Team";
import More from "./More";
import BlueCheck from "./BlueCheck";
import ArrowDown from "./ArrowDown";
import People from "./People";
import Media from "./Media";
import Event from "./Event";
import Poll from "./Poll";
import Article from "./Article";
import Dots from "./Dots";
import Comment from "./Comment";
import Repost from "./Repost";
import Heart from "./Heart";
import Metrics from "./Metrics";
import Share from "./Share";
import Save from "./Save";
import Forum from "./Forum";
import Group from "./Group";
import Help from "./Help";
import Resources from "./Resources";
import Settings from "./Settings";
import PDF from "./PDF";
import DropFile from "./DropFile";
import Warning from "./Warning";
import Edit from "./Edit";
import ForumChatIcon from "./ForumChatIcon";
import ForumRepostIcon from "./ForumRepostIcon";
import TrendArrow from "./TrendArrow";
import TrendArrowDown from "./TrendArrowDown";
import MailRead from "./MailRead";
import Microphone from "./Microphone";
import Cog from "./Cog";
import ExpertMergeIcon from "./ExpertMergeIcon";
import ArrowUp from "./ArrowUp";
import Logout from "./Logout";
import Copy from "./copy";
import Download from "./download";
import Delete from "./delete";
import EmptyState from "./EmptyState";
import Cancel from "./cancel";
import EyeSlash from "./EyeSlash";
import CrossBell from "./CrossBell";

const Icon: FC<{ name: IconNameTypes, color?: string, fill?: string, renderedComponent?: ReactNode }> = ({
    name,
    color,
    renderedComponent
}) => {
    switch (name) {
        case 'logo':
            return <ExpertMergeIcon />;
        case 'arrow-up':
            return <ArrowUp />;
        case 'cog':
            return <Cog />;
        case 'empty-state':
            return <EmptyState />;
        case 'microphone':
            return <Microphone />;
        case 'home':
            return <Home color={color} />;
        case 'mail-read':
            return <MailRead />;
        case 'arrow-left':
            return <ArrowLeft />;
        case 'arrow-right':
            return <ArrowRight />;
        case 'log-out':
            return <Logout />
        case 'verified':
            return <Verified />;
        case 'eyeslash':
            return <EyeSlash />;
        case 'crossbell':
            return <CrossBell />;
        case 'cancel':
            return <Cancel />;
        case 'bell':
            return <Bell color={color} />;
        case 'chat':
            return <Chat color={color} />;
        case 'person':
            return <Person color={color} />;
        case 'team':
            return <Team color={color} />;
        case 'more':
            return <More color={color} />;
        case 'blue-check':
            return <BlueCheck />;
        case 'arrow-down':
            return <ArrowDown />;
        case 'people':
            return <People />;
        case 'media':
            return <Media />;
        case 'event':
            return <Event />;
        case 'poll':
            return <Poll />;
        case 'article':
            return <Article />;
        case 'dots':
            return <Dots />;
        case 'comment':
            return <Comment />;
        case 'repost':
            return <Repost />;
        case 'heart':
            return <Heart color={color} />;
        case 'metrics':
            return <Metrics />;
        case 'share':
            return <Share />;
        case 'save':
            return <Save color={color} />;
        case 'forum':
            return <Forum />;
        case 'group':
            return <Group />;
        case 'help':
            return <Help />;
        case 'resources':
            return <Resources />;
        case 'settings':
            return <Settings />;
        case 'pdf':
            return <PDF />;
        case 'drop-file':
            return <DropFile />;
        case 'warning':
            return <Warning color={color} />;
        case 'edit':
            return <Edit />;
        case 'forum-chat':
            return <ForumChatIcon />;
        case 'forum-repost':
            return <ForumRepostIcon />;
        case 'trend-arrow':
            return <TrendArrow />;
        case 'trend-arrow-down':
            return <TrendArrowDown />;
        case 'copy':
            return <Copy />;
        case 'download':
            return <Download />;
        case 'delete':
            return <Delete />;
        case 'rendered-component':
            return renderedComponent
        case 'expert-merge':
            return <Logo />   
        // default:
        //     return <Logo />;
    }
}

export default Icon
