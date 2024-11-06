
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialStateProps {
    user: any;
 
}

const initialState: initialStateProps = {

  user: null,

}

const profileSlice = createSlice({
    name: 'profileSlice',
    initialState,
    reducers: {
     
      setUserProfile: (state, { payload }: PayloadAction<{ data: any }>) => {
         state.user = payload.data
      },
     
   
      },
    } 
)

export const {  setUserProfile, } = profileSlice.actions
export default profileSlice.reducer