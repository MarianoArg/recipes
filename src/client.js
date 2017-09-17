import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './stores';
import './styles/app.css';

const STORAGE_KEY = 'recipePersist'
const restoredState = JSON.parse(localStorage.getItem(STORAGE_KEY));

const initState = (restoredState) ? {
    media: {
        recipes: restoredState.media.recipes,
        current_video: restoredState.media.current_video,
    },
    search:{
        recipes: restoredState.search.recipes
    },
    filter: {
        recipes: restoredState.filter.recipes,
        filterActives: restoredState.filter.filterActives
    },
} : {};

const store =  configureStore(initState, STORAGE_KEY);


ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
  </AppContainer>,
  document.getElementById('rogue_recipes')
);


if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default; // eslint-disable-line global-require

    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <NextApp />
        </Provider>
      </AppContainer>,
      document.getElementById('rogue_recipes')
    );
  });
}
