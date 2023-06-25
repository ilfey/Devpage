import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom'
import TextButton from '../shared/Buttons/TextButton'

export default function ErrorPage() {
  const error = useRouteError() as any

  let msg = "Тут ка"
  let status = null

  if (isRouteErrorResponse(error)) {

    switch (error.status) {
      case 404: // not found
        status = 404
        msg = "Брат, ты потерялся, тут ничего нет."
        break;

      case 401: // unauthorized
        status = 401
        msg = "Сядим на корты, перейдем на ты." // Братишка, постой—ка. Ты откуда такой красивый идешь?
        break;
    }
  }

  return (
    <main className='flex-auto flex flex-col justify-center items-center min-h-full'>

      <h2 className='text-red-600 my-4 text-2xl text-center'>Опана, {status ?? "я хз"}</h2>
      <h3 className=' text-xl text-center'>
        {msg}
      </h3>
      { 'message' in error &&
        <p>{error.message ?? ""}</p>
      }
      
      <Link className='my-4' to={'/'}>
        <TextButton text={'Валим отсюда, пацаны. Здесь ваще голимо.'} />
      </Link>
      
    </main>
  )
}

