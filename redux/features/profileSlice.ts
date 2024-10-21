import { profileSideBarMenuDataNameType } from "@/app/(expertmerge)/profile/modal/ProfileModal";
import { UserProps } from "@/types/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialStateProps {
    userRole: any;
    selectedprofileData: profileSideBarMenuDataNameType;
    user: any;
    joinedForums: any;
    createdForums: any;
    allForums: any;
    selectedForum: any;
    allResources: any;
    searchResults: any;

}

const initialState: initialStateProps = {
  selectedprofileData: 'General',
  user: null,
  joinedForums: null,
  createdForums: null,
  allForums: null,
  selectedForum: null,
  allResources: null,
  searchResults: {},
  userRole: undefined
}

const profileSlice = createSlice({
    name: 'profileSlice',
    initialState,
    reducers: {
      setActiveProfileData: (state,  { payload }: PayloadAction<{ data: profileSideBarMenuDataNameType }>) => {
        state.selectedprofileData = payload.data
      },
      setUserProfile: (state, { payload }: PayloadAction<{ data: UserProps['user'] }>) => {
         state.user = payload.data
      },
      setJoinedForums: (state, {payload}: PayloadAction<{data: any}>) =>{
        state.joinedForums =payload.data
      },
      setCreatedForums: (state, {payload}: PayloadAction<{data: any}>) =>{
        state.createdForums =payload.data
      },
      setAllForums: (state, {payload}: PayloadAction<{data: any}>) =>{
        state.allForums =payload.data
      },
      setSelectedForum: (state, {payload}: PayloadAction<{data: any}>) =>{
        state.selectedForum =payload.data
      },
      setAllResources: (state, {payload}: PayloadAction<{data: any}>) =>{
        state.allResources =payload.data
      },
      setSearch: (state, {payload}: PayloadAction<{data: any}>) =>{
        state.searchResults = payload.data
      },
    } 
})

export const { setActiveProfileData, setUserProfile, setJoinedForums, setCreatedForums, setAllForums, setSelectedForum, setAllResources,  setSearch } = profileSlice.actions
export default profileSlice.reducer