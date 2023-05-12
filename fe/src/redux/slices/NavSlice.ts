import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

const isNavOpenSlice = createSlice({
  name: "isNavOpen",
  initialState: { value: false },
  reducers: {
    toogle: (state) => {
      state.value = !state.value;
    },
  },
});

export default isNavOpenSlice.reducer;

export const { toogle } = isNavOpenSlice.actions;
