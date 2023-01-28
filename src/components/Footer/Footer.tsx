import React from 'react'
import block from 'bem-cn'

import './Footer.scss'

const b = block('footer')
export function Footer() {

  return (
    <footer className={b()}>
      <div className={b('wrapper')} />
    </footer>
  )
}

