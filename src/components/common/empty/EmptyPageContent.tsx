import { IEmptyDataProps } from 'lib/types/empty'
import { EmptyData } from './EmptyData'

export const EmptyPageContent = (props: IEmptyDataProps) => {
  return (
    <div className='w-full h-screen-70 flex items-center justify-center'>
      <EmptyData {...props} />
    </div>
  )
}
