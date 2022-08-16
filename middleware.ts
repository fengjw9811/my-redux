function middleware(
  dispatch: (action: { type: string }) => void,
  getState: () => number
) {
  return (next) => {
    return (action) => {
      return next(action);
    };
  };
}

function applyMiddleware(...middlewares: Function[]) {
  return (createStore) =>
    (reducer: (state: number, action: { type: string }) => number) => {
      const store = createStore(reducer);
      const middlewareAPI = {
        getState: store.getState,
        dispatch: (action, ...args) => store.dispatch(action, ...args),
      };

      const middlewareChain = middlewares.map((middleware) =>
        middleware(middlewareAPI)
      );
    };
}
