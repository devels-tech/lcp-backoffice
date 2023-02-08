import { CancelCircular } from 'components/common/icons'

export const ErrorForm = ({ children }) => (
  <div className='flex items-center mt-4'>
    <CancelCircular classes='w-5 h-5' stroke='red' />
    <span className='ml-4'>{children}</span>
  </div>
)
