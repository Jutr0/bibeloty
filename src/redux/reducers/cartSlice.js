import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    products: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const product = state.products.find(p => p.id === action.payload.id && p.selectedSize === action.payload.selectedSize)
            if (product) {
                product.quantity += action.payload.quantity || 1;
            } else {
                state.products.push({...action.payload, quantity: action.payload.quantity || 1})
            }

            return state;
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter(p => p.id !== action.payload)
            return state;
        }
    },
});

export const {addProduct, removeProduct} = cartSlice.actions;
export default cartSlice.reducer;