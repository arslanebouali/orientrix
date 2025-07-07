import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';
import onboardingSlice from './slices/onboardingSlice';
import accessSlice from './slices/accessSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    onboarding: onboardingSlice,
    access: accessSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;