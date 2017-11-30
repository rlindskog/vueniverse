import axios from '~/plugins/axios'
import Cookies from 'js-cookie'

export const state = () => {
  return {
    isAuthenticated: false,
    token: '',
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    admin: false
  }
}

export const mutations = {
  SIGN_UP_REQUEST (state) {
    state.signUpPending = true
    console.log('Sign Up pending...')
  },
  SIGN_UP_SUCCESS (state, user) {
    console.log('Sign Up success!')
  },
  SIGN_UP_FAILURE (state, error) {
    console.log('Sign Up Failure.')
    console.error(error)
  },
  SIGN_IN_REQUEST (state) {
    state.signInPending = false
    console.log('Sign In pending...')
  },
  SIGN_IN_SUCCESS (state, data) {
    if (process.browser) Cookies.set('token', `${data.token}`)
    state.username = data.user.username
    state.firstName = data.user.firstName
    state.lastName = data.user.lastName
    state.admin = data.user.admin
    state.email = data.user.email
    state.token = data.token
    state.isAuthenticated = true
    console.log('Sign In success!')
  },
  SIGN_IN_FAILURE (state, error) {
    console.log('Sign In Failure.', error.response.data)
    console.error(error)
  },
  SIGN_OUT_REQUEST (state) {
    // send post request to revoke token.
    console.log('Sign out request pending....')
  },
  SIGN_OUT_SUCCESS (state, message) {
    Cookies.remove('token')
    state.isAuthenticated = false
    state.token = ''
    state.username = ''
    state.firstName = ''
    state.lastName = ''
    state.email = ''
    console.log('Sign out success!', message)
  },
  SIGN_OUT_FAILURE (state, error) {
    console.error(error)
  },
  DELETE_USER_REQUEST (state) {
    console.log('Delete user pending...')
  },
  DELETE_USER_SUCCESS (state, message) {
    Cookies.remove('token')
    state.isAuthenticated = false
    Object.keys(state).forEach(key => { if (typeof key === 'string') state[key] = '' })
    console.log('Delete user success!')
  },
  DELETE_USER_FAILURE (error) {
    console.error(error)
  }
}

export const actions = {
  async signUp ({ commit }, payload) {
    try {
      commit('SIGN_UP_REQUEST')
      let { data } = await axios.post('/users', payload)
      commit('SIGN_UP_SUCCESS', data)
      commit('notification/SUCCESS', data, { root: true })
    } catch (error) {
      commit('SIGN_UP_FAILURE', error)
      commit('notification/FAILURE', error.response.data, { root: true })
    }
  },
  async signIn ({ commit }, payload) {
    try {
      commit('SIGN_IN_REQUEST')
      commit('notification/PENDING', null, { root: true })
      let { data } = await axios.post('/users/sign-in', payload)
      commit('SIGN_IN_SUCCESS', data)
      commit('notification/SUCCESS', data, { root: true })
    } catch (error) {
      commit('SIGN_IN_FAILURE', error)
      commit('notification/FAILURE', error.response.data, { root: true })
    }
  },
  async signOut ({ commit }) {
    try {
      commit('SIGN_OUT_REQUEST')
      let { data } = await axios.post('/users/sign-out')
      commit('SIGN_OUT_SUCCESS', data)
      commit('notification/SUCCESS', data, { root: true })
      commit('CLEAR_LISTS', null, { root: true })
    } catch (error) {
      commit('SIGN_OUT_FAILURE', error)
      commit('notification/FAILURE', error.response.data, { root: true })
    }
  },
  async deleteUser ({ state, commit }) {
    try {
      commit('DELETE_USER_REQUEST')
      let { data } = await axios.delete(`/users/${state.username}`)
      commit('DELETE_USER_SUCCESS', data)
      commit('notification/SUCCESS', data, { root: true })
      commit('CLEAR_LISTS', null, { root: true })
    } catch (error) {
      commit('DELETE_USER_FAILURE', error)
      commit('notification/SUCCESS', error.response.data, { root: true })
    }
  }
}
