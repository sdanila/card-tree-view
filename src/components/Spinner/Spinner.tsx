import React from 'react'
import block from 'bem-cn'
import { Spinner as SpinnerBootstrap } from 'react-bootstrap';
import { AnimatePresence, motion } from 'framer-motion'

import './Spinner.scss'

interface ISpinnerProps {
  isLoading: boolean
  size?: string
}

export function Spinner({ isLoading, size = 'small' }: ISpinnerProps) {
  const b = block('spinner')

  return (
    <AnimatePresence exitBeforeEnter>
      {isLoading ? (
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className={b({ size })}>

          <SpinnerBootstrap animation="border" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
