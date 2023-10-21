import { Navbar } from '@widgets/Navbar'
import { TextInput } from '@shared/ui/TextInput'
import Head from 'next/head'
import { Button } from '@shared/ui/Button'
import { useState } from 'react'
import { Calculator } from '@widgets/Calculator/ui/Calculator'

export default function IndexPage() {
	return (
		<div className='max-w-5xl mx-auto space-2'>
			<Head>
				<title>ilfey</title>
				<meta property='og:title' content="ilfey's calculator" />
				<meta property='og:url' content='https://ilfey.ru/calculator' />
				<meta property='og:description' content='Калькулятор разработчика - ilfey' />
				<meta name='description' content='Калькулятор разработчика - ilfey' />
				<meta property='og:image' content='/favicons/x256.png' />
			</Head>

			<Navbar />

			<main>
				<section className='space-y-4'>
					<article className='relative p-4 overflow-hidden bg-gray-100/50 dark:bg-gray-800/50 rounded-xl transition-colors'>
						<h2 className='text-xl mb-4'>Операторы</h2>

						<ul className='list-disc ml-4 space-y-2'>
							<li>
								<span className='bg-primary-600 text-white rounded px-2'>+</span> - сложение
							</li>
							<li>
								<span className='bg-primary-600 text-white rounded px-2 w-4'>-</span> - вычитание
							</li>
							<li>
								<span className='bg-primary-600 text-white rounded px-2 w-4'>*</span> - умножение
							</li>
							<li>
								<span className='bg-primary-600 text-white rounded px-2 w-4'>/</span> - деление
							</li>
							<li>
								<span className='bg-primary-600 text-white rounded px-2 w-4'>**</span> - возведние в
								степень <span className='bg-gray-50 dark:bg-gray-700 px-2 rounded'>2**2*2</span> ={' '}
								<span className='bg-gray-50 dark:bg-gray-700 px-2 rounded'>2**4</span> ={' '}
								<span className='bg-gray-50 dark:bg-gray-700 px-2 rounded'>16</span>
							</li>
							<li>
								<span className='bg-primary-600 text-white rounded px-2 w-4'>^</span> - возведние в
								степень c повышенной привелегией{' '}
								<span className='bg-gray-50 dark:bg-gray-700 px-2 rounded'>2^2*2</span> ={' '}
								<span className='bg-gray-50 dark:bg-gray-700 px-2 rounded'>4*2</span> ={' '}
								<span className='bg-gray-50 dark:bg-gray-700 px-2 rounded'>8</span>
							</li>
						</ul>

						<h2 className='text-xl my-4'>Тригонометрические функции</h2>

						<ul className='list-disc ml-4 space-y-2'>
							<li>
								<span className='bg-primary-600 text-white rounded px-2'>sin(x)</span> - синус числа
								или выражения <span className='bg-gray-50 dark:bg-gray-700 px-2 rounded'>x</span>
							</li>
							<li>
								<span className='bg-primary-600 text-white rounded px-2 w-4'>cos(x)</span> - косинус
								числа или выражения{' '}
								<span className='bg-gray-50 dark:bg-gray-700 px-2 rounded'>x</span>
							</li>
							<li>
								<span className='bg-primary-600 text-white rounded px-2'>asin(x)</span> - арксинус
								числа или выражения{' '}
								<span className='bg-gray-50 dark:bg-gray-700 px-2 rounded'>x</span>
							</li>
							<li>
								<span className='bg-primary-600 text-white rounded px-2 w-4'>acos(x)</span> -
								арккосинус числа или выражения{' '}
								<span className='bg-gray-50 dark:bg-gray-700 px-2 rounded'>x</span>
							</li>
						</ul>

						<h2 className='text-xl my-4'>Константы</h2>

						<ul className='list-disc ml-4 space-y-2'>
							<li>
								<span className='bg-primary-600 text-white rounded px-2'>pi</span> - π (пи){' '}
								<span className='bg-gray-50 dark:bg-gray-700 px-2 rounded'>3,1415926535</span>
							</li>
							<li>
								<span className='bg-primary-600 text-white rounded px-2 w-4'>e</span> - E
								(экспонента){' '}
								<span className='bg-gray-50 dark:bg-gray-700 px-2 rounded'>2,7182818284</span>
							</li>
						</ul>
					</article>

					<article>
						<Calculator />
					</article>
				</section>
			</main>
		</div>
	)
}
