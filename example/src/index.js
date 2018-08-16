import React, { Component } from 'react'
import { AuthProvider } from 'blockstack-react-auth-provider'
import Router from '~/router'
import { render } from 'react-dom'
import { hot } from 'react-hot-loader'

class App extends Component {

  render() {
    return (
      <AuthProvider>
        <Router />
      </AuthProvider>
    )
  }

}

render(<App />, document.getElementById('root'))
export default hot(module)(App)