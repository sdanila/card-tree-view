import React, { useMemo } from 'react';

import { IImage } from 'shared/models/Images';

interface IUseTreeStructureDataProps {
  node: IImage[]
}

interface INodeWithChildren {
  name: string
  image?: string
  filesize?: number
  timestamp?: number
  category?: string
  children?: INodeWithChildren[]
}

interface INodeWithCategories {
  [key: string]: IImage[]
}

const useTreeStructureData = ({ node }: IUseTreeStructureDataProps) => {

  const nodeWithCategories = useMemo(
    () => {
      const arr = []

      return [...node].reduce((acc, item) => {
        const categoryBlock = acc[item.category]
        if (categoryBlock?.length) {
          return { ...acc, [item.category]: [...categoryBlock, item] }
        }

        return { ...acc, [item.category]: [item] }
      }, {} as INodeWithCategories)
    }

    , [node])

  return { data: nodeWithCategories }
}

export default useTreeStructureData;