/* eslint-disable no-use-before-define */
import createAtom from 'zustand'

type TModalType = 'default' | 'confirm'

interface IModalAtom {
  type: TModalType
  isOpen: boolean
  genericContentHtml: string
  confirmLabel: string
  confirmFn: Promise<void> | (() => Promise<void>) | (() => void)
  setType: (modalType: TModalType) => void
  setModal: (modalData: IModalAtomOptional) => void
  openModal: () => void
  closeModal: () => void
  toggleModal: () => void
}

interface IModalAtomOptional {
  type?: TModalType
  isOpen?: boolean
  genericContentHtml?: string
  confirmLabel?: string
  confirmFn?: Promise<void> | (() => Promise<void>) | (() => void)
  setType?: (modalType: TModalType) => void
  setModal?: (modalData?: IModalAtom) => void
  openModal?: () => void
  closeModal?: () => void
  toggleModal?: () => void
}

export const useModalStore = createAtom<IModalAtom>(set => ({
  type: 'default',
  isOpen: false,

  // Only Generic Modal Data
  genericContentHtml: '',

  // Only Confirm Modal Data
  confirmFn: () => () => {},
  confirmLabel: '¿Esta seguro de tomar esta acción?',

  setModal: (modalData) => set(prevState => ({ ...prevState, modalData })),
  setType: (modalType) => set(({ type: modalType })),
  openModal: () => set(({ isOpen: true })),
  closeModal: () => set(({ isOpen: false })),
  toggleModal: () => set(state => ({ isOpen: !state.isOpen }))
}))
