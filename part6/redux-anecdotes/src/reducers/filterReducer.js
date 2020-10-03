export const setFilter = (string) => {
  return {
    type: 'SET_FILTER',
    data: {
      string,
    },
  }
}

const FilterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.data.string
    default:
      return state
  }
}


export default FilterReducer