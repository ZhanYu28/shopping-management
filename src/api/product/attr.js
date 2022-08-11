import request from '@/utils/request'
// 获取分类一列表数据
export const reqGetCategory1List = () => request({ url: '/admin/product/getCategory1', method: 'get' })
// 获取分类二列表数据
export const reqGetCategory2List = (category1Id) => request({ url: `/admin/product/getCategory2/${category1Id}`, method: 'get' })
// 获取分类三列表数据
export const reqGetCategory3List = (category2Id) => request({ url: `/admin/product/getCategory3/${category2Id}`, method: 'get' })
// 获取商品属性列表
export const reqGetAttrList = (category1Id, category2Id, category3Id) => request({
  url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
  method: 'get' })
// 保存属性值到服务器
export const reqSaveAttrValue = (data) => request({ url: '/admin/product/saveAttrInfo', method: 'post', data })
// 删除属性
export const reqDeleteAttr = (attrId) => request({ url: `/admin/product/deleteAttr/${attrId}`, method: 'delete' })
