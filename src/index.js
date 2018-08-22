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




class InitialAuthProvider extends Component {


  state = INITIAL_STATE


  render() {

    const {
      state,
      logIn,
      logOut,
      refresh,
    } = this

    return (
      <Provider
        value={{
          state,
          logIn,
          logOut,
          refresh,
        }}
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


  refresh = async () => {

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




export class LOCAuthProvider extends Component {
  render() {
    return this.props.children
  }
  componentDidMount() {
    this.props.refresh()
  }
}




export class AuthProvider extends Component {
  render() {
    <InitialAuthProvider>
      {(props) => (
        <LOCAuthProvider
          { ...{
            ...props,
            ...this.props
          }}
        />
      )}
    </InitialAuthProvider>
  }
}