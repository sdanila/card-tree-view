import React, { useMemo } from 'react'
import block from 'bem-cn'

import { useAppSelector, useAppDispatch } from 'app/hooks'
import { selectCardImages } from 'features/card/selectors'

import Card from './Card/Card'

import './Cards.scss'

const b = block('cards')

function Cards() {
  const dispatch = useAppDispatch()
  const images = useAppSelector(selectCardImages);

  const items = useMemo(
    () =>
      images.map(item =>
        <Card
          key={`${item.filesize}_${item.timestamp}`}
          image={item.image}
          category={item.category}
        />)
    , [images])

  return (
    <div className={b()}>
      <div className={b('top')} />
      <div className={b('wrapper')}>
        {items}
      </div>
    </div>
  )
}

export default Cards