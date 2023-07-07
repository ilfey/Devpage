import { configureStore } from '@reduxjs/toolkit'

import { replyActions, replyReducer } from './reducers/reply'
import { api } from './api/api'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

export const actions = {
  ...replyActions,
}

export const store = configureStore({
  reducer: {
    reply: replyReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch