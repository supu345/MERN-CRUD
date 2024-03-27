import { createSlice } from "@reduxjs/toolkit";
export const productSlice = createSlice({
  name: "product",
  initialState: {
    Total: [],
    ALLProduct: [],
    DataList: [],
  },
  reducers: {
    SetTotal: (state, action) => {
      state.Total = action.payload;
    },
    SetALLProduct: (state, action) => {
      state.ALLProduct = action.payload;
    },
    SetDataList: (state, action) => {
      state.DataList = action.payload;
    },
  },
});
export const { SetTotal, SetALLProduct, SetDataList } = productSlice.actions;
export default productSlice.reducer;
