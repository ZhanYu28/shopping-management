<template>
  <div>
    <el-form ref="form" label-width="100px">
      <el-form-item label="SPU名称：">
        {{ spu.spuName }}
      </el-form-item>
      <el-form-item label="SKU名称：">
        <el-input v-model="skuInfo.skuName" />
      </el-form-item>
      <el-form-item label="价格(元)：">
        <el-input v-model="skuInfo.price" type="number" />
      </el-form-item>
      <el-form-item label="重量(千克)：">
        <el-input v-model="skuInfo.weight" type="number" />
      </el-form-item>
      <el-form-item label="规格描述：">
        <el-input v-model="skuInfo.skuDesc" type="textarea" rows="4" />
      </el-form-item>
      <el-form-item label="平台属性：">
        <el-form ref="form" :inline="true" label-width="80px">
          <el-form-item
            v-for="attr in attrList"
            :key="attr.id"
            :label="attr.attrName"
            style="margin-bottom: 10px"
          >
            <el-select v-model="attr.attrIdAndValueId" placeholder="请选择">
              <el-option
                v-for="attrValue in attr.attrValueList"
                :key="attrValue.id"
                :label="attrValue.valueName"
                :value="`${attr.id}:${attrValue.id}`"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性：">
        <el-form ref="form" :inline="true" label-width="80px">
          <el-form-item
            v-for="sale in saleAttrList"
            :key="sale.id"
            :label="sale.saleAttrName"
          >
            <el-select v-model="sale.saleIdAndValueId" placeholder="请选择">
              <el-option
                v-for="saleValue in sale.spuSaleAttrValueList"
                :key="saleValue.id"
                :label="saleValue.saleAttrValueName"
                :value="`${sale.id}:${saleValue.id}`"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          :data="spuImageList"
          style="width: 100%; margin-bottom: 30px"
          @selection-change="handleSelectionChange"
        >
          <el-table-column width="width" type="selection" />
          <el-table-column label="图片" width="300px">
            <template slot-scope="{ row }">
              <img
                :src="row.imgUrl"
                :alt="row.imgName"
                style="width: 100px; height: 100px"
              >
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width" />
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row }">
              <el-button
                v-if="row.isDefault == 0"
                type="primary"
                size="mini"
                @click="setDefault(row)"
              >设为默认</el-button>
              <el-tag v-else type="success" disable-transitions>默认</el-tag>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="saveSkuInfo">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'FormSku',
  data() {
    return {
      skuInfo: {
        category3Id: 0,
        price: '',
        skuDefaultImg: '',
        skuDesc: '',
        skuName: '',
        spuId: 0,
        tmId: 0,
        weight: '',
        skuAttrValueList: [
          {
            attrId: 0,
            valueId: 0
          }
        ],
        skuImageList: [],
        skuSaleAttrValueList: [
          {
            saleAttrId: 0,
            saleAttrValueId: 0
          }
        ]
      },
      attrList: [],
      saleAttrList: [],
      spuImageList: [],
      spu: {},
      selectedImageList: []
    }
  },
  methods: {
    async getInitData(category1Id, category2Id, spu) {
      Object.assign(this.$data, this.$options.data())
      this.spu = spu
      this.skuInfo.category3Id = spu.category3Id
      this.skuInfo.spuId = spu.id
      this.skuInfo.tmId = spu.tmId
      // 获取平台属性
      const attrResult = await this.$Api.spu.reqGetAttrList(
        category1Id,
        category2Id,
        spu.category3Id
      )
      if (attrResult.code === 200) {
        this.attrList = attrResult.data
      }

      // 获取销售属性
      const saleResult = await this.$Api.spu.reqGetSpuSaleAttrList(spu.id)
      if (saleResult.code === 200) {
        this.saleAttrList = saleResult.data
      }

      // 获取spu图片列表
      const ImageResult = await this.$Api.spu.reqGetSpuImageList(spu.id)
      if (ImageResult.code === 200) {
        const newImageList = ImageResult.data
        newImageList.forEach((item) => {
          item.isDefault = 0
        })
        this.spuImageList = newImageList
      }
    },
    // 取消按钮
    cancel() {
      this.$emit('changeScences', 0)
    },
    // 设置默认图片
    setDefault(row) {
      this.spuImageList.forEach((item) => {
        item.isDefault = 0
      })
      row.isDefault = 1
      this.skuInfo.skuDefaultImg = row.imgUrl
    },
    // 多选框改变事件
    handleSelectionChange(row) {
      this.selectedImageList = row
    },
    // 保存sku
    async saveSkuInfo() {
      const { skuInfo, attrList, saleAttrList, selectedImageList } = this
      // 整理平台属性
      skuInfo.skuAttrValueList = attrList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          const [attrId, valueId] = item.attrIdAndValueId.split(':')
          prev.push({ attrId, valueId })
        }
        return prev
      }, [])
      // 整理销售属性
      skuInfo.skuSaleAttrValueList = saleAttrList.reduce((prev, item) => {
        if (item.saleIdAndValueId) {
          const [saleAttrId, saleAttrValueId] =
            item.saleIdAndValueId.split(':')
          prev.push({ saleAttrId, saleAttrValueId })
        }
        return prev
      }, [])
      // 整理图片数据
      skuInfo.skuImageList = selectedImageList.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id
        }
      })
      const result = await this.$Api.spu.reqSaveSkuInfo(skuInfo)
      if (result.code === 200) {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.$emit('changeScences', 0)
      }
    }
  }
}
</script>

<style>
</style>
