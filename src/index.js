import React, {
  createContext,
  Component
} from 'react'

import {
  redirectToSignIn,
  isUserSignedIn,
  isSignInPending,
  handlePendingSignIn,
  loadUserData,
  signUserOut
} from 'blockstack'




const INITIAL_STATE = {
  isLoading: true,
  loggedIn: false,
  username: null,
  name: null,
}

const {
  Provider,
  Consumer
} = createContext(INITIAL_STATE)




export class AuthConsumer extends Component {
  render() {
    return (
      <Consumer>
        { (props) => this.props.children({ ...props }) }
      </Consumer>
    )
  }
}




export class AuthProvider extends Component {


  state = INITIAL_STATE


  render() {

    const {
      state,
      logIn,
      logOut
    } = this

    return (
      <Provider
        value={{ state, logIn, logOut }}
        { ...this.props }
      />
    )
    
  }


  info = ({
    username,
    profile: {
      name,
    },
  } = loadUserData()) => ({
    username,
    name,
    loggedIn: true,
  })


  async componentDidMount() {

    this.setState((state) => ({
      ...state,
      isLoading: true,
    }))

    if(isSignInPending()) {
      try {
        const user = await handlePendingSignIn()
        if(user) {
          this.setState((state) => ({
            ...state,
            ...this.info(user),
            isLoading: false,
          }))
        }
      } catch(error) {
        console.error(`failed to handle pending sign-in: ${ error }`)
      }
    }
    
    else if(isUserSignedIn()) {
      this.setState((state) => ({
        ...state,
        ...this.info(),
        isLoading: false,
      }))
    }
    
    else {

      if(window.location.pathname.indexOf('account') >= 0) {
        window.location = `${ window.location.protocol }//${ window.location.host }`
      }

      this.setState((state) => ({
        ...state,
        INITIAL_STATE,
        isLoading: false,
      }))

    }

  }


  logIn = () => {
    this.setState((state) => ({
      ...state,
      isLoading: true,
    }))
    const origin = window.location.origin
    redirectToSignIn(origin, `${ origin }/manifest.json`, [ 'store_write', 'publish_data' ])
  }


  logOut = () => {
    signUserOut(window.location.origin)
    this.setState((state) => ({
      ...state,
      INITIAL_STATE,
      isLoading: false,
    }))
  }


}