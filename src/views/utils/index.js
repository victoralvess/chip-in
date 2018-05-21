import store from '@/store'
import uniqBy from 'lodash.uniqby'
import axios from 'axios'

export function addGoal(list = [], goal) {
  if (list.length) {
    const { id } = goal
    const index = list.findIndex(g => g.id === id)
    if (index > -1) {
      list = uniqBy([
        ...list.slice(0, index),
        goal,
        ...list.slice(index + 1)
      ], 'id')
    } else {
      list.push(goal)
    }
  } else {
    list = [ goal ]
  }

  return list
}

export async function removeSession() {
  const { dispatch } = store
  dispatch('user', null)
  dispatch('jwt', null)
  try {
    await axios.get('/sign-out')
  } catch (e) {}
}

export async function handleErrorRedirect(code = 500, message = 'Server Error. Try Again Soon.', signOut = false) {
  if (signOut) {
    await removeSession()
  }

  return {
    name: 'error',
    params: {
      code,
      message
    }
  }
}
