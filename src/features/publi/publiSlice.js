import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    publis:[]
}

const publiSlice = createSlice({

    name: "publi",
    initialState,
    reducers: {
        setPublis: (state, action) => {
            state.publis = action.payload;
        }
    }

})

export const { setPublis } = publiSlice.actions;

export const selectPublis = (state) => state.publi.publis;

export default publiSlice.reducer;