import { ForumSettingsTabTypes } from "@/types/forum";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialStateProps {
    selectedForumSettingsTab: ForumSettingsTabTypes

}

const initialState: initialStateProps = {
    selectedForumSettingsTab: 'Settings'
}

const forumSlice = createSlice({
    name: 'forumSlice',
    initialState,
    reducers: {
      setActiveForumSetting: (state,  { payload }: PayloadAction<{ data: ForumSettingsTabTypes }>) => {
        state.selectedForumSettingsTab = payload.data
      }
    } 
})

export const { setActiveForumSetting } = forumSlice.actions
export default forumSlice.reducer