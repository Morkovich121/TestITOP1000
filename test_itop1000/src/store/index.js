import { configureStore } from '@reduxjs/toolkit';
import exchangeReducer from './exchangeSlice';

export default configureStore({
    reducer: {
        exchange: exchangeReducer
    },
});