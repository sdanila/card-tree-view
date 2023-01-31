import { createContext } from 'react'

export interface ModalQueryContext {
  openedModals: string[]
  setOpenedModals: (a: string[]) => void
  pushNewModal: (a: string) => () => void
  closeModal: (a: string) => () => void
}

export const ModalContext = createContext({
  openedModals: [],
  setOpenedModals: a => { },
  pushNewModal: a => () => { },
  closeModal: a => () => { },
} as ModalQueryContext)
