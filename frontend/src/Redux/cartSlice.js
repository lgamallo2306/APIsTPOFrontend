import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    cartItems:[],
    totalQuantity:0,
    totalAmount: 0
};

export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers: {
        addToCart : (state, action) =>{
            const newItem = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === newItem.id)

            if(!existingItem) {
                state.cartItems.push({
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    image: newItem.image,
                    quantity: 1,
                    totalPrice: newItem.price

            });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;

            }
            state.totalQuantity++;
            state.totalAmount += newItem.price;
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === id);

            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.totalAmount -= existingItem.totalPrice;
                state.cartItems = state.cartItems.filter((item) => item.id !== id);
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        },
    }
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;