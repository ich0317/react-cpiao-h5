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
    response.headers['_Piao-Token'] = Cookies.get('_piao_token');
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
    if(response.data.code === 20001){
      //未登录
    }else if(response.data.code === 20002){
      //登录过期
    }
    return response.data;
  },
  function(err) {
    return Promise.reject(err);
  }
);

export const GET = (url, params) => http.get(url, { params });
export const POST = (url, params) => http.post(url, params);
