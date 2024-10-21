import { SavedFeedProps } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialStateProps {
    savedFeedSection: SavedFeedProps['name'];
}

const initialState: initialStateProps = {
    savedFeedSection: 'all',
}

const savedFeedSlice = createSlice({
    name: 'savedFeedSlice',
    initialState,
    reducers: {
      setActivedFeedSection: (state,  { payload }: PayloadAction<{ saved: SavedFeedProps['name'] }>) => {
        state.savedFeedSection = payload.saved
      }
   
    }
})



export const { setActivedFeedSection } = savedFeedSlice.actions
export default savedFeedSlice.reducer