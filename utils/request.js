/**
 * 基于 axios 封装的请求模块
 */

import Axios from "axios";

const request = Axios.create({
  baseURL: 'https://conduit.productionready.io'
})

export default request;