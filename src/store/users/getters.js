import { isEmpty } from 'lodash'

export const getPayload = ({ payload }, getters, rootState, rootGetters) => {
  return isEmpty(payload)
    ? JSON.parse(localStorage.getItem('users'))
    : payload
}
