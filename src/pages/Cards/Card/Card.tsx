import React from 'react'
import CardBootstrap from 'react-bootstrap/Card';
import block from 'bem-cn'
import Button from 'components/Button/Button';

import { splitString, firstLetterToUpperCase } from 'shared/utils/funcTools';
import { IImage } from 'shared/models/Images';

import './Card.scss';

interface ICardProps {
  card: IImage
  onHideClick: (card: IImage) => void
}

const url = 'http://contest.elecard.ru/frontend_data'

const b = block('card-component')

export default function Card({ card, onHideClick }: ICardProps) {
  const titleSplit = splitString(card.image)
  const title = firstLetterToUpperCase(titleSplit)

  const onHideClickHandler = React.useCallback(() => {
    onHideClick(card)
  }, [card, onHideClick])

  return (
    <CardBootstrap className={b()}>
      <CardBootstrap.Img
        variant="top"
        className={b('img').toString()}
        src={`${url}/${card.image}`}
      />
      <CardBootstrap.Body className={b('body').toString()}>
        <CardBootstrap.Title className={b('title').toString()}>
          {title}
        </CardBootstrap.Title>
        <Button text='Hide' onClick={onHideClickHandler} variant='secondary' size='sm' />
      </CardBootstrap.Body>
    </CardBootstrap>
  )
}
