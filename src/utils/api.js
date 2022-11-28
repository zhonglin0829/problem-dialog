import axios from 'axios'
const instance = axios.create({
  baseURL: "/blog",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  timeout:10000
})
// 请求拦截器
instance.interceptors.request.use(config=>{
  // 在发送请求之前做些什么
  //判断当请求路径不是登录和注册的接口（或其他不需要token的接口）时，传递token
  if(!['/user/login','/user/register'].includes(config.url)){
    const token = localStorage.getItem('token')
    config.headers['x-token'] = token
  }
  return config
},error=>{
  // 对请求错误做些什么
  return Promise.reject(error);
})
//添加响应拦截器
instance.interceptors.response.use(res=>{
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  // ElMessage({
  //   showClose:true,
  //   type:'error',
  //   message:'fasdfas'
  // })
  return res.data
},err=>{
  let msg = err.message
  if(msg.includes('Network Error')){
    msg = '后端接口连接异常'
  }else if (msg.includes("timeout")) {
    msg = '系统接口请求超时'
  }else if (msg.includes("Request failed with status code")) {
    msg = "系统接口" + msg.substr(msg.length - 3) + "异常"
  }
  ElMessage({
    type:'error',
    message:msg,
    duration: 5 * 1000
  })
  return Promise.reject(err)
})
export function apiGet(url, params) {
  return instance.get(url, {
    params,
  })
}

export function apiGetFrom(url, params) {
  return instance({
    url: url,
    method: "get",
    params: params,
    responseType: 'blob'
  })
}
export function apiPost(url, params,config) {
  // return instance.post(url, paramsSerializer(params));
  // config  用于终止请求的cancelToken
  return instance({
    url:url,
    method:'post',
    data:params,
    cancelToken:config?.cancelToken
  })
}

export function apiFrom(url, params) {
  return instance({
    url: url,
    method: "post",
    data: params,
  });
}