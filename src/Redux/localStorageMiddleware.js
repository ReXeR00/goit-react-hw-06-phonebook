export const localStorageMiddleware = store => next => action => {
  const result = next(action);

  // Zapisz stan aplikacji w localStorage
  const state = store.getState();
  localStorage.setItem('reduxState', JSON.stringify(state));

  return result;
};
