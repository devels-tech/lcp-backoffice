
import { IIconsBasicProps } from 'lib/types'

export const DarkThemeIcon = ({ classes, fillColor = 'gray', intensityColor = '600' }: IIconsBasicProps) => (
  <svg
    aria-hidden='true'
    className={`flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${classes} fill-${fillColor}-${intensityColor}`}
    fill='currentColor'
    viewBox='0 0 20 20'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
  </svg>
)
