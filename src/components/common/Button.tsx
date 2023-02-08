import Link from 'next/link'
import { ReactNode, CSSProperties } from 'react'

type ButtonProps = {
  children?: ReactNode
  onClick?: (params?: any) => void
  disabled?: boolean
  type?: 'submit' | 'reset' | 'button'
  classes?: String
  style?: CSSProperties
  href?: string
}

export const Button = ({
  children,
  onClick,
  disabled = false,
  type = 'button',
  classes = '',
  style
}: ButtonProps) => (
  <button
    type={type}
    disabled={disabled}
    className={`px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed bg-black text-white uppercase rounded-md focus:outline-none text-sm border-2 border-black dark:bg-transparent dark:border-white dark:border-2 dark:hover:bg-white dark:hover:text-black ${classes}`}
    onClick={onClick}
    style={style}
  >
    {children || 'BUTTON DEFAULT'}
  </button>
)

interface LinkAsButtonProps {
  children?: ReactNode
  classes?: string
  to: string
  style?: CSSProperties
}

export const LinkAsButton = ({
  children,
  classes = '',
  to,
  style
}: LinkAsButtonProps) => (
  <Link
    href={to}
    className={`px-4 py-2 inline-block disabled:opacity-50 disabled:cursor-not-allowed bg-black text-white uppercase rounded-md focus:outline-none text-center text-sm border-2 border-black dark:bg-transparent dark:border-white dark:border-2 dark:hover:bg-white dark:hover:text-black ${classes}`}
    style={style}
  >
    {children || 'LINK DEFAULT'}
  </Link>
)
