/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import block from 'bem-cn'
import { Pagination as RPagination } from 'rsuite'

import './Pagination.scss'

type PaginationProps = {
  activePage: number
  onClick: (a: any) => void
  limit: number
  size?: any
  total: number
  ellipsis?: boolean
  maxButtons?: number
}

function Pagination({
  ellipsis = true,
  activePage,
  onClick,
  limit,
  size = 'md',
  total,
  maxButtons = 6,
  ...props
}: PaginationProps) {
  const b = block('pagination')

  return (
    <div className={b()}>
      <RPagination
        prev
        next
        size={size}
        total={total}
        limit={limit}
        ellipsis={ellipsis}
        activePage={activePage}
        onChangePage={onClick}
        maxButtons={maxButtons}
        {...props}
      />
    </div>
  )
}

export default Pagination
