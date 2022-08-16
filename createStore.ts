function createStore (reducer: (state: number, action: {type: string}) => number, enhancer?: Function) {
  if(enhancer){
    return enhancer(createStore)(reducer)
  }
  let state = null as unknown as number
  const listeners = [] as Function[]
  function dispatch (action: {type: string}) {
    state = reducer(state, action)
    listeners.forEach(listener => listener())
  }
  function getState () {
    return state
  }
  function subscribe (listener: () => void) {
    listeners.push(listener)

    return function unsubscribe () {
      const index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
  }

  // 初始化
  dispatch({
    type: 'INIT'
  })

  return {
    dispatch,
    getState,
    subscribe
  }
}

export default createStore