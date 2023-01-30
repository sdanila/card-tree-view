import React from 'react'
import block from 'bem-cn'
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

import { sortParameters } from 'shared/hooks/useFilterCards'
import { locale } from 'shared/utils/locale';

import './SortCards.scss'

interface ISortCardsProps {
  sortItems: sortParameters[]
  onChange: (choice?: sortParameters) => void
  active?: sortParameters
}

const b = block('sort-cards')

function SortCards({ sortItems, onChange, active }: ISortCardsProps) {

  const onClickHandler = React.useCallback((item: sortParameters) => onChange(item), [onChange])

  const items = React.useMemo(
    () => sortItems.map((item, index) =>
      <ToggleButton
        key={`${item}_${index}`}
        id={`${item}_${index}`}
        value={item}
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