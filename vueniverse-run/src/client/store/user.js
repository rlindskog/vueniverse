import axios from '~plugins/axios'
import Cookies from 'js-cookie'

export const state = () => {
  return {
    isAuthenticated: false,
    token: '',
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    signUpPending: false,
    signInPending: false,
    signOutPending: false
  }
}

export const mutations = {
  SIGN_UP_REQUEST (state) {
    state.signUpPending = true
    console.log('Sign Up pending...')
  },
  SIGN_UP_SUCCESS (state, user) {
    console.log('Sign Up success!')
    state.signUpPending = false
  },
  SIGN_UP_FAILURE (state, error) {
    console.log('Sign Up Failure.')
    console.error(error)
    state.signUpPending = false
  },
  SIGN_IN_REQUEST (state) {
    state.signInPending = false
    console.log('Sign In pending...')
  },
  SIGN_IN_SUCCESS (state, data) {
    if (process.BROWSER_BUILD) {
      Cookies.set('token', `${data.token}`)
    }
    state.username = data.user.username
    state.firstName = data.user.firstName
    state.lastName = data.user.lastName
    state.email = data.user.email
    state.token = data.token
    state.isAuthenticated = true
    console.log('Sign In success!')
    state.signInPending = false
    // $router.replace({ name: 'users-username', params: { username: state.user.username } })
  },
  SIGN_IN_FAILURE (state, error) {
    console.log('Sign Up Failure.')
    state.signInPending = false
    console.error(error)
  },
  SIGN_OUT_REQUEST (state) {
    // send post request to revoke token.
    console.log('Sign out request pending....')
    state.signOutPending = true
  },
  SIGN_OUT_SUCCESS (state) {
    Cookies.remove('token')
    state.isAuthenticated = false
    state.token = ''
    state.username = ''
    state.firstName = ''
    state.lastName = ''
    state.email = ''
    state.signOutPending = false
    console.log('Sign out success!')
  },
  SIGN_OUT_FAILURE (state, error) {
    state.signOutPending = false
    console.error(error)
  }
}

export const actions = {
  async signUp ({ commit }, payload) {
    try {
      commit('SIGN_UP_REQUEST')
      let { data } = await axios.post('/users', payload)
      commit('SIGN_UP_SUCCESS', data)
    } catch (error) {
      commit('SIGN_UP_FAILURE', error)
    }
  },
  async signIn ({ commit }, payload) {
    try {
      commit('SIGN_IN_REQUEST')
      let { data } = await axios.post('/users/sign-in', payload)
      commit('SIGN_IN_SUCCESS', data)
    } catch (error) {
      commit('SIGN_IN_FAILURE', error)
    }
  },
  async signOut ({ commit }) {
    try {
      commit('SIGN_OUT_REQUEST')
      // let { data } = await axios.post('/users/sign-out')
      commit('SIGN_OUT_SUCCESS')
    } catch (error) {
      commit('SIGN_OUT_FAILURE', error)
    }
  }
}
