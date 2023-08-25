import { createSlice } from "@reduxjs/toolkit";

const initialState={showCart:false}
const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        setShowCart(state){
            state.showCart=!state.showCart
        }
    }
})
export default cartSlice.reducer
export const cartActions=cartSlice.actions