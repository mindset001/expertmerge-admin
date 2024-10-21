import { GroupMediaFeedProps } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialStateProps {
  GroupMediaFeedSection: GroupMediaFeedProps['name']
}

const initialState: initialStateProps = {

    GroupMediaFeedSection: 'media'
}



const GroupMediaFeedSlice = createSlice({
  name: 'GroupMediaFeedSlice',
  initialState,
  reducers: {
    
    setGroupMediaSection: (state,  { payload }: PayloadAction<{ search: GroupMediaFeedProps['name'] }>) => {
      state.GroupMediaFeedSection = payload.search
    }
  }
})


export const { setGroupMediaSection } = GroupMediaFeedSlice.actions
export default GroupMediaFeedSlice.reducer