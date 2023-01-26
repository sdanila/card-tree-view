import React from 'react'
import block from 'bem-cn'

import ToggleButton from 'components/ToggleButton/ToggleButton'

import { ReactComponent as TreeSVG } from 'shared/image/tree-svg.svg'
import { ReactComponent as CardSVG } from 'shared/image/card-svg.svg'

import './Header.scss'

interface IHeaderProps {
  onVisiblyTypeHandler: (type: boolean) => void
}

const icons = {
  'tree': <TreeSVG className='structure-icon' />,
  'card': <CardSVG className='structure-icon' />
}

const b = block('header-block')

export function Header({ onVisiblyTypeHandler }: IHeaderProps) {

  const onChangeToggle = (type: boolean) => {
    onVisiblyTypeHandler(type)
  }

  return (
    <header className={b()}>
      <div className={b('switch-block')}>
        <ToggleButton
          onChange={onChangeToggle}
          icons={icons}
        />
      </div>
    </header>
  )
}
