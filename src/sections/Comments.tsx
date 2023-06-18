import Message from "../components/Message";
import { useState } from "react";
import Section from "../components/Section";
import Spinner from "../components/Spinner";
import InlineSVG from "react-inlinesvg/esm";
import { Error } from "../Icons";

import TextButton from "../components/buttons/TextButton";
import { useGetMessagesQuery } from "../store/api/messages.api";


export default function Comments() {
  const { isLoading, isSuccess, isError, data, error, status } = useGetMessagesQuery()

  const [displayError, setDisplayError] = useState(false)

  return (
    <Section
      id="comments"
      title="Комментарии"
    >
      {isLoading &&
        <Spinner className="mx-auto" />
      }
      {isError &&
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

          {/* <ActionButton className=""
            content="Попробовать снова"
            onClick={() => refetch()}
          /> */}
        </div>
      }
      {isSuccess && data.length !== 0 &&
        <div className="flex flex-col gap-4">
          {data.map(msg =>
            <Message
              key={msg.id} msg={msg}
            />
          )}
        </div>
      }
      {isSuccess && data.length === 0 &&
        <p className="text-center">Комментариев пока нет, станьте первым!</p>
      }
    </Section>
  )
}