import request from '@/utils/request'

// =========================spuForm=========================
// 请求spu列表数据
export const reqSpuList = (page, limit, category3Id) => request({ url: `/admin/product/${page}/${limit}`, method: 'get', params: { category3Id }})
// 获取spu基本信息
export const reqGetBaseSpuInfo = (spuId) => request({ url: `/admin/product/getSpuById/${spuId}`, method: 'get' })
// 获取品牌列表数据
export const reqGetTrademarkList = () => request({ url: '/admin/product/baseTrademark/getTrademarkList', method: 'get' })
// 获取spu图片列表
export const reqGetSpuImageList = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })
// 获取基本销售属性
export const reqBaseSaleAttrList = () => request({ url: '/admin/product/baseSaleAttrList', method: 'get' })
// 保存或更新spu信息
export const reqSaveOrUpdataSpu = (data) => {
  if (data.id) {
    return request({ url: '/admin/product/updateSpuInfo', method: 'post', data })
  } else {
    return request({ url: '/admin/product/saveSpuInfo', method: 'post', data })
  }
}
// 删除spu
export const reqDeleteSpu = (spuId) => request({ url: `/admin/product/deleteSpu/${spuId}`, method: 'delete' })

// ========================skuForm==========================
// 获取spu图片列表（reqGetSpuImageList）
// 获取spu的销售属性
export const reqGetSpuSaleAttrList = (spuId) => request({ url: `/admin/product/spuSaleAttrList/${spuId}`, method: 'get' })
// 获取平台属性列表
export const reqGetAttrList = (category1Id, category2Id, category3Id) => request({
  url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
  method: 'get' })
// 保存sku信息
export const reqSaveSkuInfo = (data) => request({ url: '/admin/product/saveSkuInfo', method: 'post', data })
// 获取sku信息
export const reqGetSkuInfoList = (spuId) => request({ url: `/admin/product/findBySpuId/${spuId}`, method: 'get' })
