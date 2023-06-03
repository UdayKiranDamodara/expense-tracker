import { combineReducers, createStore } from 'redux'
import transactions from './reducers/transactionsReducer'
import entities from './reducers/entitiesReducer'
import categories from './reducers/categoriesReducer'
import modes from './reducers/modesReducer'

const rootReducer = combineReducers({
  transactions,
  entities,
  categories,
  modes,
})

const store = createStore(rootReducer)

export default store
