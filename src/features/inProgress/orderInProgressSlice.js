import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    ordersInProgress:[]
}

const orderInProgressSlice = createSlice({

    name: "orderInProgress",
    initialState,
    reducers: {
        setOrdersInProgress: (state, action) => {
            state.ordersInProgress = action.payload;
        }
    }

})

export const { setOrdersInProgress } = orderInProgressSlice.actions;

export const selectOrderInProgress = (state) => state.orderInProgress.ordersInProgress;

export default orderInProgressSlice.reducer;