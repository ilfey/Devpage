import React from 'react'

interface IProps {
  className: string
  type: React.HTMLInputTypeAttribute
  placeholder: string
  autoFocus: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function TextField({ className, type, placeholder, onChange, autoFocus }: IProps) {
  return (
    <input className={`mt-3 rounded-lg px-4 py-3 w-full outline-none border-none bg-gray-200 dark:bg-gray-800 placeholder:text-gray-600 text-sm ${className}`}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      autoFocus={autoFocus}
    />
  )
}

TextField.defaultProps = {
  className: '',
  onChange: undefined,
  autoFocus: false,
}