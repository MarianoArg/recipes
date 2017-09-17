import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import { stateTree } from './state';
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage';



function configureStore(initialStateOverwrites = {}, storageKey) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const middlewares = [
    thunkMiddleware
    ]

    const initialState = Object.assign({}, stateTree, initialStateOverwrites);

    // createPersistor(store, persistConfig)
    // persistStore(store, () => {
    //   console.log('rehydration complete')
    // })
    const storageEngine = createEngine(storageKey);
    middlewares.push(storage.createMiddleware(storageEngine));


    const enhancer = composeEnhancers(
        applyMiddleware(...middlewares),
    );

    const store = createStore(
        rootReducer,
        initialState,
        enhancer,
    );


  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      // We need to require for hot reloading to work properly.
      const nextReducer = require('../reducers');  // eslint-disable-line global-require

      store.replaceReducer(nextReducer);
    });
  }
  return store;
}

export default configureStore;
