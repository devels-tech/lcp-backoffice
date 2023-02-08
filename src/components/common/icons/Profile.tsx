import { IIconsBasicProps } from 'lib/types'

export const ProfileIcon = ({ classes, fillColor = 'blue', intensityColor = '600' }: IIconsBasicProps) => (
  <svg
    viewBox='0 0 20 20'
    className={`flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${classes} fill-${fillColor}-${intensityColor}`}
    clipRule='evenodd'
    fill='currentColor'
    aria-hidden='true'
  >
    <path fillRule='evenodd' d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' clipRule='evenodd'></path>
  </svg>
)
