import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    messages:[]
}

const requestSlice = createSlice({

    name: "request",
    initialState,
    reducers: {
        setRequests: (state, action) => {
            state.requests = action.payload;
        }
    }

})

export const { setRequests } = requestSlice.actions;

export const selectRequests = (state) => state.request.requests;

export default requestSlice.reducer;