import React, { useCallback, useContext, useMemo } from 'react'
import block from 'bem-cn'

import Modal from 'components/Modal/Modal'
import { modals } from 'modals/components'
import { ModalContext } from 'components/HOC/withModalQuery/ModalContext'

import './ModalManager.scss'

const b = block('modal-manager')

function ModalManager() {
  const { openedModals, closeModal } = useContext(ModalContext)

  const onCloseModal = useCallback(
    (modalRoute: string) => {
      closeModal(modalRoute)()
    },
    [closeModal],
  )

  const modalComponents = useMemo(
    () =>
      modals.map(t => (
        <Modal
          key={t.id}
          open={Boolean(openedModals.length)}
          // bgColor={t.bgColor}
          handleClose={() =>
            onCloseModal(openedModals[0])
          }>
          <t.Component path={openedModals[0]} />
        </Modal>
      )),
    [onCloseModal, openedModals],
  )

  return <div className={b()}>{modalComponents}</div>
}

export default ModalManager
