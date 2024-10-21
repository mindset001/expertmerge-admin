import { notificationSideBarMenuDataNameType } from "@/app/(expertmerge)/notifications/NotificationsSideBar";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialStateProps {
    selectedNotificationData: notificationSideBarMenuDataNameType;

}

const initialState: initialStateProps = {
    selectedNotificationData: 'All'
}

const notificationSlice = createSlice({
    name: 'notificationSlice',
    initialState,
    reducers: {
      setActiveNotificationData: (state,  { payload }: PayloadAction<{ data: notificationSideBarMenuDataNameType }>) => {
        state.selectedNotificationData = payload.data
      }
    } 
})

export const { setActiveNotificationData } = notificationSlice.actions
export default notificationSlice.reducer