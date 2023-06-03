import ACTIONS from '../actions'

const CategoriesReducer = (state = [], action) => {
  switch (action.type) {
    case ACTIONS.CATEGORY.INITIALIZE:
      return [...action.payload]
    case ACTIONS.CATEGORY.ADD:
      return [...state, action.payload]
    case ACTIONS.CATEGORY.DELETE:
      console.log(state)
      return state.filter((item) => item.id != action.payload)
    case ACTIONS.CATEGORY.UPDATE:
      const index = state.findIndex((item) => item.id === action.payload.id)
      const newState = [...state]
      newState[index] = { ...action.payload }
      return newState
    default:
      return state
  }
}

export default CategoriesReducer
