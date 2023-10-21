import { ChangeEventHandler, HTMLInputTypeAttribute, KeyboardEventHandler } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
	id: string
	title: string
	placeholder?: string
	type?: HTMLInputTypeAttribute
	required?: boolean
	className?: string
	value?: string | number | readonly string[]
	onChange?: ChangeEventHandler<HTMLInputElement>
	onKeyDown?: KeyboardEventHandler<HTMLInputElement>
	onKeyUp?: KeyboardEventHandler<HTMLInputElement>
	disabled?: boolean
}

export const TextInput = (props: Props) => {
	const {
		id,
		title,
		placeholder,
		type,
		required,
		className,
		value,
		onChange,
		disabled,
		onKeyDown,
		onKeyUp
	} = props

	return (
		<div className={twMerge('space-y-2', className)}>
			<label htmlFor={id} className='block ml-2 text-sm font-bold text-gray-900 dark:text-white'>
				{title}
			</label>
			<input
				type={type}
				id={id}
				className='transition-colors duration-200 bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none'
				placeholder={placeholder}
				required={required}
				value={value}
				onKeyDown={onKeyDown}
				onKeyUp={onKeyUp}
				onChange={onChange}
				disabled={disabled}
			/>
		</div>
	)
}
