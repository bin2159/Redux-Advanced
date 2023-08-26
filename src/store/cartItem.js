import { createSlice } from "@reduxjs/toolkit";
const initialState = { items: [], totalQuantity: 0 ,changed:false};
const cartItemSlice = createSlice({
  name: "cartItem",
  initialState,
  reducers: {
    replaceData(state,action){
      state.items=action.payload.items
      state.totalQuantity=action.payload.totalQuantity
    },
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }

      state.changed=true
      state.totalQuantity++;
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});



export default cartItemSlice.reducer;
export const cartItemActions = cartItemSlice.actions;
