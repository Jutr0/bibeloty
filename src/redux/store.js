import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './reducers/cartSlice';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from "redux-persist";
import {createStateSyncMiddleware} from "redux-state-sync";

const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistReducer(persistConfig, cartReducer);

const stateSyncMiddleware = createStateSyncMiddleware({
    whitelist: ['cart/addProduct', 'cart/removeProduct', 'cart/changeProductQuantity'],
});

export const store = configureStore({
    reducer: {
        cart: persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(stateSyncMiddleware)
});

export const persistor = persistStore(store);
