import { createSlice } from "@reduxjs/toolkit";

const SideToggle = createSlice({
  name: "SideBar",
  initialState: { value: false },
  reducers: {
    toggle: (state, action): void => {
      const bool = state.value;
      state.value = !bool;
    },
  },
});

export default SideToggle.reducer;

export const { toggle } = SideToggle.actions;
