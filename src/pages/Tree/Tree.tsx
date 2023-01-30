import React from 'react'
import block from 'bem-cn'

import { useAppSelector } from 'app/hooks'
import { selectCardImages } from 'features/card/selectors'

import { convertedDataForTreeStructure } from 'shared/utils/convert';

import TreeItem from './TreeComponent/TreeComponent';

import './Tree.scss'

const b = block('tree')

function Tree() {
  const images = useAppSelector(selectCardImages);
  const data = convertedDataForTreeStructure(images);

  return (
    <div className={b()}>
      <TreeItem node={data} />
    </div>
  );
};

export default Tree;