import { IIconsBasicProps } from 'lib/types'

export const DocumentIcon = ({ classes, fillColor = 'blue', intensityColor = '600' }: IIconsBasicProps) => (
  <svg
    viewBox='0 0 20 20'
    className={`flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${classes} fill-${fillColor}-${intensityColor}`}
    clipRule='evenodd'
    fill='currentColor'
    aria-hidden='true'
  >
    <path fillRule='evenodd' d='M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z'clipRule='evenodd'></path>
  </svg>
)
