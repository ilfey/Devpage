import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
	init: boolean
	text: string
	className?: string
	onChange: (isActive: boolean) => void
}

export const SwitchEntry = ({ init, text, className, onChange }: Props) => {
	const [isActive, setIsActive] = useState(init)

	useEffect(() => {
		onChange(isActive)
	}, [isActive])

	const handleSwitch = () => setIsActive(!isActive)

	return (
		<div
			className={twMerge('flex justify-between p-2 px-2 transition-colors rounded-md', className)}
			onClick={handleSwitch}
		>
			<span className='cursor-pointer select-none'>{text}</span>
			<button
				type='button'
				data-active={isActive}
				className='h-6 transition-colors border-2 border-primary-600 rounded-full group/switch w-11 data-active:bg-primary-600'
				onClick={handleSwitch}
			>
				<div className='relative z-10 bg-white w-5 h-5 rounded-full transition-[left] duration-200 left-0 group-data-active/switch:left-5' />
			</button>
		</div>
	)
}

SwitchEntry.defaultProps = {
	init: false,
	className: ''
} as Props
