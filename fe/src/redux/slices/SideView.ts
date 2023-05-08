import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

const SideView = createSlice({
  name: "SideBar",
  initialState: { value: false },
  reducers: {
    isOpen: (state) => {
      state.value = true;
    },
    isClose: (state) => {
      state.value = false;
    },
  },
});

export default SideView.reducer;

export const { isClose, isOpen } = SideView.actions;
