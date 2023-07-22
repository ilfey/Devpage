import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import ImgMikuru from '@public/images/mikuru.png'
import ImgYuki from '@public/images/yuki.png'

export default function NotFound() {
	const [mount, setMount] = useState(false)
	const [isOpened, setIsOpened] = useState(false)

	const router = useRouter()

	useEffect(() => {
		// Get from cookie last404 page
		for (const cookie of document.cookie.split(';')) {
			if (!cookie.startsWith('last404=')) {
				continue
			}

			if (cookie.substring(cookie.indexOf('=') + 1) === router.asPath) {
				setIsOpened(true)
			}
		}

		// Set current path in cookie to minute
		document.cookie = `last404=${router.asPath}; max-age=60`
		setMount(true)
	}, [])

	return (
		<div className='max-w-5xl mx-auto space-2'>
			<Head>
				<title>ilfey</title>
				<meta property='og:title' content="ilfey's forum" />
				<meta property='og:url' content='https://ilfey.ru/forum' />
				<meta property='og:description' content='Форум разработчика - ilfey' />
				<meta name='description' content='Форум разработчика - ilfey' />
				<meta property='og:image' content='/favicons/x256.png' />
			</Head>

			<main className='h-screen p-4'>
				<div className='flex flex-wrap items-center justify-center h-full gap-4'>
					<div className='max-w-lg p-4 space-y-4 bg-gray-100/50 dark:bg-gray-800/50 rounded-xl'>
						<div className=''>
							<h1 className='text-center text-slate-500/50'>404 Не найдено</h1>

							<h2
								data-mount={!mount}
								className='mx-auto text-2xl text-center rounded-lg w-fit data-mount:text-white/0 data-mount:bg-white/25 data-mount:animate-pulse'
							>
								{mount ? (
									isOpened ? (
										'Извращенец!'
									) : (
										<>
											Ты ошибся, это кабинет
											<br /> литературного клуба
										</>
									)
								) : (
									'Извращенец!' // For placeholder
								)}
							</h2>
						</div>

						<p
							data-mount={!mount}
							className='text-xl text-center rounded-lg data-mount:text-white/0 data-mount:bg-white/25 data-mount:animate-pulse'
						>
							{mount ? (
								isOpened ? (
									<Link className='underline text-primary-600 underline-offset-4' href='/'>
										Выйди отсюда
									</Link>
								) : (
									<>
										Подожди{' '}
										<Link className='underline text-primary-600 underline-offset-4' href='/'>
											снаружи
										</Link>
										, пока Микурочка надевает платье
									</>
								)
							) : (
								'Выйди отсюда' // For placeholder
							)}
						</p>
					</div>

					{/* Image */}

					<div
						data-mount={!mount}
						className='h-full data-mount:rounded-lg data-mount:bg-white/25 data-mount:animate-pulse'
					>
						<Image
							data-mount={!mount}
							className='object-contain h-full data-mount:opacity-0 w-fit'
							src={isOpened ? ImgYuki : ImgMikuru}
							alt={isOpened ? 'Юки Нагато' : 'Микуру Асахина'}
							sizes='cover'
						/>
					</div>
				</div>
			</main>
		</div>
	)
}
