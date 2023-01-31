import React, { useEffect, useState } from 'react';
import block from 'bem-cn'

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectCardImages, selectCardComm } from 'features/card/selectors';
import { getImages } from 'features/card/actions';

import { Spinner } from 'components/Spinner/Spinner';
import { Header } from 'components/Header/Header';
import { Footer } from 'components/Footer/Footer';
import ModalManager from 'components/ModalManager/ModalManager';
import { ModalContext, ModalQueryContext } from 'components/HOC/withModalQuery/ModalContext'
import withModalQuery from 'components/HOC/withModalQuery/withModalQuery';
import Cards from 'pages/Cards/Cards';
import Tree from 'pages/Tree/Tree';

import './App.scss';

export enum IVisiblyType {
  TREE = 'tree',
  CARD = 'card'
}

interface IAppProps {
  modalFilters: ModalQueryContext
}

const b = block('app')

function App({ modalFilters }: IAppProps) {
  const dispatch = useAppDispatch()
  const images = useAppSelector(selectCardImages)
  const { isLoading } = useAppSelector(selectCardComm).getImages

  const [visiblyType, setVisiblyType] = useState<IVisiblyType>(IVisiblyType.CARD)

  useEffect(() => {
    if (!images.length) {
      dispatch(getImages())
    }
  }, [])

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
          return <Cards />
        case IVisiblyType.TREE:
          return <Tree />
        default:
          return <Cards />
      }
    }, [visiblyType])

  return (
    <ModalContext.Provider value={modalFilters}>
      <div className={b('container')}>
        <ModalManager />
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
    </ModalContext.Provider>
  );
}

export default withModalQuery(App);
