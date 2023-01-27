import React, { useMemo, useState } from 'react'
import block from 'bem-cn'
import Pagination from 'rc-pagination'

import { useAppSelector, useAppDispatch } from 'app/hooks'
import { selectCardImages } from 'features/card/selectors'

import useFilterCards, { sortParameters } from 'shared/hooks/useFilterCards';

import Card from './Card/Card'
import SortCards from './SortCards/SortCards';

import './Cards.scss'

interface IFilters {
  sortByParameter?: sortParameters
  sortType: 'asc' | 'desc'
  pageSize: number
  page: number
}

const defaultFilters: { sortByParameter: sortParameters, sortType: 'asc' } = {
  sortByParameter: sortParameters.NAME,
  sortType: 'asc'
}

const b = block('cards')

function Cards() {
  const dispatch = useAppDispatch()
  const images = useAppSelector(selectCardImages);

  const [filters, setFilters] = useState<IFilters>({
    sortByParameter: sortParameters.NAME,
    sortType: 'asc',
    pageSize: 12,
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

  const sortItems = useMemo(() => Object.keys(images[0]) as sortParameters[], [images])

  const onSortChange = React.useCallback((type?: sortParameters) => {
    setFilters(prev => ({ ...prev, sortByParameter: type }))
  }, [])

  const onChangePage = React.useCallback((page: number, pageSize: number) => {
    setFilters(prev => ({ ...prev, page, pageSize }))
  }, [])

  const onResetFilters = React.useCallback(() => {
    setFilters(prev => ({ ...prev, ...defaultFilters }))
  }, [])

  return (
    <div className={b()}>
      <div className={b('top')}>
        <SortCards
          sortItems={sortItems}
          onChange={onSortChange}
          onReset={onResetFilters}
          active={filters.sortByParameter}
        />
      </div>
      <div className={b('wrapper')}>
        {items}
      </div>
      <div className={b("pagination-bottom")}>
        <Pagination
          current={filters.page}
          total={cardsCount}
          pageSize={filters.pageSize}
          onChange={onChangePage}
          showLessItems
        />
      </div>
    </div>
  )
}

export default Cards