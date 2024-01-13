import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { backendApi } from './Apislice'
import authslice from './authslice'

export const store = configureStore({
  reducer: {
    [backendApi.reducerPath]: backendApi.reducer,
    auth:authslice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(backendApi.middleware),
})

setupListeners(store.dispatch)