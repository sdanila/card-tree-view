import React, { useMemo, useState } from 'react'
import block from 'bem-cn'

import { useAppSelector, useAppDispatch } from 'app/hooks'
import { selectCardImages } from 'features/card/selectors'

import useFilterCards from 'shared/hooks/useFilterCards';

import Card from './Card/Card'

import './Cards.scss'

interface IFilters {
  sortByParameter?: 'category' | 'timestamp' | 'image' | 'filesize'
  sortType: 'asc' | 'desc'
  pageSize: number
  page: number
}

const defaultFilters = {
  sortByParameter: undefined,
  sortType: 'asc'
}

const b = block('cards')

function Cards() {
  const dispatch = useAppDispatch()
  const images = useAppSelector(selectCardImages);

  const [filters, setFilters] = useState<IFilters>({
    sortByParameter: undefined,
    sortType: 'asc',
    pageSize: 10,
    page: 1
  })

  const { cardsCount, paginatedList } = useFilterCards({ filters, images })

  const items = useMemo(
    () =>
      paginatedList.map(item =>
        <Card
          key={`${item.filesize}_${item.timestamp}`}
          image={item.image}
          category={item.category}
        />)
    , [paginatedList])

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