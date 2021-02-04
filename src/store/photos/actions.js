import { HTTP_API } from 'src/services/http'
import { isEmpty } from 'lodash'

export const fetch = ({ commit }, id) => {
  HTTP_API().get('photos')
    .then(({ data }) => {
      if (isEmpty(localStorage.getItem('photos'))) {
        localStorage.setItem('photos', JSON.stringify(data))
      }
      commit('SET_PAYLOAD', JSON.parse(localStorage.getItem('photos')))
    })
}

export const updateItem = ({ commit }, payload) => {
  localStorage.setItem('photos', JSON.stringify(payload))
  commit('SET_PAYLOAD', payload)
}
