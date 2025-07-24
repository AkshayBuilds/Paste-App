import { configureStore } from '@reduxjs/toolkit'
import { PasteSlice } from './Redux/PasteSlice'

export const store = configureStore({
  reducer: {
    paste: PasteSlice.reducer,
  },
});