import { HTTP_API } from 'src/services/http'

export const requestUsersFromApi = ({ commit }) =>
  HTTP_API().post('/fetch')
    .then(({ data }) => commit('setUserData', data))

export const requestAlbumsFromApi = ({ commit }, id) =>
  HTTP_API().post(`/findAlbum/${id}`)
    .then(({ data }) => commit('setAlbumData', data))

export const requestDeleteAlbumsFromApi = ({ commit }, { userId, albumId }) =>
  HTTP_API().post(`deleteAlbum/${userId}/${albumId}`)
    .then(({ data }) => commit('setAlbumData', data))

export const requestPhotoFromApi = ({ commit }, id) =>
  HTTP_API().post(`/findPhoto/${id}`)
    .then(({ data }) => commit('setPhotoData', data))

export const requestDeletePhotoFromApi = ({ commit }, { userId, photoId }) =>
  HTTP_API().post(`deletePhoto/${userId}/${photoId}`)
    .then(({ data }) => commit('setAlbumData', data))
