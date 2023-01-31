import React from 'react'
import block from 'bem-cn'
import ReactDOM from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'

import { ReactComponent as CloseImg } from 'shared/image/modal-close.svg'

import './Modal.scss'

interface IModalProps {
  open: boolean
  handleClose: () => void
  bgColor?: string
  hideCloseBtn?: boolean
  handleSave?: () => void
  needSaveBtn?: () => boolean
  children: React.ReactElement
}

const b = block('modal-component')

function Modal({
  open,
  handleClose,
  children,
  bgColor = '#fff',
  hideCloseBtn = false,
}: IModalProps) {
  const stop = (e: React.SyntheticEvent) => e.stopPropagation()

  const content = (
    <AnimatePresence>
      {open && (
        <motion.div
          className={b()}
          onMouseDown={handleClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}>
          <div className={b('wrapper')}>
            <div className={b('app-container')}>
              <div
                className={b('content-container')}
                style={{ backgroundColor: bgColor }}
                onMouseDown={stop}
                onMouseUp={stop}
                onClick={stop}>
                {!hideCloseBtn && (
                  <div className={b('close-block')} onClick={handleClose}>
                    <CloseImg className={b('close-img')} />
                  </div>
                )}
                {children}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  const node = document.getElementById('modal_root')
  if (node !== null) {
    return ReactDOM.createPortal(content, node)
  }
  return null
}

export default Modal
