import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : { cartItems: [] };
const addDecimal = (num) => {
  return num.toFixed(2);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((x) => x._id == item._id);
      if (existingItem) {
        state.cartItems = state.cartItems.map((x) => {
        return  x._id == existingItem._id ? item : x;
        });
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      //calculate Item Price
      state.itemsPrice = addDecimal(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

      //calculate the shipping price if the item greaterthan 100 shipping charge is free else shipping charge is 10
      state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 100);

      // calculating tax price tax is 15% if the item price
      state.taxPrice = addDecimal(state.itemsPrice * 0.15);

      //calculating total price
      state.totalPrice = state.itemsPrice + state.shippingPrice + state.taxPrice

      localStorage.setItem("cart", JSON.stringify(state));
    },
    deleteCart:(state,action)=>{
    
      
      console.log("id",action.payload);
      console.log("initial state",initialState);
      console.log("cartItems",state.cartItems);
      
      
      const item=action.payload
      console.log(typeof item);
      
      
      state.cartItems=state.cartItems.filter((x)=>{
       return x._id !== item
    })
      
      console.log(state.cartItems);
      
      
       
      
      state.itemsPrice=state.cartItems.reduce((acc,item)=>acc+item.price*item,0)
      state.shippingPrice=addDecimal((state.itemsPrice>100?0:100))
      state.taxPrice=addDecimal((state.itemsPrice*0.15))
      state.totalPrice=state.itemsPrice+state.shippingPrice+state.taxPrice
      localStorage.clear()
      
      localStorage.setItem("cart", JSON.stringify(state));
      
    }
  },
});

export const cartSliceReducer = cartSlice.reducer;
export const {addCart,deleteCart}=cartSlice.actions
