import { settingsSideBarMenuDataNameType, } from "@/app/(expertmerge)/settings/SettingsSidebar";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialStateProps {
    settingsData: settingsSideBarMenuDataNameType;

}

const initialState: initialStateProps = {
    settingsData: 'Notification Preference'
}


const settingsSlice = createSlice({
  name: 'settingsSlice',
  initialState,
  reducers: {
    setActiveSettingsData: (state,  { payload }: PayloadAction<{ data: settingsSideBarMenuDataNameType}>) => {
      state.settingsData = payload.data
    }
  } 
})
export const { setActiveSettingsData } = settingsSlice.actions
export default settingsSlice.reducer