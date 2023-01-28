import React, { useCallback } from 'react'
import block from 'bem-cn'

import { useAppDispatch } from 'app/hooks'

import { resetHiddenCards } from 'features/card/actions'

import Button from 'components/Button/Button'

import './Footer.scss'

const b = block('footer')
export function Footer() {
  const dispatch = useAppDispatch();

  const onResetClickHandler = useCallback(
    () => {
      dispatch(resetHiddenCards())
    }, [dispatch])

  return (
    <footer className={b()}>
      <div className={b('wrapper')}>
        <Button text="Return hidden cards" onClick={onResetClickHandler} variant='danger' />
      </div>
    </footer>
  )
}

