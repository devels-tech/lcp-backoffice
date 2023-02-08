import { Button } from 'components/common/Button'

interface IConfirmModalProps {
  closeModal: () => void
  confirmFn: Promise<void> | (() => Promise<void>) | (() => void)
  confirmLabel: string
}

export const ConfirmModal = ({ closeModal, confirmFn, confirmLabel }: IConfirmModalProps) => {
  return (
    <div className='z-90 bg-gray-400 bg-opacity-30 fixed top-0 left-0 w-full h-screen flex justify-center items-center'>
      <div className='z-100 bg-white p-4 rounded-lg max-w-lg w-full'>
        <header>
          <h5>Confirmación</h5>
        </header>

        <section>
          <p>{ confirmLabel }</p>
        </section>

        <footer className='flex justify-between items-center'>
          <Button onClick={async () => { closeModal(); await confirmFn }}>
            Confirmar
          </Button>

          <Button onClick={closeModal}>
            Cerrar
          </Button>
        </footer>
      </div>
    </div>
  )
}
