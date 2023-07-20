import Navbar from '@widgets/Navbar'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

// import { Autoplay, Pagination } from 'swiper/modules'
// import { Swiper, SwiperSlide } from 'swiper/react'

// import 'swiper/css'

import ImgMashiro from '@public/images/mashiro.png'
import ImgHaruha from '@public/images/haruha.png'

export default function IndexPage() {
	const [isCringe, setIsCringe] = useState(false)

	return (
		<div className='max-w-5xl mx-auto space-y-4'>
			<Head>
				<title>ilfey</title>
				<meta property='og:title' content="ilfey's devpage" />
				<meta property='og:url' content='https://ilfey.ru' />
				<meta property='og:description' content='Страница разработчика - ilfey' />
				<meta name='description' content='Страница разработчика - ilfey' />
				<meta property='og:image' content='/favicons/x256.png' />
			</Head>

			<Navbar />

			<main className='space-y-4'>
				{/* Welcome section */}

				<section className='grid grid-rows-2 sm:grid-rows-1 gap-4 sm:grid-cols-2'>
					{/* Left article */}

					<article
						data-active={isCringe}
						onClick={() => setIsCringe(!isCringe)}
						className='relative overflow-hidden group p-4 flex items-center bg-right-bottom bg-no-repeat bg-gray-100/50 dark:bg-gray-800/50 rounded-xl'
					>
						{/* Close your eyes please */}
						<h1 className='text-xl'>
							<b className='text-2xl tracking-wide uppercase'>
								<span className='transition-colors group-data-active:text-slate-500/50'>При</span>
								<span>к</span>
								<span className='transition-colors group-data-active:text-slate-500/50'>
									ольный
								</span>
							</b>
							<br />
							<span className='text-slate-500/50'>
								<span>раз</span>
								<span className='transition-colors group-data-active:text-black group-data-active:dark:text-white'>
									р
								</span>
								<span>аботч</span>
								<span className='transition-colors group-data-active:text-black group-data-active:dark:text-white'>
									и
								</span>
								<span>к</span>
							</span>
							<i className='transition-colors group-data-active:text-slate-500/50'> аниме</i>
							<br />
							<span className='transition-colors group-data-active:text-slate-500/50'>
								и <i>кода </i>
							</span>
							<span>н</span>
							<span className='transition-colors group-data-active:text-slate-500/50'>а </span>
							<span>ж</span>
							<span className='transition-colors group-data-active:text-slate-500/50'>с</span>
						</h1>

						{/* Can you open your eyes */}

						{/* Background image - Mashiro Shina */}

						<Image
							className='absolute -right-5 bottom-0 w-1/2'
							src={ImgMashiro}
							alt='Маширо Шина'
						/>
					</article>

					{/* Right article */}

					<article className='p-4 relative overflow-hidden bg-right-bottom bg-no-repeat bg-gray-100/50 dark:bg-gray-800/50 rounded-xl'>
						<div className='max-w-xs space-y-3'>
							<h2 className='text-xl font-bold text-center'>Обо мне</h2>
							<p className='indent-2'>
								Стал <b>сеньером hello world'ов</b>, будучи ещё школьником. Достиг не малых высот, и
								стал школьником со стажем (студентом).
							</p>
							<p className='indent-2'>
								Как вы могли заметить, увлекаюсь аниме. На момент написания данного текста,
								просмотрено 614 тайтлов (20.07.23 <b>F</b>)
							</p>
						</div>

						{/* Background image - Haruha Sudzumia */}

						<Image
							className='absolute right-0 bottom-0 w-1/4 sm:w-1/3'
							src={ImgHaruha}
							alt='Харуха судзумия'
						/>
					</article>
				</section>
				{/* <section className=''>
					<h2 className='py-4 text-xl font-bold text-center'>Проекты</h2>

					<Swiper
						modules={[Pagination, Autoplay]}
						spaceBetween={30}
						autoplay={{
							delay: 2500,
							pauseOnMouseEnter: true
						}}
						loop
						pagination={{
							clickable: true,
							type: 'bullets',
							horizontalClass: 'text-center',
							bulletActiveClass: '!bg-primary-600 w-6',
							bulletClass:
								'cursor-pointer transition-all mx-1.5 inline-block w-1.5 h-1.5 rounded bg-black dark:bg-white'
						}}
					>
						<SwiperSlide className='p-4 cursor-grab bg-gray-100/50 dark:bg-gray-800/50 rounded-xl'>
							<Image src='/images/genshin-dark.png' alt='hz' width={170} height={225} />
						</SwiperSlide>
						<SwiperSlide className='p-4 cursor-grab bg-gray-100/50 dark:bg-gray-800/50 rounded-xl'>
							Slide 2
						</SwiperSlide>
					</Swiper>
				</section> */}
			</main>
		</div>
	)
}
