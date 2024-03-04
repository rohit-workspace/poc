import { createSlice } from "@reduxjs/toolkit";

export const editSlice = createSlice({
  name: "edit",
  initialState: {
    formData: null,
  },
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    clearFormData: (state) => {
      state.formData = null;
    },
  },
});

export const { setFormData, clearFormData } = editSlice.actions;
export const selectFormData = (state: { form: { formData: any } }) =>
  state.form.formData;

export default editSlice.reducer;
