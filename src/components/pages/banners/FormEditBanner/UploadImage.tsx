
import { AddImage } from 'components/common/icons'
import ImageUploading, { ImageListType } from 'react-images-uploading'

interface UploadImageProps {
  type: 'mobile' | 'desktop'
  onChange: (image: ImageListType, addUpdateIndex?: number[], type?: 'mobile' | 'desktop') => void
  imageToUpload: ImageListType
}

export const UploadImage = ({ imageToUpload, onChange, type }: UploadImageProps) => {
  return (
    <div className='mt-2 w-full'>
      <label className='block font-semibold text-gray-700 dark:text-white'>Imagen {type} del banner</label>

      <ImageUploading
        value={imageToUpload}
        onChange={(imageListType, addUpdatedIndex) => onChange(imageListType, addUpdatedIndex, type)}
        dataURLKey='data_url'
        acceptType={['webp', 'png']}
      >
        {({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
          <>
            {
              (imageList.length >= 1)
                ? <div className='mt-2'>
                  {
                    imageList.map((image, index) => (
                      <div key={index} className ='w-full flex flex-col justify-center items-center'>
                        <img
                          src={image.data_url}
                          alt='image'
                          className='rounded-md w-140 max-h-112 object-contain'
                        />

                        <div className='mt-2'>
                          <span
                            className='mr-2 cursor-pointer text-blue-400 hover:text-blue-700'
                            onClick={() => onImageUpdate(index)}
                          >
                          Cambiar
                          </span>
                        </div>
                      </div>
                    ))
                  }
                </div>
                : <>
                  <div
                    {...dragProps}
                    className={
                      `${isDragging ? 'border-indigo-600' : 'border-gray-300'} h-80 mt-1 flex flex-col justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md text-center`
                    }
                  >
                    <AddImage />

                    <span className={`${isDragging && 'text-indigo-600 underline'} text-blue-400 hover:text-blue-600 cursor-pointer`} onClick={onImageUpload}>
                    Sube una imagen
                    </span>

                    <span className='dark:text-white'>o arrastra y suelta una imagen</span>
                  </div>
                </>
            }
          </>
        )}
      </ImageUploading>
    </div>
  )
}
