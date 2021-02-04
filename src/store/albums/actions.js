import { HTTP_API } from 'src/services/http'
import { isEmpty } from 'lodash'

export const fetch = ({ commit }, id) => {
  HTTP_API().get('albums')
    .then(({ data }) => {
      if (isEmpty(localStorage.getItem('albums'))) {
        localStorage.setItem('albums', JSON.stringify(data))
      }
      commit('SET_PAYLOAD', JSON.parse(localStorage.getItem('albums')))
    })
}

export const updateItem = ({ commit }, payload) => {
  localStorage.setItem('albums', JSON.stringify(payload))
  commit('SET_PAYLOAD', payload)
}
