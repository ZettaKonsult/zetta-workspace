import React from 'react'
import ReactDOM from 'react-dom'

import registerServiceWorker from './registerServiceWorker'
import configureStore from './configureStore'
import Root from './Root'

import 'semantic-ui-css/semantic.min.css'

const store = configureStore()

ReactDOM.render(<Root store={store} />, document.getElementById('root'))
registerServiceWorker()
