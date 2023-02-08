import usePortal from 'react-cool-portal'
import { toast } from 'react-toastify'

import { handleFetchErrors } from 'lib/utils/handleFetchErrors'
import { deleteProductById } from 'lib/services/shop/products'
import { normalizeDate } from 'lib/utils/getLocalDate'

import { Button, LinkAsButton } from 'components/common/Button'
import { Modal } from 'components/layout/Modal'
import { Dispatch, IProduct, SetStateAction } from 'lib/types'

interface IProductsListItemProps extends IProduct {
  refreshProducts: () => Promise<void>
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

export const ProductListItem = ({ id, title, category, description, image, createdAt, price, refreshProducts, setIsLoading }: IProductsListItemProps) => {
  const { Portal, show, hide } = usePortal({ defaultShow: false })

  const deleteProduct = async () => {
    hide()
    setIsLoading(true)
    const { error } = await deleteProductById(id)

    if (error) {
      hide()
      setIsLoading(false)
      handleFetchErrors(error.status, error.message)
      return
    }

    await refreshProducts()
    toast('Banner eliminado exitosamente', { type: 'success' })
  }

  return (
    <>
      <Modal Portal={Portal} hide={hide}>
        <div className='w-full flex gap-x-2 justify-start items-end pt-2 text-sm'>
          <Button onClick={hide} classes='w-full'>
            Cancelar
          </Button>

          <Button onClick={deleteProduct} classes='w-full'>
            Confirmar
          </Button>
        </div>
      </Modal>

      <tr key={id}>
        <td className='px-6 py-4 whitespace-nowrap truncate hover:bg-gray-100 dark:hover:bg-[#1a1a1a] border-grey-light border'>
          <div className='flex items-center'>
            <div className='flex-shrink-0 h-10 w-10'>
              {
                image
                // eslint-disable-next-line @next/next/no-img-element
                  ? <img
                    className='w-10 h-10 rounded-md object-cover'
                    width={250}
                    height={250}
                    src={image.url}
                    alt='product'
                  />
                  : <span>Sin Imagen</span>
              }
            </div>

            <div className='ml-4'>
              <div className='text-sm font-medium text-gray-900 max-w-xs truncate dark:text-white'>{ title }</div>
              <div className='text-xs text-gray-500 dark:text-gray-200'>Fecha: { normalizeDate(createdAt) }</div>
              <div className='text-xs text-white bg-purple-400 rounded-md inline-block px-2 py-1 dark:text-gray-200'>{ category.title }</div>
            </div>
          </div>
        </td>

        <td className='border-grey-light border hover:bg-gray-100 dark:hover:bg-[#1a1a1a] p-3 max-w-xs truncate dark:text-white'>
          { description }
        </td>

        <td className='border-grey-light border hover:bg-gray-100 dark:hover:bg-[#1a1a1a] p-3 whitespace-nowrap truncate text-center dark:text-white'>
          <span className='text-green-500'>$</span> {price}
        </td>

        <td className='border-grey-light border p-3 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] hover:font-medium'>
          <LinkAsButton to={`/tienda/productos/${id}`} classes='w-full text-sm'>
            Editar
          </LinkAsButton>

          <Button
            onClick={show}
            classes='w-full text-sm mt-4 border-2 border-solid border-gray-900'
          >
            Borrar
          </Button>
        </td>
      </tr>
    </>
  )
}
