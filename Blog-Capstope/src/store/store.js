import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice';

const store = configureStore({
    reducer:{
        // Reducers
        auth : authSlice,
    }
})
export default store;