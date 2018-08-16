import React from 'react'
import { AuthConsumer } from 'blockstack-react-auth-provider'
import { Page } from '~/components'

export default () => (
  <AuthConsumer>
    {({ state: { name, username }, logOut }) => (
      <Page>
        account:
        <br />
        name: { name }
        <br />
        username: { username }
        <br />
        <button
          children='log out'
          onClick={ logOut }
        />
      </Page>
    )}
  </AuthConsumer>
)