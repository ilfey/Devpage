import { useState } from 'react'
import InlineSVG from 'react-inlinesvg'
import TextButton from '../../shared/Buttons/TextButton'
import { Error } from '../../Icons'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError, QueryStatus } from '@reduxjs/toolkit/dist/query'

interface IProps {
  status: QueryStatus.rejected
  error: FetchBaseQueryError | SerializedError
}

export default function MessageError({ status, error }: IProps) {

  const [isErrorDisplay, setIsErrorDisplay] = useState(false)

  let errorDisplay

  if (isErrorDisplay) {
    errorDisplay = (
      <p className="whitespace-pre text-center">
        {status} - {'message' in error ? error.message : 'unknown'}
      </p>
    )
  } else {
    errorDisplay = (
      <TextButton className=""
        onClick={() => setIsErrorDisplay(true)}
        text="Показать ошибку"
      />
    )
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-center items-center text-red-600">
        <InlineSVG className="w-8 h-8 " src={Error} />
        <span className="">Не удалось выполнить действие</span>
      </div>

      {errorDisplay}

    </div>
  )
}
