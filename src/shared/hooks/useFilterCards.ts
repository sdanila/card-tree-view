import React, { useMemo } from 'react';

import { IImage } from 'shared/models/Images';
import { selectCardData } from 'features/card/selectors';
import { useAppSelector } from 'app/hooks';

import { sortStringOrNumber } from 'shared/utils/funcTools';


export enum sortParameters {
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
  const { hiddenCards } = useAppSelector(selectCardData)

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

    return cardsWithoutHidden.sort(
      (a, b) =>
        sortStringOrNumber(
          {
            a: a[sortByParameter],
            b: b[sortByParameter]
          }
        )
    )
  }, [cardsWithoutHidden, sortByParameter])

  const paginatedList = useMemo(
    () =>
      cardsBySort.slice(((page - 1) * pageSize), (page * pageSize))
    , [cardsBySort, page, pageSize, sortByParameter])

  return {
    cardsCount: cardsWithoutHidden.length,
    paginatedList,
  }
}

export default useFilterCards;