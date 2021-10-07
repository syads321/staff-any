import { useMemo } from 'react'
import { createStore, applyMiddleware, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

let store: Store<{ shifts: never[] }, any> | undefined

const initialState = {
  shifts: [],
  editShiftMode: false,
  item: {
    title: '',
  },
  addDayMode: false,
  shiftaddmode: true
}

const reducer = (state = initialState, action: { type: any; props: any, shifts: never[], editShiftMode: boolean, item : any , addDayMode: boolean, shiftaddmode: boolean}) => {
  switch (action.type) {
    case 'UPDATE_SHIFT':
      return {
        ...state,
        shifts: action.shifts
      }
    case 'EDIT_MODE':
      return {
        ...state,
        editShiftMode: action.editShiftMode,
        item : action.item,
        shiftaddmode: action.shiftaddmode
      }
    case 'ADD_DAY':
        return {
          ...state,
          addDayMode: action.addDayMode,
        }
    default:
      return state
  }
}

function initStore(preloadedState = initialState) {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  )
}

export const initializeStore = (preloadedState: { shifts: never[], editShiftMode: boolean, item : any, addDayMode: boolean, shiftaddmode: boolean } | undefined) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState: { shifts: never[], editShiftMode: boolean, item : any, addDayMode: boolean, shiftaddmode: boolean } | undefined) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}
