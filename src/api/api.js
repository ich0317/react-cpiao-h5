import { GET, POST } from "./http.js"

//登录
export const piaoLogin = (params) => POST('/api/piaoLogin', params)

//首页获取影片
export const getPiaoFilm = (params) => GET('/api/getPiaoFilm', params)
//首页获取影院信息
export const getPiaoCinemas = (params) => GET('/api/getPiaoCinemas', params)
//获取城市列表
export const getCityList = (params) => GET('/api/getPiaoCitys', params)
//影院排期
export const getCinemaSessions = (params) => GET('/api/getPiaoCinemaSessions', params)
//获取影院座位图
export const getSeatMap = (params) => POST('/api/getPiaoSeatMap', params)
//创建订单
export const createOrder = (params) => POST('/api/createPiaoOrder', params)
//获取订单详情
export const getOrderDetail = (params) => GET('/api/getPiaoOrderDetail', params)
//订单支付
export const payOrder = (params) => POST('/api/piaoPayOrder', params)
//订单过期
export const payExpire = (params) => POST('/api/piaoPayExpire', params)
//获取登录信息
export const getLoginInfo = (params) => GET('/api/getPiaoLoginInfo', params)
//获取订单列表
export const getList = (params) => GET('/api/getPiaoList', params)
