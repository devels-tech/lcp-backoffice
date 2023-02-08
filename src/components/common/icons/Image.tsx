import { IIconsBasicProps } from 'lib/types'

export const ImageIcon = ({ classes, fillColor = 'blue', intensityColor = '600' }: IIconsBasicProps) => (
  <svg
    viewBox='0 0 20 20'
    className={`flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${classes} fill-${fillColor}-${intensityColor}`}
    clipRule='evenodd'
    fill='currentColor'
    aria-hidden='true'
  >
    <path fillRule='evenodd' d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z' clipRule='evenodd'></path>
  </svg>
)
