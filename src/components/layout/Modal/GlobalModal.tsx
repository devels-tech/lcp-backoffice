import { useModalStore } from 'lib/store/Modal'

import { ConfirmModal } from './ConfirmModal'
// import { LoaderModal } from './LoaderModal'
// import { GenericModal } from './GenericModal'

export const GlobalModal = () => {
  const { isOpen, type, closeModal, confirmFn, confirmLabel } = useModalStore()
  // const [Modal,,, isOpen] = useModal('confirm', { initialValue: false })

  // if (isOpen === 'confirm') return <ConfirmModal Modal={Modal} />
  // if (type === 'loader') return <LoaderModal Modal={Modal} />
  // if (type === 'error') return <ErrorModal Modal={Modal} />
  // if (!isOpen) return null

  if (type === 'confirm' && isOpen) {
    return <ConfirmModal
      closeModal={closeModal}
      confirmFn={confirmFn}
      confirmLabel={confirmLabel}
    />
  }

  return null
}
