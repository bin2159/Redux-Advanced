import cartReducer from './cart'
import cartItemReducer from './cartItem';
const { configureStore } = require("@reduxjs/toolkit");

const store=configureStore({reducer:{cart:cartReducer,cartItem:cartItemReducer}})

export default store