import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import { djello } from '../reducers'

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['redirect', 'loading'],
}

const persistedReducer = persistReducer(persistConfig, djello)

export let store = createStore(persistedReducer, applyMiddleware(thunk))
export let persistor = persistStore(store)
