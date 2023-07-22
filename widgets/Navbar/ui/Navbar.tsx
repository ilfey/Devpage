import { CompanyLogo } from '@shared/ui/CompanyLogo'
import ArrowSmallRight from '@shared/ui/icons/ArrowSmallRight.tsx'
import Bars3 from '@shared/ui/icons/Bars3.tsx'
import XMark from '@shared/ui/icons/XMark.tsx'
import { SwitchEntry } from '@shared/ui/Switch/'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { links } from '@widgets/Navbar/lib/links.ts'

interface Props {
	className?: string
}

export default function Navbar({ className }: Props) {
	const [isMounted, setIsMounted] = useState(false)
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	const { theme, setTheme } = useTheme()

	useEffect(() => setIsMounted(true), [])

	return (
		<header data-is-open={mobileMenuOpen} className={twMerge('font-bold group/header', className)}>
			<nav className='flex items-center justify-between py-2 group'>
				<CompanyLogo className='py-2' />

				{/* Center */}

				<div className='hidden space-x-2 lg:block'>
					{links.map(({ name, route }) => (
						<Link
							key={name}
							href={route}
							className='p-2 rounded-md active:text-gray-700 dark:active:text-gray-300'
						>
							{name}
						</Link>
					))}
				</div>

				{/* Right */}

				<div className='hidden lg:block'>
					<button
						type='button'
						aria-label='Войти'
						className='p-2 rounded-md active:text-gray-700 dark:active:text-gray-300'
					>
						Войти
						<span>
							<ArrowSmallRight className='inline stroke-2 h-3.5 w-3.5' />
						</span>
					</button>
				</div>

				{/* Mobile open menu button */}

				<button
					type='button'
					aria-label='Открыть меню'
					className='flex items-center justify-center w-8 h-8 lg:hidden'
					onClick={() => setMobileMenuOpen(true)}
				>
					<Bars3 className='h-6 w-6' />
				</button>

				{/* Popup with menu */}

				<div className='grid-cols-1 grid-rows-[auto,1fr] hidden group-data-is-open/header:grid fixed z-[1000] right-0 top-0 bg-gray-200 dark:bg-gray-900 h-screen w-screen sm:max-w-xs ring-1 ring-gray-500 transition-colors duration-300'>
					{/* Copy mobile header */}

					<div className='p-4'>
						<div className='flex items-center justify-between'>
							<CompanyLogo />

							{/* Mobile close menu button */}

							<button
								type='button'
								aria-label='Закрыть меню'
								className='relative flex items-center justify-center w-8 h-8'
								onClick={() => setMobileMenuOpen(false)}
							>
								<XMark className='h-6 w-6 transition-colors' />
							</button>
						</div>
					</div>

					{/* Content menu */}

					<div className='px-4 overflow-auto'>
						<div className='space-y-2 text-lg'>
							{/* Links */}

							{links.map(({ name, route }) => (
								<Link
									key={name}
									href={route}
									className='block p-2 transition-colors rounded-md active:bg-gray-100/50 dark:active:bg-gray-800/50'
								>
									{name}
								</Link>
							))}

							{/* Divider */}

							<hr className='mx-2 my-2 border-gray-500' />

							{/* Actions */}

							{isMounted && (
								<SwitchEntry
									init={theme === 'dark'}
									text='Темная тема'
									onChange={isActive => setTheme(isActive ? 'dark' : 'light')}
								/>
							)}

							<button
								type='button'
								aria-label='Войти'
								className='w-full p-2 text-left transition-colors rounded-md active:bg-gray-100/50 dark:active:bg-gray-800/50'
							>
								<span>Войти</span>
							</button>
						</div>
					</div>
				</div>
			</nav>
		</header>
	)
}

Navbar.defaultProps = {
	className: ''
} as Props
