
import { AddImage } from 'components/common/icons'
import ImageUploading from 'react-images-uploading'

export const UploadImage = ({ imageToUpload, onChange, classes = '' }) => {
  return (
    <div className={`mt-2 ${classes}`}>
      <label className='block font-medium text-gray-700'>Imagen del Artículo</label>

      <ImageUploading
        value={imageToUpload}
        onChange={onChange}
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
                          className='rounded-md mx-auto w-full mt-4 sm:mt-0 h-[313px] object-cover'
                        />

                        <div className='mt-2'>
                          <span
                            className='mr-2 cursor-pointer text-blue-400 hover:text-blue-700'
                            onClick={() => onImageUpdate(index)}
                          >
                          Cambiar
                          </span>

                          <span
                            className='ml-2 cursor-pointer text-red-400 hover:text-red-700'
                            onClick={() => onImageRemove(index)}
                          >
                          Eliminar
                          </span>

                          <br />
                        </div>
                      </div>
                    ))
                  }
                </div>
                : <>
                  <div
                    {...dragProps}
                    className={
                      `${isDragging ? 'border-indigo-600' : 'border-gray-300'} h-[278px] mt-1 flex flex-col justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md text-center`
                    }
                  >
                    <AddImage />

                    <span className={`${isDragging && 'text-indigo-600 underline'} text-blue-400 hover:text-blue-600 cursor-pointer`} onClick={onImageUpload}>
                    Sube una imagen
                    </span>

                    <span>o arrastra y suelta una imagen</span>
                  </div>
                </>
            }
          </>
        )}
      </ImageUploading>
    </div>
  )
}
