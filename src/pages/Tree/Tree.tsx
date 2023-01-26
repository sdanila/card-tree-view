import React from 'react'
import block from 'bem-cn'

const b = block('tree-component')

function Tree() {

  return (
    <div className={b()}>
      lol
    </div>
  )
}

export default Tree