import React from 'react'
import block from 'bem-cn'

import { urlData } from 'shared/utils/constants';
import LoadableImage from 'components/LoadableImage/LoadableImage';

import './Image.scss'

const b = block('image-modal')

interface IImageProps {
  path: string
}

export function Image({ path }: IImageProps) {

  return (
    <div className={b()}>
      <div className={b('content')}>
        <LoadableImage
          src={`${urlData}/${path}`}
          alt={path}
          animationType="smallToBig"
        />
      </div>
    </div>
  )
}
