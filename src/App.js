import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/lib/integration/react'

import ProductListPage from './containers/productList';
import CheckoutPage from './containers/checkout';
import store, { history, persistor } from './store'
import './App.css';

class App extends Component {
  render() {

    return (
      <div className="App">
        <Provider store={store}>
          <PersistGate
            persistor={persistor}
          >
            <ConnectedRouter history={history}>
              <Switch>
                <Route exact path='/' component={ProductListPage}/>
                <Route exact path='/checkout' component={CheckoutPage}/>
              </Switch>
            </ConnectedRouter>
          </PersistGate>
        </Provider>
      </div>
    );
  }
}

export default App;