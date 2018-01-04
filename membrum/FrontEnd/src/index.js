import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import registerServiceWorker from './registerServiceWorker'

import configureStore from './configureStore'

import Routes from './Routes'
import App from './containers/App'

import './index.css'
import 'normalize.css'

let store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        {process.env.NODE_ENV !== 'production' ? <h3>Dev</h3> : ''}
        <Routes />
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
