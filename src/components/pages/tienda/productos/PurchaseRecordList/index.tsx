import { Button } from 'components/common/Button'

const theadLabel = [
  { label: 'Pedido' },
  { label: 'Usuario' },
  { label: 'Acciones' }
]

type TPurchaseRecordListProps = {
  purchaseRecords: any[]
  isLoading: boolean
  error: {
    state: boolean
    message: string
  }
}

export const PurchaseRecordList = ({ purchaseRecords }: TPurchaseRecordListProps) => {
  if (purchaseRecords.length === 0 || !purchaseRecords) {
    return (
      <div className='w-full text-center flex items-center justify-center mt-10'>
        <span className='text-xl'>Sin Registros de Compra</span>
      </div>
    )
  }

  return (
    <section className='mt-10'>
      <span className='text-xl'>Registros de ordenes</span>

      <div className='w-full flex items-center justify-center overflow-x-scroll lg:overflow-visible mt-4'>
        <table className='w-full md:flex-col divide-y divide-gray-200 ml-96 ml:ml-80 md:ml-0'>
          <thead className='bg-gray-50 rounded-md rounded-b-none'>
            <tr>
              {
                theadLabel.map(thead => (
                  <th key={thead.label} scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    {thead.label}
                  </th>
                ))
              }
            </tr>
          </thead>

          <tbody className='bg-white divide-y divide-gray-200'>
            {
              purchaseRecords.map(purchaseRecord => (
                <tr key={purchaseRecord.id}>
                  <td className='p-3 whitespace-nowrap truncate hover:bg-gray-100 border-grey-light border'>
                    <div>
                      <span className='text-gray-900'>Producto: {purchaseRecord.productId}</span> <br />
                      <span className='text-gray-500 text-xs'>Fecha: {purchaseRecord.date}</span>
                    </div>
                  </td>

                  <td className='border-grey-light border hover:bg-gray-100 p-3 whitespace-nowrap truncate'>
                    <div>
                      <span className='text-gray-900'>Nombre: {purchaseRecord.fullName}</span> <br />
                      <span className='text-gray-500 text-xs'>Email: {purchaseRecord.email}</span> <br />
                      <span className='text-gray-500 text-xs'>Teléfono: {purchaseRecord.phone}</span>
                    </div>
                  </td>

                  <td className='border-grey-light border p-3 whitespace-nowrap truncate'>
                    <div className='flex justify-center items-center'>
                      <Button classes='text-sm'>
                        Editar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </section>
  )
}
