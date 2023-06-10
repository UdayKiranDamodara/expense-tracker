import ACTIONS from '../actions'

const ModesReducer = (state = [], action) => {
  switch (action.type) {
    case ACTIONS.MODE.INITIALIZE:
      return [...action.payload]
    case ACTIONS.MODE.ADD:
      return [...state, action.payload]
    case ACTIONS.MODE.DELETE:
      console.log(state)
      return state.filter((item) => item.id != action.payload)
    case ACTIONS.MODE.UPDATE:
      const index = state.findIndex((item) => item.id === action.payload.id)
      const newState = [...state]
      newState[index] = { ...action.payload }
      return newState
    default:
      return state
  }
}

export default ModesReducer
