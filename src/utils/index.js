import store from '../store'

export function isLoggedIn (to, from, next) {
  const jwt = store.getters.jwt
  if (jwt) {
    next()
  } else {
    next('/')
  }
}
