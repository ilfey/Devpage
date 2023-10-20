import { twMerge } from 'tailwind-merge'

interface Props {
	text: string
	type?: 'button' | 'submit' | 'reset'
	className?: string
	onClick: () => void
}

export const RoundedButton = (props: Props) => {
	const { text, type, className, onClick } = { className: '', ...props }

	return (
		<button
			type={type}
			onClick={onClick}
			className={twMerge(
				'text-white bg-primary-700 hover:bg-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none',
				className
			)}
		>
			{text}
		</button>
	)
}
