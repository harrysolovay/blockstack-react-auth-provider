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
          to='/search'
          children='search'
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