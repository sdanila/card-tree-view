import { AnyAction, applyMiddleware, combineReducers, compose, createStore, Reducer, Store } from 'redux'
import { Persistor, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'

import { IExtra } from 'shared/types/redux'

import * as CardFeature from 'features/card'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose
  }
}

export interface IApplicationState {
  card: CardFeature.types.ICardState
}

type ConfigureStore = {
  store: Store<IApplicationState>
  persistor: Persistor
}

export function configureStore(extra: IExtra): ConfigureStore {
  const middleware = thunk.withExtraArgument<IExtra>(extra)

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION__ && process.env.NODE_ENV !== 'production'
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (arg: any) => arg

  const reducer: Reducer<IApplicationState, AnyAction> = combineReducers({
    card: CardFeature.reducer
  })

  const store = createStore(reducer, compose(applyMiddleware(middleware), composeEnhancers))

  const persistor = persistStore(store)

  return { store, persistor }
}
