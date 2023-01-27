import React, { useMemo } from 'react';

import { IImage } from 'shared/models/Images';
import { selectCardData } from 'features/card/selectors';
import { useAppSelector } from 'app/hooks';

enum sortParameters {
  CATEGORY = 'category',
  DATE = 'timestamp',
  NAME = 'image',
  FILESIZE = 'filesize'
}

interface IFilters {
  sortByParameter?: 'category' | 'timestamp' | 'image' | 'filesize'
  sortType: 'asc' | 'desc'
  pageSize: number
  page: number
}

interface IUseFilterCardProps {
  filters: IFilters
  images: IImage[]
}

const useFilterCards = ({ filters, images }: IUseFilterCardProps) => {
  const { hiddenCards = [] } = useAppSelector(selectCardData)

  const { sortByParameter, sortType, pageSize, page } = filters

  const cardsWithoutHidden = useMemo(() => {
    if (!hiddenCards.length) {
      return images
    }
    return images.filter(item => !hiddenCards.includes(item))
  }, [hiddenCards, images])

  const cardsBySort = useMemo(() => {

    if (!sortByParameter) {
      return cardsWithoutHidden
    }

    if (
      (sortByParameter === sortParameters.CATEGORY) || (sortByParameter === sortParameters.NAME)
    ) {
      return cardsWithoutHidden.sort((a, b) => {
        if (a[sortByParameter] < b[sortByParameter]) {
          return -1
        }

        if (a[sortByParameter] > b[sortByParameter]) {
          return 1
        }

        return 0
      })
    }

    return cardsWithoutHidden.sort((a, b) => (a[sortByParameter] - b[sortByParameter]))
  }, [cardsWithoutHidden, sortByParameter])

  const paginatedList = useMemo(
    () =>
      [...cardsBySort].slice((page * pageSize), ((page + 1) * pageSize))
    , [cardsBySort, page, pageSize])

  return {
    cardsCount: cardsWithoutHidden.length,
    paginatedList,
  }
}

export default useFilterCards;