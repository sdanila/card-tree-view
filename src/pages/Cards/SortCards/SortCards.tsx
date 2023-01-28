import React from 'react'
import block from 'bem-cn'
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

import { sortParameters } from 'shared/hooks/useFilterCards'

import './SortCards.scss'

interface ISortCardsProps {
  sortItems: sortParameters[]
  onChange: (choice?: sortParameters) => void
  onReset: () => void
  active?: sortParameters
}

const locale = {
  image: 'Name',
  filesize: 'File size',
  timestamp: 'Date',
  category: 'Category'
}

const b = block('sort-cards')

function SortCards({ sortItems, onChange, onReset, active }: ISortCardsProps) {

  const onClickHandler = React.useCallback((item: sortParameters) => onChange(item), [onChange])

  const items = React.useMemo(
    () => sortItems.map((item, index) =>
      <ToggleButton
        key={`${item}_${index}`}
        id={`${item}_${index}`}
        value={item}
        // className={b('item')}
        onClick={() => onClickHandler(item)}>
        {locale[item]}
      </ToggleButton>
    )
    , [sortItems, onClickHandler])

  return (
    <div className={b()}>
      <span className={b('choice')}>Sort by:</span>
      <ToggleButtonGroup type="radio" name="options" defaultValue={active}>
        {items}
      </ToggleButtonGroup>
    </div>
  )
}

export default React.memo(SortCards);