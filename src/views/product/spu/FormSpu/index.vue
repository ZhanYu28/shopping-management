<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">
        <el-input v-model="spu.spuName" placeholder="SPU名称" />
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="spu.tmId" placeholder="请选择品牌">
          <el-option
            v-for="tm in trademark"
            :key="tm.id"
            :label="tm.tmName"
            :value="tm.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          v-model="spu.description"
          type="textarea"
          placeholder="SPU描述"
          rows="4"
        />
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="spuImageList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleUploadSuccess"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select v-model="saleAttrNameAndId" :placeholder="`还有${unSelectSaleAttr.length}个未选择`">
          <el-option v-for="sale in unSelectSaleAttr" :key="sale.id" :label="sale.name" :value="`${sale.name}:${sale.id}`" />
        </el-select>
        <el-button type="primary" icon="el-icon-plus" @click="addSaleAttr">添加销售属性</el-button>
        <el-table :data="spu.spuSaleAttrList" style="width: 100%">
          <el-table-column
            prop="prop"
            label="序号"
            width="width"
            type="index"
          />
          <el-table-column
            prop="saleAttrName"
            label="属性名"
            width="width"
          />
          <el-table-column
            prop="spuSaleAttrValueList"
            label="属性值名称列表"
            width="width"
          >
            <template slot-scope="{row,$index}">
              <el-tag
                v-for="(attrValue,index) in row.spuSaleAttrValueList"
                :key="attrValue.id"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index,1)"
              >
                {{ attrValue.saleAttrValueName }}
              </el-tag>
              <el-input
                v-if="row.inputVisible"
                :ref="$index"
                v-model="inputValue"
                class="input-new-tag"
                size="small"
                @keyup.enter.native="handleInputConfirm(row)"
                @blur="handleInputConfirm(row)"
              />
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput(row,$index)"
              >添加</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="prop"
            label="操作"
            width="width"
          >
            <template slot-scope="{$index}">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="spu.spuSaleAttrList.splice($index,1)" />
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="saveOrUpdataSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'FromSpu',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      saleAttrNameAndId: '',
      saleAttrList: [],
      spu: {
        category3Id: 0,
        description: '',
        spuImageList: [],
        spuName: '',
        spuSaleAttrList: [],
        tmId: ''
      },
      trademark: [],
      spuImageList: [],
      inputVisible: false,
      inputValue: ''
    }
  },
  computed: {
    unSelectSaleAttr() {
      return this.saleAttrList.filter(item => {
        const name = item.name
        return this.spu.spuSaleAttrList.every(item =>
          item.saleAttrName !== name
        )
      })
    }
  },
  methods: {
    // 删除图片
    handleRemove(file, fileList) {
      this.spuImageList = fileList
    },
    // 预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 添加图片
    handleUploadSuccess(response, file, fileList) {
      this.spuImageList = fileList
    },
    // 场景0添加spu按钮
    async addSpuData(category3Id) {
      this.spu.category3Id = category3Id
      // 获取所有品牌
      const trademark = await this.$Api.spu.reqGetTrademarkList()
      if (trademark.code === 200) {
        this.trademark = trademark.data
      }

      // 获取销售属性
      const saleAttr = await this.$Api.spu.reqBaseSaleAttrList()
      if (saleAttr.code === 200) {
        this.saleAttrList = saleAttr.data
      }
    },
    // 初始化数据
    async initSpuData(row) {
      // 获取基本spu信息
      const spuInfo = await this.$Api.spu.reqGetBaseSpuInfo(row.id)
      if (spuInfo.code === 200) {
        this.spu = spuInfo.data
      }

      // 获取所有品牌
      const trademark = await this.$Api.spu.reqGetTrademarkList()
      if (trademark.code === 200) {
        this.trademark = trademark.data
      }

      // 获取spu图片
      const spuImage = await this.$Api.spu.reqGetSpuImageList(row.id)
      if (spuImage.code === 200) {
        const newImageList = spuImage.data
        newImageList.forEach((item) => {
          item.name = item.imgName
          item.url = item.imgUrl
        })
        this.spuImageList = newImageList
      }

      // 获取销售属性
      const saleAttr = await this.$Api.spu.reqBaseSaleAttrList()
      if (saleAttr.code === 200) {
        this.saleAttrList = saleAttr.data
      }
    },
    // 添加属性值按钮
    showInput(row, index) {
      this.$set(row, 'inputVisible', true)

      this.$nextTick(_ => {
        this.$refs[index].$refs.input.focus()
      })
    },
    // 添加属性值输入框失去焦点
    handleInputConfirm(row) {
      const inputValue = this.inputValue
      if (inputValue.trim()) {
        const unRepeat = row.spuSaleAttrValueList.every(item => item.saleAttrValueName !== inputValue.trim())
        if (unRepeat) {
          row.spuSaleAttrValueList.push({ saleAttrValueName: inputValue, baseSaleAttrId: row.baseSaleAttrId })
        } else {
          console.log('重复')
        }
      }
      row.inputVisible = false
      this.inputValue = ''
    },
    // 添加销售属性按钮
    addSaleAttr() {
      const [saleAttrName, baseSaleAttrId] = this.saleAttrNameAndId.split(':')
      this.spu.spuSaleAttrList.push({ saleAttrName, baseSaleAttrId, spuSaleAttrValueList: [] })
      this.saleAttrNameAndId = ''
    },
    // 保存或更新spu
    async saveOrUpdataSpu() {
      this.spu.spuImageList = this.spuImageList.map(item => {
        return {
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.url
        }
      })
      const result = await this.$Api.spu.reqSaveOrUpdataSpu(this.spu)
      if (result.code === 200) {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.$emit('changeScence', { scence: 0, flag: this.spu.id ? '更新' : '添加' })
      }
      Object.assign(this.$data, this.$options.data())
    },
    // 取消按钮
    cancel() {
      this.$emit('changeScence', { scence: 0, flag: this.spu.id ? '更新' : '添加' })
      Object.assign(this.$data, this.$options.data())
    }
  }
}
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
