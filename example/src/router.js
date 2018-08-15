import React, { Component } from 'react'
import { AuthConsumer } from 'blockstack-react-provider'
import { Loading } from '~/components'
import { Feed, Search, Account, FourOFour } from '~/pages'
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
                    path='/search'
                    component={ Search }
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