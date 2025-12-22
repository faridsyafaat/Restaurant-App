import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    count: 0,
};
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state) {
            state.count += 1;
        },
        clearCart(state) {
            state.count = 0;
        },
    },
});
export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
