import { TypedUseSelectorHook, useDispatch, useSelector, shallowEqual } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

import { IApplicationState } from 'setup/store';
import { RootState } from 'index'


export const useAppDispatch = () => useDispatch<ThunkDispatch<IApplicationState, any, AnyAction>>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
