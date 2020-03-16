import React, { Component } from 'react';
import Axios from "axios";
import Cookies from 'js-cookie'

const baseUrl = {
  development: "http://localhost:3000",
  test: "http://localhost:8081",
  production: "http://localhost:8082"
};

const http = Axios.create({
  baseURL: baseUrl[process.env.NODE_ENV],
  timeout: 5000
});

/**
 * 请求拦截
 * 1.需统一发送数据
 */
http.interceptors.request.use(
  function(response) {
    //每次发送请求验证token
    let getLoginToken = Cookies.get('_piao_token');
    if(getLoginToken){
      response.headers['_Piao-Token'] = getLoginToken;
    }
    return response;
  },
  function(err) {
    return Promise.reject(err);
  }
);
/**
 * 添加响应拦截器
 * 1.需统一处理错误
 */
http.interceptors.response.use(
  function(response) {
    if(response.data.code === 1 || response.data.code === 2){
      //未登录或过期
      setTimeout(()=>{
        window.location.href = '/login';
      },1500)
    }
    return response.data;
  },
  function(err) {
    return Promise.reject(err);
  }
);

export const GET = (url, params) => http.get(url, { params });
export const POST = (url, params) => http.post(url, params);
Component.prototype.$http = http;
