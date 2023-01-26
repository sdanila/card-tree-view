import React, { useEffect, useState } from 'react';
import block from 'bem-cn'

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectCardImages, selectCardComm } from 'features/card/selectors';
import { getImages } from 'features/card/actions';

import { Spinner } from 'components/Spinner/Spinner';
import { Header } from 'components/Header/Header';
import { Footer } from 'components/Footer/Footer';

import './App.scss';

export enum IVisiblyType {
  TREE = 'tree',
  CARD = 'card'
}

const b = block('app')

function App() {
  const dispatch = useAppDispatch()
  const images = useAppSelector(selectCardImages)
  const { isLoading } = useAppSelector(selectCardComm).getImages

  const [visiblyType, setVisiblyType] = useState<IVisiblyType>(IVisiblyType.CARD)

  useEffect(() => {
    if (!images.length || visiblyType === IVisiblyType.TREE) {
      dispatch(getImages())
    }
  }, [visiblyType])

  const onVisiblyTypeHandler = React.useCallback(
    (type: boolean) => {
      if (type) {
        setVisiblyType(IVisiblyType.CARD)
      } else {
        setVisiblyType(IVisiblyType.TREE)
      }
    }, [])

  const component = React.useMemo(
    () => {
      switch (visiblyType) {
        case IVisiblyType.CARD:
          return ''
        case IVisiblyType.TREE:
          return ''
        default:
          return ''
      }
    }, [visiblyType])

  return (
    <div className={b('container')}>
      <Header onVisiblyTypeHandler={onVisiblyTypeHandler} />
      <div className={b('main')}>
        {
          isLoading
            ? <Spinner isLoading />
            : component
        }
      </div>
      <Footer />
    </div>
  );
}

export default App;
