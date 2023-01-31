import React, { useCallback, useState } from 'react'

import { ModalQueryContext } from './ModalContext'

const withModalQuery = (WrappedComponent: React.FC<any>) => function (props: any) {
  const [openedModals, setOpenedModals] = useState<string[]>([])

  const pushNewModal = useCallback(
    (newModal: string) => () => {
      setOpenedModals(prev => [...prev.filter(t => t !== newModal), newModal])
    },
    [setOpenedModals],
  )

  const closeModal = useCallback(
    (newModal: string) => () => {
      setOpenedModals(prev => prev.filter(t => t !== newModal))
    },
    [setOpenedModals],
  )

  return (
    <WrappedComponent
      {...props}
      modalFilters={
        {
          openedModals,
          setOpenedModals,
          pushNewModal,
          closeModal,
        } as ModalQueryContext
      }
    />
  )
}

export default withModalQuery
