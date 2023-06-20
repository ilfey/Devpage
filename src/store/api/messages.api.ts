import IMessage from "../../types/message";
import IResponse from "../../types/response";
import { TAG_MESSAGES, api } from "./api";

export const messagesApi = api.injectEndpoints({
  endpoints:
    builder => ({
      getMessages: builder.query<Array<IMessage>, void>({
        query: () => "/messages",
        providesTags: [TAG_MESSAGES],

      }),

      createMessage: builder.mutation<IResponse, { text: string, reply_to: number | null }>({
        query: (arg) => ({
          body: {
            content: arg.text,
            reply_to: arg.reply_to,
          },
          url: "/users/messages",
          method: "POST",
        }),
        invalidatesTags: [TAG_MESSAGES]
      }),

      editMessage: builder.mutation<IResponse, { id: number, text: string }>({
        query: (arg) => ({
          url: `/users/messages/${arg.id}`,
          body: {
            content: arg.text,
          },
          method: "PATCH",
        }),
        invalidatesTags: [TAG_MESSAGES]
      }),

      deleteMessage: builder.mutation<IResponse, number>({
        query: (id) => ({
          url: `/users/messages/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: [TAG_MESSAGES]
      }),
    }),
})

export const { useGetMessagesQuery, useCreateMessageMutation, useDeleteMessageMutation, useEditMessageMutation } = messagesApi
