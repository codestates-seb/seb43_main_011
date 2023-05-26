import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

const isNavOpenSlice = createSlice({
  name: "isNavOpen",
  initialState: { value: false },
  reducers: {
    toggle: (state) => {
      state.value = !state.value;
    },
  },
});

export default isNavOpenSlice.reducer;

export const { toggle } = isNavOpenSlice.actions;
