import ACTIONS from '../actions'

const EntitiesReducer = (state = [], action) => {
  switch (action.type) {
    case ACTIONS.ENTITY.INITIALIZE:
      return [...action.payload]
    case ACTIONS.ENTITY.ADD:
      return [...state, action.payload]
    case ACTIONS.ENTITY.DELETE:
      console.log(state)
      return state.filter((item) => item.id != action.payload)
    case ACTIONS.ENTITY.UPDATE:
      const index = state.findIndex((item) => item.id === action.payload.id)
      const newState = [...state]
      newState[index] = { ...action.payload }
      return newState
    default:
      return state
  }
}

export default EntitiesReducer
