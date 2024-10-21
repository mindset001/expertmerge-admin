import { profileSideBarMenuDataNameType } from "@/app/(expertmerge)/profile/modal/ProfileModal";
import { UserProps } from "@/types/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface initialStateProps {
    messagee: any;
   
}

const initialState: initialStateProps = {
 messagee: null,
  
}


const chatSlice = createSlice({
    name: 'profileSlice',
    initialState,
    reducers: {
     
      setMessage: (state, {payload}: PayloadAction<{data: any}>) =>{
        state.messagee =payload.data
      },
    
    
    } 
})

export const { setMessage,  } = chatSlice.actions
export default chatSlice.reducer