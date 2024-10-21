import { ChatFeedProps, SearchFeedProps } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialStateProps {
    chatFeedSection: ChatFeedProps['name']
}

const initialState: initialStateProps = {

    chatFeedSection: 'focused'
}



const chatFeedSlice = createSlice({
  name: 'chatFeedSlice',
  initialState,
  reducers: {
    
    setActivedChatSection: (state,  { payload }: PayloadAction<{ chat: ChatFeedProps['name'] }>) => {
      state.chatFeedSection = payload.chat
    }
  }
})


export const { setActivedChatSection } = chatFeedSlice.actions
export default chatFeedSlice.reducer