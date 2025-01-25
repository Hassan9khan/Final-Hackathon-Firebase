import { createSlice } from '@reduxjs/toolkit';

 const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    itemsProduct: [],
  },
  reducers: {
    addItems: (state, action) => {
  state.itemsProduct.push(action.payload)
    },
  },
});
export const { addItems } = todoSlice.actions; 
export default todoSlice.reducer;
