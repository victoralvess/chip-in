import uniqBy from 'lodash.uniqby'

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
