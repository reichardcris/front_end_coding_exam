import { HTTP_API } from 'src/services/http'
import { isEmpty } from 'lodash'

export const fetch = ({ commit }) =>
  HTTP_API().get('users')
    .then(({ data }) => {
      // localStorage.setItem('users', JSON.stringify(data))
      if (isEmpty(localStorage.getItem('users'))) {
        localStorage.setItem('users', JSON.stringify(data))
      }
      commit('SET_PAYLOAD', JSON.parse(localStorage.getItem('users')))
    })
