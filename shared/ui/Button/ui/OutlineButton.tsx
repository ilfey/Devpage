import { twMerge } from 'tailwind-merge'

interface Props {
	text: string
	type?: 'button' | 'submit' | 'reset'
	className?: string
	onClick: () => void
}

export const OutlineButton = (props: Props) => {
	const { text, type, className, onClick } = { className: '', ...props }

	return (
		<button
			type={type}
			onClick={onClick}
			className={twMerge(
				'text-primary-700 hover:text-white border border-primary-700 hover:bg-primary-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-primary-500 dark:text-primary-500 dark:hover:text-white dark:hover:bg-primary-500',
				className
			)}
		>
			{text}
		</button>
	)
}
