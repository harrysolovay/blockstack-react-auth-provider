blockstack-react-auth-provider [![npm version](https://img.shields.io/npm/v/blockstack-react-auth-provider.svg?style=flat)](https://www.npmjs.com/package/blockstack-react-auth-provider)
=============================

> Impliment [blockstack.js](https://github.com/blockstack/blockstack)' authentication using React patterns you know and love.


## Installation

```sh
$ yarn add blockstack-react-auth-provider
```

## Usage

#### 1) Make sure that your dev server and build processes are configured to work with blockstack.js. I encourage you to check out [react-app-rewire-blockstack](https://github.com/harrysolovay/react-app-rewire-blockstack) and [blockstack-react-scripts](https://github.com/harrysolovay/blockstack-react-scripts).

#### 2) Import and wrap your root component with an instance of AuthProvider:

```js
import React, { Component } from 'react'
import { AuthProvider } from 'blockstack-react-auth-provider'
import Router from '~/router'
import { render } from 'react-dom'

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
```

#### 3) Import and wrap child components (on any level) with an instance of Auth Consumer. Use its data as you see fit:
Notice how we use `loggedIn` (a boolean) to decide whether to display the 'account' page link, or a 'log in' button.

```js
import React from 'react'
import { AuthConsumer } from 'blockstack-react-auth-provider'
import { NavLink } from 'react-router-dom'

export default () => (
  <AuthConsumer>
    {({ state: { loggedIn }, logIn }) => (
      <div>

        <NavLink
          exact
          to='/'
          children='feed'
        />

        <NavLink
          to='/some-other-page'
          children='some-other-page'
        />

        {
          loggedIn
            ? (
              <NavLink
                to='/account'
                children='account'
              />
            ) : (
              <button
                onClick={ logIn }
                children='log in'
                className='active'
              />
            )
        }

      </div>
    )}
  </AuthConsumer>
)
```
In our router, we might want to disable routes based on authentication state. We can do this by conditionally (based on the value of `loggedIn`) rendering a redirect. We also (usually) will want to prevent rendering the main router before authentication state has loaded (aka. `isLoading`).

```js
import React, { Component } from 'react'
import { AuthConsumer } from 'blockstack-react-auth-provider'
import { Loading } from '~/components'
import { Feed, SomeOtherPage, Account, FourOFour } from '~/pages'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

export default class Router extends Component {
  render() {
    return (
      <AuthConsumer>
        {({ state: { isLoading, loggedIn } }) => (
          isLoading
            ? <Loading />
            : (
              <BrowserRouter>
                <Switch>

                  <Route
                    exact
                    path='/'
                    component={ Feed }
                  />

                  <Route
                    path='/some-other-page'
                    component={ SomeOtherPage }
                  />

                  <Route
                    path='/account'
                    component={
                      loggedIn
                        ? Account
                        : () => <Redirect to='/' />
                    }
                  />

                  <Route component={ FourOFour } />

                </Switch>
              </BrowserRouter>
            )
        )}
      </AuthConsumer>
    )
  }
}
```


#### 4) Enjoy using the library & let me know if you come across any bugs. Thanks!



###### This library has been released under the [MIT license](https://mit-license.org/)