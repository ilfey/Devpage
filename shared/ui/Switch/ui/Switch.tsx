import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
	init: boolean
	className: string
	onChange: (isActive: boolean) => void
}

export function Switch({ init, className, onChange }: Props) {
	const [isActive, setIsActive] = useState(init)

	useEffect(() => {
		onChange(isActive)
	}, [isActive])

	const handleSwitch = () => setIsActive(!isActive)

	return (
		<button
			type='button'
			data-active={isActive}
			className={twMerge(
				'group/switch h-6 transition-colors border-2 border-primary-600 rounded-full w-11 data-active:bg-primary-600',
				className
			)}
			onClick={handleSwitch}
		>
			<div className='relative z-10 bg-white w-5 h-5 rounded-full transition-[left] duration-200 left-0 group-data-active/switch:left-5' />
		</button>
	)
}

Switch.defaultProps = {
	init: false,
	className: ''
} as Props
