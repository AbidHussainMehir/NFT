import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    useraddress: null,
    value: [],

  },
  reducers: {
    setUser: (state, action) => {
      state.useraddress = action.payload;
    },
    
    incrementByAmount: (state, action) => {
      state.value = action.payload
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectUserAddress = (state) => state.user.useraddress;
export const {incrementByAmount } = userSlice.actions

export default userSlice.reducer;
