import { configureStore } from '@reduxjs/toolkit';
import { reducer as authReducer } from '../slices/authSlice';
import { reducer as aiReducer } from '../slices/aiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ai: aiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
