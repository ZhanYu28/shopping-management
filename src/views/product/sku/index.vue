<template>
  <div>
    <el-table :data="skuInfo.records" style="width: 100%">
      <el-table-column label="序号" width="width" type="index" align="center" />
      <el-table-column prop="skuName" label="名称" width="width" />
      <el-table-column prop="skuDesc" label="描述" width="width" />
      <el-table-column label="默认图片" width="width">
        <template slot-scope="{ row }">
          <img :src="row.skuDefaultImg" style="width: 100px; height: 100px">
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="width" />
      <el-table-column prop="price" label="价格" width="width" />
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button
            v-if="row.isSale == 1"
            type="success"
            icon="el-icon-bottom"
            size="mini"
            @click="cancelSale(row)"
          />
          <el-button
            v-else
            type="info"
            icon="el-icon-top"
            size="mini"
            @click="onSale(row)"
          />
          <el-button type="primary" icon="el-icon-edit" size="mini" />
          <el-button
            type="info"
            icon="el-icon-info"
            size="mini"
            @click="showSku(row)"
          />
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteSku(row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="page"
      :page-sizes="[10, 20, 50]"
      :page-size="limit"
      layout=" prev, pager, next, jumper, ->, sizes, total"
      :total="skuInfo.total"
      style="text-align: center"
      @size-change="handleSizeChange"
      @current-change="getSkuInfo"
    />
    <el-drawer :visible.sync="drawer" :show-close="false" size="50%">
      <el-row :gutter="20">
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ sku.skuName }}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ sku.skuDesc }}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ sku.price }}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="5">平台属性</el-col>
        <el-tag
          v-for="sale in sku.skuSaleAttrValueList"
          :key="sale.id"
          type="success"
        >{{ sale.saleAttrValueName }}</el-tag>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel trigger="click" height="500px">
            <el-carousel-item v-for="item in sku.skuImageList" :key="item.id">
              <img :src="item.imgUrl" :alt="item.imgName">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'ManageSku',
  data() {
    return {
      skuInfo: {
        records: []
      },
      page: 1,
      limit: 10,
      drawer: false,
      sku: {}
    }
  },
  mounted() {
    this.getSkuInfo()
  },
  methods: {
    // 获取sku列表数据
    async getSkuInfo(pages = 1) {
      this.page = pages
      const { page, limit } = this
      const result = await this.$Api.sku.reqSkuList(page, limit)
      if (result.code === 200) {
        this.skuInfo = result.data
      }
    },
    // 页面显示条数变化事件
    handleSizeChange(limit) {
      this.limit = limit
      this.getSkuInfo()
    },
    // 下架
    async cancelSale(row) {
      try {
        await this.$Api.sku.reqCancelSale(row.id)
        this.$message({
          message: '下架成功',
          type: 'success'
        })
        this.getSkuInfo(this.page)
      } catch (error) {
        console.log('下架失败', error)
      }
    },
    // 上架
    async onSale(row) {
      try {
        await this.$Api.sku.reqOnSale(row.id)
        this.$message({
          message: '上架成功',
          type: 'success'
        })
        this.getSkuInfo(this.page)
      } catch (error) {
        console.log('上架失败', error)
      }
    },
    // 预览sku
    async showSku(row) {
      const result = await this.$Api.sku.reqSkuInfo(row.id)
      if (result.code === 200) {
        this.sku = result.data
        this.drawer = true
      }
    },
    // 删除sku
    async deleteSku(row) {
      try {
        await this.$Api.sku.reqDeleteSku(row.id)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getSkuInfo(this.skuInfo.records.length < 2 ? this.page - 1 : this.page)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
.el-row {
  margin: 10px 0;
}
.el-row .el-col-5 {
  text-align: right;
  font-size: 20px;
  font-weight: bold;
}
.el-row .el-col-16 {
  line-height: 23px;
  color: #6a6a6a;
}
.el-row .el-tag {
  margin-right: 10px;
}

.el-carousel__item img {
    margin: 0;
    border: 1px solid #6a6a6a;
    width: 100%;
  }

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
>>>.el-carousel__button{
  width: 10px;
  height: 10px;
  background: pink;
  border-radius: 50%;
}
>>>.is-active .el-carousel__button{
  background: purple;
}
</style>
