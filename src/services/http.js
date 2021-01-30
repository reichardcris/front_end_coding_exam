/* eslint-disable */
// import Vue from 'vue';
import axios from 'axios';
import { Notify } from 'quasar';
// import router from 'src/router';
import { map, each, forOwn, get } from 'lodash';

const HTTP_API = (baseURL = null, opts = {}) => {
  let token = null;

  const httpInstance = axios.create({
    baseURL: baseURL ?? `${process.env.WEB_ENDPOINT}/api`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    ...opts,
  });

  httpInstance.interceptors.response.use(response => response, error => {
    if (error.response.status === 401) {
      Notify.create({
        message: 'Unauthorized',
        color: 'negative',
        icon: 'warning',
      });
    }
    else if (error.response.status === 422) {
      if (error.response.data.errors) {
        const errorMessages = [];
        map(
          error.response.data.errors,
          obj => forOwn(
            obj,
            value => errorMessages.push(value),
          ),
        );
        each(errorMessages, v => {
          Notify.create({
            message: v,
            color: 'negative',
            icon: 'warning',
          });
        });
      }
      else {
        Notify.create({
          message: get(error, 'response.data.message', 'Server Error'),
          color: 'negative',
          icon: 'warning',
        });
      }
    }
    else if (error.response.status === 500 || error.response.status === 501) {
      Notify.create({
        message: get(error, 'response.data.message', 'Server Error'),
        color: 'negative',
        icon: 'warning',
      });
    }
    return Promise.reject(error.response);
  });

  return httpInstance;
};

export {
  HTTP_API,
};
