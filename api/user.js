import { request } from '@/plugins/request'


// 用户登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data
  })
}

// 用户注册
export const register = data => {
  return request({
    method: 'POST',
    url: '/api/users',
    data
  })
}

// 用户信息更新
export const updateInfo = data => {
  return request({
    method: 'PUT',
    url: '/api/user',
    data
  })
}
