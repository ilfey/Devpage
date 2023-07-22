import Link from 'next/link'
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
	className?: string
}

export default function CompanyLogo({ className }: Props) {
	return (
		<Link href='/' className={twMerge('flex items-center gap-2', className)}>
			<svg
				width={32}
				height={32}
				viewBox='0 0 64 64'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M61.0133 32C61.0133 48.0236 48.0236 61.0133 32 61.0133C15.9764 61.0133 2.98667 48.0236 2.98667 32C2.98667 15.9764 15.9764 2.98667 32 2.98667C48.0236 2.98667 61.0133 15.9764 61.0133 32Z'
					fill='#0D1117'
				/>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M32 64C49.6731 64 64 49.6731 64 32C64 14.3269 49.6731 0 32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64ZM32 61.0133C48.0236 61.0133 61.0133 48.0236 61.0133 32C61.0133 15.9764 48.0236 2.98667 32 2.98667C15.9764 2.98667 2.98667 15.9764 2.98667 32C2.98667 48.0236 15.9764 61.0133 32 61.0133Z'
					fill='#F50057'
				/>
				<path
					d='M27.1672 22.7573C26.9751 22.422 26.4916 22.422 26.2995 22.7573L15.4289 41.7314C15.2379 42.0648 15.4785 42.48 15.8627 42.48H37.604C37.9881 42.48 38.2288 42.0648 38.0378 41.7314L27.1672 22.7573Z'
					stroke='white'
					strokeWidth='3'
				/>
				<path
					d='M37.8338 22.7573C37.6418 22.422 37.1582 22.422 36.9662 22.7573L26.0955 41.7314C25.9046 42.0648 26.1452 42.48 26.5294 42.48H48.2706C48.6548 42.48 48.8954 42.0648 48.7045 41.7314L37.8338 22.7573Z'
					stroke='white'
					strokeWidth='3'
				/>
			</svg>

			<span className='text-xl transition-colors'>ilfey</span>
		</Link>
	)
}

CompanyLogo.defaultProps = {
	className: ''
} as Props
