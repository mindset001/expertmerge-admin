import { siderBarMenuDataNameType } from "@/app/(expertmerge)/network/NetworkSideBar";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialStateProps {
    selectedNetworkData: siderBarMenuDataNameType;

}

const initialState: initialStateProps = {
    selectedNetworkData: 'Connections'
}

const networkSlice = createSlice({
    name: 'networkSlice',
    initialState,
    reducers: {
      setActiveNetworkData: (state,  { payload }: PayloadAction<{ data: siderBarMenuDataNameType }>) => {
        state.selectedNetworkData = payload.data
      }
    } 
})

export const { setActiveNetworkData } = networkSlice.actions
export default networkSlice.reducer