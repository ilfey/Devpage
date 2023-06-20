import { configureStore } from '@reduxjs/toolkit'

import { replyActions, replyReducer } from './reducers/reply'
import { api } from './api/api'

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


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch