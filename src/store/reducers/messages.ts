import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import IMessage from '../../types/message'

export interface IMessagesState {
  value: Array<IMessage> | null
}

const initialState: IMessagesState = {
  value: [],
}

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    updateMessages: (state, { payload }: PayloadAction<Array<IMessage>>) => {
      state.value = payload
    },

    removeMessageById: (state, { payload }: PayloadAction<number>) => {
      state.value?.splice(payload, 1)
    },

    pushMessage: (state, { payload }: PayloadAction<IMessage>) => {
      state.value?.push(payload)
    },
  },
})


export const { actions: messagesActions, reducer: messagesReducer } = messagesSlice