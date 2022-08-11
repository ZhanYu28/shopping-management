import request from '@/utils/request'

// http://39.98.123.211:8170/admin/acl/index/login
export function login(data) {
  return request({
    url: '/admin/acl/index/login',
    method: 'post',
    data
  })
}

// http://39.98.123.211:8170/admin/acl/index/info
export function getInfo(token) {
  return request({
    url: '/admin/acl/index/info',
    method: 'get',
    params: { token }
  })
}

// http://39.98.123.211:8170/admin/acl/index/logout
export function logout() {
  return request({
    url: '/admin/acl/index/logout',
    method: 'post'
  })
}

// 获取用户列表
export const getPageList = (page, limit, searchObj) => request({ url: `/admin/acl/user/${page}/${limit}`, method: 'get', params: searchObj })
// 添加用户
export const add = (data) => request({ url: '/admin/acl/user/save', method: 'post', data })
// 更新用户
export const update = (data) => request({ url: '/admin/acl/user/update', method: 'put', data })
// 删除用户
export const removeById = (id) => request({ url: `/admin/acl/user/remove/${id}`, method: 'delete' })
// 批量删除
export const removeUsers = (data) => request({ url: '/admin/acl/user/batchRemove', method: 'delete', data })
// 获取用户角色列表
export const getRoles = (userId) => request({ url: `/admin/acl/user/toAssign/${userId}`, method: 'get' })
// 分配角色
export const assignRoles = (userId, roleId) => request({ url: '/admin/acl/user/doAssign', method: 'post', params: { userId, roleId }})
