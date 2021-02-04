import { isEmpty } from 'lodash'

export const getPayload = ({ payload }) => {
  return isEmpty(payload)
    ? JSON.parse(localStorage.getItem('albums'))
    : payload
}
