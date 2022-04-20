import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    name: "",
    email: "",
    uid: "",
    photo: ""
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserLogin: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.uid = action.payload.uid;
            state.photo = action.payload.photo;
        },
        setSignOut: (state) => {
            state.name = null;
            state.email = null;
            state.uid = null;
            state.photo = null;
        }
    }
})

export const { setUserLogin, setSignOut} = userSlice.actions;
export const selecUserName = (state) => state.user.name;
export const selecUserEmail = (state) => state.user.email;
export const selecUserUid = (state) => state.user.uid;
export const selecUserPhoto = (state) => state.user.photo;

export default userSlice.reducer;