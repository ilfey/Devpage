import Message from "../features/Message/Message";
import { useState } from "react";
// import Section from "../shared/Section";
import Spinner from "../shared/Spinner";
import InlineSVG from "react-inlinesvg/esm";
import { Error } from "../Icons";
import TextButton from "../shared/Buttons/TextButton";
import { IGetMessagesRequest, useGetMessagesQuery } from "../store/api/messages.api";
import ActionButton from "../shared/Buttons/ActionButton";


export default function Comments() {
  const [displayError, setDisplayError] = useState(false)
  const [args, setArgs] = useState<IGetMessagesRequest>({
    cursor: 0
  })

  const { isLoading, isSuccess, isFetching, isError, data, error, status, refetch } = useGetMessagesQuery(args)

  let body

  if (isLoading) {
    body = (
      <Spinner className="mx-auto" />
    )
  }

  if (isError) {
    body = (
      <div className="flex flex-col items-center gap-4">
        <div className="flex justify-center items-center text-red-600">
          <InlineSVG className="w-8 h-8 " src={Error} />
          <span className="">Не удалось загрузить комментарии</span>
        </div>

        {!displayError ?
          <TextButton className=""
            onClick={() => setDisplayError(true)}
            text="Показать ошибку"
          />
          :
          <p className="whitespace-pre text-center">{status} - {error.toString()}</p>
        }

        <ActionButton className=""
          text="Попробовать снова"
          onClick={() => refetch()}
        />
      </div>
    )
  }

  if (isSuccess) {
    if (data.length !== 0) { // if messages not empty
      const reversedData = [...data].reverse();

      body = (
        <>
          <div className="flex flex-col gap-4">
            {reversedData.map(msg =>
              <Message
                key={msg.id} msg={msg}
              />
            )}
          </div>
          <div className='h-16 mb-4 flex justify-center items-center'>
            {isFetching ?
              <Spinner /> :
              <ActionButton
                onClick={() => setArgs({
                  ...args,
                  ...{
                    cursor: data[0].id
                  }
                })}
                className="mt-4"
                text='Загрузить предыдущие'
              />
            }
          </div>
        </>
      )
    } else { // if messages is empty
      body = (
        <p className="text-center">Комментариев пока нет, станьте первым!</p>
      )
    }
  }

  return (<>{body}</>)
}