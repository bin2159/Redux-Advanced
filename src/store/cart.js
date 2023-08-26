import { createSlice } from "@reduxjs/toolkit";

const initialState = { showCart: false, notification: null };
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setShowCart(state) {
      state.showCart = !state.showCart;
    },
    setNotification(state, action) {
      const data = action.payload;
      console.log(data)
      state.notification = {
       ...data
      };
    },
  },
});
export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
