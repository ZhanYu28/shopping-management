<template>
  <div>
    <el-card class="box-card" style="margin: 20px 0">
      <CategorySelect :show="scence != 0" @getCategoryId="getCategoryId" />
    </el-card>
    <el-card class="box-card" style="margin: 20px 0">
      <div v-show="scence == 0">
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addSpu">添加SPU</el-button>
        <el-table :data="spuList" style="width: 100%">
          <el-table-column label="序号" width="width" type="index" align="center" />
          <el-table-column prop="spuName" label="spu名称" width="200px" />
          <el-table-column prop="description" label="spu描述" width="width" />
          <el-table-column prop="prop" label="操作" width="240px">
            <template slot-scope="{row}">
              <hint-button type="success" icon="el-icon-plus" size="mini" title="添加sku" @click="addSku(row)" />
              <hint-button type="warning" icon="el-icon-edit" size="mini" title="编辑spu" @click="editSpu(row)" />
              <hint-button type="info" icon="el-icon-info" size="mini" title="查看spu的sku列表" @click="showSkuList(row)" />
              <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteSpu(row)">
                <hint-button slot="reference" type="danger" icon="el-icon-delete" size="mini" title="删除spu" />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="page"
          :page-sizes="[5, 10, 20]"
          :page-size="limit"
          layout=" prev, pager, next, jumper, ->, sizes, total"
          :total="total"
          style="text-align:center"
          @size-change="handleSizeChange"
          @current-change="getSpuList"
        />
      </div>
      <div v-show="scence == 1">
        <FormSpu ref="spu" @changeScence="changeScence" />
      </div>
      <div v-show="scence == 2">
        <FormSku ref="sku" @changeScences="changeScences" />
      </div>
    </el-card>
    <el-dialog title="早上好的sku列表" :visible.sync="dialogTableVisible" @close="closeSkuList">
      <el-table v-loading="skuLoading" :data="skuList">
        <el-table-column property="skuName" label="名称" width="width" />
        <el-table-column property="price" label="价格" width="width" />
        <el-table-column prop="weight" label="重量" width="width" />
        <el-table-column label="默认图片" width="width">
          <template slot-scope="{row}">
            <img :src="row.skuDefaultImg" style="width:100px;height:100px">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import FormSpu from './FormSpu'
import FormSku from './FormSku'
import hintButton from '@/components/HintButton'

export default {
  name: 'ManageSpu',
  components: {
    FormSpu,
    FormSku,
    hintButton
  },
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      page: 1,
      limit: 5,
      total: 0,
      spuList: [],
      scence: 0, // 0:展示页，1:添加或修改spu场景，2修改sku场景
      dialogTableVisible: false, // sku预览模块是否可见
      skuList: [],
      skuLoading: true
    }
  },
  methods: {
    // 获取spu列表数据
    async getSpuList(pages = 1) {
      this.page = pages
      const { page, limit, category3Id } = this
      const result = await this.$Api.spu.reqSpuList(page, limit, category3Id)
      if (result.code === 200) {
        const { total, records } = result.data
        this.total = total
        this.spuList = records
      }
    },
    // CategorySelect组件的自定义事件
    getCategoryId({ categoryId, level }) {
      switch (level) {
        case 1:
          this.category1Id = categoryId
          this.category2Id = ''
          this.category3Id = ''
          this.spuList = []
          break
        case 2:
          this.category2Id = categoryId
          this.category3Id = ''
          this.spuList = []
          break
        case 3:
          this.category3Id = categoryId
          this.getSpuList()
      }
    },
    // 添加spu按钮
    addSpu() {
      this.scence = 1
      this.$refs.spu.addSpuData(this.category3Id)
    },
    // 每页展示条数切换事件
    handleSizeChange(limit) {
      this.limit = limit
      this.getSpuList()
    },
    // FormSpu组件自定义事件
    changeScence({ scence, flag }) {
      if (flag === '更新') {
        this.getSpuList(this.page)
      } else {
        this.getSpuList()
      }
      this.scence = scence
    },
    // FormSku组件自定义事件
    changeScences(scence) {
      this.scence = scence
    },
    // 添加sku按钮
    addSku(row) {
      this.scence = 2
      this.$refs.sku.getInitData(this.category1Id, this.category2Id, row)
    },
    // 编辑按钮
    async editSpu(row) {
      this.scence = 1
      this.$refs.spu.initSpuData(row)
    },
    // 删除spu按钮确定事件
    async deleteSpu(row) {
      const result = await this.$Api.spu.reqDeleteSpu(row.id)
      if (result.code === 200) {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getSpuList(this.spuList.length < 2 ? this.page - 1 : this.page)
      }
    },
    // 查看sku列表按钮事件
    async showSkuList(row) {
      this.dialogTableVisible = true
      const result = await this.$Api.spu.reqGetSkuInfoList(row.id)
      if (result.code === 200) {
        this.skuList = result.data
        this.skuLoading = false
      }
    },
    // sku展示列表关闭事件
    closeSkuList() {
      this.skuList = []
      this.skuLoading = true
    }

  }
}
</script>

<style scoped>
.box-card {
  border: 1px solid #e1e1e1;
}
</style>
