import createStore from "./createStore"

const reducer = (state: number, action: {type: string}) => {
  switch (action.type) {
    case 'inc':
      return state + 1
    case 'dec':
      return state - 1
    default:
      return 0
  }
}

const store = createStore(reducer)
const { subscribe, dispatch, getState } = store

subscribe(() => {
  const state = getState()
  console.log(state)
})

dispatch({
  type: 'inc'
})
