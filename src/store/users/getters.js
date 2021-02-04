export const getPayload = ({ payload }, getters, rootState, rootGetters) => {
  return payload ?? JSON.parse(localStorage.getItem('users'))
}
