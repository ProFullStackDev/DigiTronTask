/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Navigation from './MainNavigator';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

const store = createStore (reducers, applyMiddleware (thunk));

const App:  () => React$Node = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
