import store from '../store'
import decode from 'jwt-decode'

export function verifyLoggedIn() { 
  const jwt = store.getters.jwt
  try {
    const decoded = decode(jwt)
    const now = Date.now() / 1000
    return (decoded.exp < now) ? false : true
  } catch (e) {
    return false
  }
}

export function isLoggedIn (to, from, next) {
  if (verifyLoggedIn()) {
    next()
  } else {
    next(`/sign-in?next=${to.path}`)
  }
}
