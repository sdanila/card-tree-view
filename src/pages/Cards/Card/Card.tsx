import React from 'react'
import CardBootstrap from 'react-bootstrap/Card';
import block from 'bem-cn'

import { splitString, firstLetterToUpperCase } from 'shared/utils/funcTools';

import './Card.scss';

interface ICardProps {
  image: string
  category: string
}

const url = 'http://contest.elecard.ru/frontend_data'

const b = block('card-component')

export default function Card({ image, category }: ICardProps) {

  const titleSplit = splitString(image)
  const title = firstLetterToUpperCase(titleSplit)

  return (
    <CardBootstrap className={b()}>
      <CardBootstrap.Img
        variant="top"
        className={b('img').toString()}
        src={`${url}/${image}`}
      />
      <CardBootstrap.Body className={b('body').toString()}>
        <CardBootstrap.Title className={b('title').toString()}>
          {title}
        </CardBootstrap.Title>
      </CardBootstrap.Body>
    </CardBootstrap>
  )
}
