const CategoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'INITIALIZE_CATEGORIES':
      return [...action.payload]
    default:
      return state
  }
}

export default CategoriesReducer
