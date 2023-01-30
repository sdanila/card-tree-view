import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import CardBootstrap from 'react-bootstrap/Card';
import block from 'bem-cn'

import Button from 'components/Button/Button';
import LoadableImage from 'components/LoadableImage/LoadableImage';

import { splitString, firstLetterToUpperCase } from 'shared/utils/funcTools';
import { IImage } from 'shared/models/Images';
import { urlData } from 'shared/utils/constants';

import './Card.scss';

interface ICardProps {
  card: IImage
  onHideClick: (card: IImage) => void
}

const b = block('card-component')

export default function Card({ card, onHideClick }: ICardProps) {
  // eslint-disable-next-line no-undef
  const currentTimeoutId = useRef<NodeJS.Timeout>()

  const [isClosing, setIsClosing] = useState<boolean>(false)

  const titleSplit = splitString(card.image)
  const title = firstLetterToUpperCase(titleSplit)

  const getTimeoutedFunc = useMemo(
    () => () => {
      currentTimeoutId.current = setTimeout(() => {
        onHideClick(card)
        setIsClosing(false)
      }, 400)
    },
    [card, onHideClick],
  );

  const onHideClickHandler = useCallback(() => {
    setIsClosing(true)
    getTimeoutedFunc()
  }, [getTimeoutedFunc])

  useEffect(() => () => {
    if (currentTimeoutId.current) {
      clearTimeout(currentTimeoutId.current)
    }
  }, [])

  return (
    <CardBootstrap className={b({ isClosing }).toString()}>
      <div className={b('img')}>
        <LoadableImage
          src={`${urlData}/${card.image}`}
          alt={title}
          animationType="smallToBig"
        />
      </div>
      <CardBootstrap.Body className={b('body').toString()}>
        <CardBootstrap.Title className={b('title').toString()}>
          {title}
        </CardBootstrap.Title>
        <Button text='Hide' disabled={isClosing} onClick={onHideClickHandler} variant='secondary' size='sm' />
      </CardBootstrap.Body>
    </CardBootstrap>
  )
}
