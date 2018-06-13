/**
    Author: earl
    Create Time: 2018-06-03 18:50
**/
import axios from 'axios'
import qs from 'qs'
import {baseURL} from "./url"
import {getStore} from '../utils/save_util'

axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
});

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
});

function checkStatus(response) {
// 如果http状态码正常，则直接返回数据
  if (response) {
    return response;
  }
  return {// 这里已经包括网络错误，服务器错误，后端抛出的错误，可以弹出一个错误提示，告诉用户
    data: {
      code: 1,
      msg: '网络异常！'
    }
  }
}

function checkCode(res, url, params) {
  if (res.data) res = res.data;
  if (res.code || res.code !== 0) {
//异常监控上报
    uploadLog(res, url, params);
    try {
      res.msg = res.msg ? res.msg : '网络异常！';
    } catch (e) {
      res = {
        code: 1,
        msg: '网络异常！'
      }
    }
  }
  return res;
}

function uploadLog(res, url, send_params) {
  let status = res.code;
  if (!res.code) status = 1;
//异常监控上报
  axios.get('http://xes-zxxb.cn-beijing.log.aliyuncs.com/logstores/app_log/track.gif', {
    params: {
      APIVersion: '0.6.0',
      device_model: window.navigator.appVersion,
      __topic__: url,
      __level__: 'error',
      __device__: 'web',
      _params_: send_params,
      status: status,
      url: url,
      app_version: 1.0
    }
  }).then(res => {
  });
}

export default {
  post(url, params) {
    return axios({
      headers: {},
      method: 'post',
      baseURL: baseURL,
      url,
      data: qs.stringify(params),
      timeout: 10000
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res, url, params)
      }
    )
  },

  get(url, params) {
    return axios({
      method: 'get',
      baseURL: baseURL,
      url,
      params,
      timeout: 10000,
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res, url, params)
      }
    )
  }
}
