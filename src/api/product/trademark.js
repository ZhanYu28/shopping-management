import request from '@/utils/request'

// http://39.98.123.211:8510
// 获取商标列表
export const reqTrademarkList = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' })

// 添加或更新商标
export const reqAddOrUpdataTrademark = (tmFrom) => {
  // 存在id为编辑商标
  if (tmFrom.id) {
    return request({ url: '/admin/product/baseTrademark/update', method: 'put', data: tmFrom })
  } else {
    // 新增商标
    return request({ url: '/admin/product/baseTrademark/save', method: 'post', data: tmFrom })
  }
}

// 删除商标
export const reqDeleteTrademark = (id) => request({ url: `/admin/product/baseTrademark/remove/${id}`, method: 'delete' })
