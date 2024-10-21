import { SearchFeedProps } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialStateProps {
    searchFeedSection: SearchFeedProps['name']
}

const initialState: initialStateProps = {

    searchFeedSection: 'reports'
}



const searchFeedSlice = createSlice({
  name: 'searchFeedSlice',
  initialState,
  reducers: {
    
    setActivedSearchSection: (state,  { payload }: PayloadAction<{ search: SearchFeedProps['name'] }>) => {
      state.searchFeedSection = payload.search
    }
  }
})


export const { setActivedSearchSection } = searchFeedSlice.actions
export default searchFeedSlice.reducer