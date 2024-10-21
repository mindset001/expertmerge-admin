import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialStateProps {
    step: number;
    userDetails: {
        email?: string;
        password?: string;
        firstName?: string;
        lastName?: string;
        dob?: string;
        country?: string;
        city?: string;
        recentJobTitle?: string;
        employmentType?: string;
        recentCompany?: string;
        college?: string;
        startYear?: string;
        endYear?: string;
        
    }
}

const initialState: initialStateProps = {
    step: 1,
    userDetails: {}
}

export const onboarding = createSlice({
    name: ' onboarding',
    initialState,
    reducers: {
        increament: (state, { payload }: PayloadAction<{step?: number}>) => {
            state.step = payload.step ? payload.step : state.step +1
        },
        decreament: (state) => {
            state.step = state.step -1
        },
        setUserDetails: (state, { payload }: PayloadAction<{data: initialStateProps['userDetails']}>) => {
            state.userDetails = { ...state.userDetails, ...payload.data }
        }
    }
})

export const { decreament, increament, setUserDetails } = onboarding.actions
export default onboarding.reducer