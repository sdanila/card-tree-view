import dayjs from "dayjs"
import { firstLetterToUpperCase, splitString } from 'shared/utils/funcTools'

import {
  IImage,
  IConvertedCard,
  INodeWithCategories,
  ITreeStructureChildren,
  ITreeStructure
} from "shared/models/Images"

export const convertedCards = (value: IImage[]): IConvertedCard[] =>
  value.map(item => ({
    name:
      firstLetterToUpperCase(
        splitString(item.image)
      ),
    filesize: Math.floor(item.filesize / 8 / 1024),
    image: item.image,
    date: dayjs(item.timestamp).format('DD-MM-YYYY'),
    isCard: true
  }))

export const convertedCategories = (node: INodeWithCategories) => {
  const split = Object.entries(node)

  return [...split].reduce((acc, [key, value]) => {
    const converted = convertedCards([...value])

    return [...acc, { name: firstLetterToUpperCase(key), children: converted }]
  }, [] as ITreeStructureChildren[])
}

export const splitByCategories =
  (node: IImage[]) =>
    [...node].reduce((acc, item) => {
      const categoryBlock = acc[item.category]
      if (categoryBlock?.length) {
        return { ...acc, [item.category]: [...categoryBlock, item] }
      }

      return { ...acc, [item.category]: [item] }
    }, {} as INodeWithCategories)

export const convertedDataForTreeStructure = (node: IImage[]): ITreeStructure => {
  if (!node?.length) {
    return {
      name: 'Categories',
    }
  }

  const children = convertedCategories(splitByCategories(node))

  return {
    name: 'Categories',
    children
  }
}