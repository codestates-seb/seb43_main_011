import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

const isNavOpenSlice = createSlice({
  name: "isNavOpen",
  initialState: { value: false },
  reducers: {
    toggle: (state) => {
      state.value = !state.value;
    },
    navClose: (state) => {
      state.value = false;
    },
  },
});

export default isNavOpenSlice.reducer;

export const { toggle, navClose } = isNavOpenSlice.actions;
