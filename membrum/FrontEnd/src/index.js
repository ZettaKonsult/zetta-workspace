import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'

import configureStore from './configureStore'

import Layout from './Layout/Layout'

import './index.css'
import 'normalize.css'

let store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
