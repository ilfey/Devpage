import { Button } from '@shared/ui/Button'
import { TextInput } from '@shared/ui/TextInput'
import { useCallback, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { MathParser, MathParserError } from '../lib/MathParser'

interface Props {
	className?: string
}

export const Calculator = (props: Props) => {
	const { className } = props

	const [expression, setExpression] = useState('')
	const [result, setResult] = useState<number>()
	const [err, setErr] = useState<string>()

	const onEnter = useCallback(() => {
		try {
			const parsedExpression = MathParser.parse(expression)
			setResult(parsedExpression)
			setErr(undefined)
		} catch (e) {
			setResult(undefined)
			setErr((e as MathParserError).string)
		}
	}, [expression])

	return (
		<div className={twMerge('flex flex-col space-y-4', className)}>
			<div className='flex items-end gap-4'>
				<TextInput
					className='grow'
					id='entry'
					title='Введите выражение:'
					placeholder='2 + 2 * 2'
					value={expression}
					onChange={e => setExpression(e.target.value)}
					onKeyUp={e => {
						switch (e.key.toUpperCase()) {
							case 'ENTER':
								onEnter()
								break
							case 'ESCAPE':
								setExpression('')
								break
						}
					}}
				/>
				<Button text='Вычислить' type='button' onClick={onEnter} />
			</div>

			{result !== undefined && (
				<div className='space-y-2'>
					<p className='font-bold text-sm ml-2'>Результат:</p>
					<pre className='bg-gray-50 border-gray-300 dark:bg-gray-700 dark:border-gray-600 border rounded-md p-2'>
						<code>{result}</code>
					</pre>
				</div>
			)}

			{err !== undefined && (
				<div className='space-y-2'>
					<p className='font-bold text-sm ml-2'>Ошибка:</p>
					<pre className='bg-gray-50 border-gray-300 dark:bg-gray-700 dark:border-gray-600 border rounded-md p-2 text-red-500'>
						<code>{err}</code>
					</pre>
				</div>
			)}
		</div>
	)
}
