import IMessage from "../../entities/Message";
import IResponse from "../../entities/Response";
import { TAG_MESSAGE, TAG_MESSAGES, api } from "./api";

export const messagesApi = api.injectEndpoints({
  endpoints:
    builder => ({
      getMessages: builder.query<Array<IMessage>, IGetMessagesRequest>({
        query: (args) => `/messages?cursor=${args.cursor}&limit=10`,
        providesTags: result =>
          result
            ? result.map(({ id }) => ({ type: TAG_MESSAGES, id }))
            : [TAG_MESSAGES],

        serializeQueryArgs: ({ endpointName }) => endpointName,

        merge: (currentCache, newItems) => {
          if (newItems.length === 0) {
            return
          }

          if (currentCache[0].id > newItems[0].id) {
            currentCache.unshift(...newItems);
          } else if (currentCache[0].id < newItems[0].id) {
            currentCache.push(...newItems);
          }
        },

        forceRefetch({ currentArg, previousArg }) {
          if (!currentArg || !previousArg) {
            return false
          }

          return currentArg.cursor !== previousArg.cursor;
        }
      }),

      getMessage: builder.query<IMessage, number>({
        query: (id) => `/messages/${id}`,
        providesTags: [TAG_MESSAGE],

        serializeQueryArgs: ({ endpointName }) => endpointName,
      }),

      createMessage: builder.mutation<IResponse, { text: string, reply_to: number | null }>({
        query: ({ text, reply_to }) => ({
          body: {
            content: text,
            reply_to: reply_to,
          },
          url: "/users/messages",
          method: "POST",
        }),
        invalidatesTags: [TAG_MESSAGES]
      }),

      editMessage: builder.mutation<IResponse, { id: number, text: string }>({
        query: ({ id, text }) => ({
          url: `/users/messages/${id}`,
          body: {
            content: text,
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
        invalidatesTags: (result, error, id) => [
          { type: TAG_MESSAGES, id },
          // { type: TAG_MESSAGE, id: 'PARTIAL-LIST' },
        ]
      }),
    }),
})

export interface IGetMessagesRequest {
  cursor: number
}

export const { useGetMessagesQuery, useGetMessageQuery, useLazyGetMessageQuery, useCreateMessageMutation, useDeleteMessageMutation, useEditMessageMutation } = messagesApi
