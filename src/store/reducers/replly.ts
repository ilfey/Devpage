import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import IMessage from '../../types/message'

export interface IReplyState {
  value: IMessage | null
}

const initialState: IReplyState = {
  value: null,
}

export const replySlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setReplying: (state, { payload }: PayloadAction<IMessage>) => {
      state.value = payload
    },

    removeReplying: (state) => {
      state.value = null
    },
  },
})


export const { actions: replyActions, reducer: replyReducer } = replySlice