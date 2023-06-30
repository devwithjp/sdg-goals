import { configureStore } from '@reduxjs/toolkit'
import sdgReducer from './sdgSlice'

export const store = configureStore({
  reducer: {
    sdgOpt: sdgReducer,
  },
})