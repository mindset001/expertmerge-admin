import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialStateProps {
    resource: number;
}

const initialState: initialStateProps = {
    resource: 1,
}

export const resources = createSlice({
    name: 'resources',
    initialState,
    reducers: {
        switchResources: (state, { payload }: PayloadAction<{resource?: number}>) => {
            state.resource = payload.resource ? payload.resource : state.resource +1
        }
    }    
})

export const { switchResources } = resources.actions
export default resources.reducer