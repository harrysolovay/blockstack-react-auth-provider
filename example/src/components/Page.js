import React from 'react'
import { Nav } from '~/components'

export default ({ children }) => (
  <div>
    <Nav />
    { children }
  </div>
)