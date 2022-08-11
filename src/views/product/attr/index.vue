<template>
  <div>
    <el-card class="box-card" style="margin: 20px 0">
      <CategorySelect :show="!isShowAttr" @getCategoryId="getCategoryId" />
    </el-card>
    <el-card class="box-card">
      <div v-show="isShowAttr">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
        >添加属性</el-button>
        <el-table :data="attrList" style="width: 100%">
          <el-table-column
            label="序号"
            width="width"
            type="index"
            align="center"
          />
          <el-table-column
            prop="attrName"
            label="属性名称"
            width="150px"
          />
          <el-table-column
            prop="attrValueList"
            label="属性值列表"
            width="width"
          >
            <template slot-scope="{ row }">
              <el-tag
                v-for="attr in row.attrValueList"
                :key="attr.id"
                type="success"
                style="margin: 0 10px"
              >{{ attr.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="200px">
            <template slot-scope="{ row }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="editAttr(row)"
              />
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteAttr(row)"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowAttr">
        <el-form ref="form" :inline="true" label-width="80px">
          <el-form-item label="属性名">
            <el-input
              v-model="addAttrInfo.attrName"
              placeholder="请输入属性名"
            />
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!addAttrInfo.attrName"
          @click="addAttrValue"
        >添加属性值</el-button>
        <el-button @click="isShowAttr = true">取消</el-button>
        <el-table :data="addAttrInfo.attrValueList" style="width: 100%">
          <el-table-column
            label="序号"
            width="100px"
            type="index"
            align="center"
          />
          <el-table-column prop="valueName" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <el-input
                v-if="row.flag"
                :ref="$index"
                v-model="row.valueName"
                placeholder="请输入属性值"
                @blur="blur($index, row)"
              />
              <span
                v-else
                style="display: block"
                @click="editAttrValue($index)"
              >{{ row.valueName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="{ row,$index }">
              <el-popconfirm :title="`你确定删除 '${row.valueName}' 吗？`" @onConfirm="deleteAttrValue($index)">
                <el-button
                  slot="reference"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          :disabled="addAttrInfo.attrValueList.length == 0"
          @click="saveAttrInfo"
        >保存</el-button>
        <el-button @click="isShowAttr = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'ManageAttr',
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      attrList: [],
      isShowAttr: true,
      addAttrInfo: {
        attrName: '',
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3
      }
    }
  },
  methods: {
    // CategorySelect组件的自定义事件
    getCategoryId({ categoryId, level }) {
      switch (level) {
        case 1:
          this.category1Id = categoryId
          this.category2Id = ''
          this.category3Id = ''
          this.attrList = []
          break
        case 2:
          this.category2Id = categoryId
          this.category3Id = ''
          this.attrList = []
          break
        case 3:
          this.category3Id = categoryId
          this.getAttrList()
      }
    },
    // 获取平台属性列表
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this
      try {
        const result = await this.$Api.attr.reqGetAttrList(
          category1Id,
          category2Id,
          category3Id
        )
        this.attrList = result.data
      } catch (error) {
        console.log(error)
      }
    },
    // 聚焦工具函数
    isFocus(index) {
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    },
    // 添加属性按钮事件
    addAttr() {
      this.addAttrInfo.attrName = ''
      this.addAttrInfo.attrValueList = []
      this.isShowAttr = false
    },
    // 编辑属性按钮事件
    editAttr(row) {
      this.addAttrInfo = cloneDeep(row)
      this.addAttrInfo.attrValueList.forEach(item => {
        this.$set(item, 'flag', false)
      })
      this.isShowAttr = false
    },
    // 删除属性按钮事件
    async deleteAttr(row) {
      try {
        await this.$Api.attr.reqDeleteAttr(row.id)
        this.getAttrList()
      } catch (error) {
        console.log(error)
      }
    },
    // 添加属性值按钮事件
    addAttrValue() {
      this.addAttrInfo.attrValueList.push({
        attrId: 0,
        valueName: '',
        flag: true
      })
      const index = this.addAttrInfo.attrValueList.length - 1
      this.isFocus(index)
    },
    // 属性值输入框失焦事件
    blur(index, row) {
      if (row.valueName.trim()) {
        const isRepat = this.addAttrInfo.attrValueList.some((item) => {
          if (item !== row) {
            return item.valueName === row.valueName
          }
        })
        if (isRepat) {
          this.addAttrInfo.attrValueList[index].valueName = ''
          this.$message({
            message: '请勿输入重复属性值',
            type: 'warning'
          })
        } else {
          this.addAttrInfo.attrValueList[index].flag = false
        }
      }
    },
    // 属性值由展示切换到输入
    editAttrValue(index) {
      this.addAttrInfo.attrValueList[index].flag = true
      this.isFocus(index)
    },
    // 删除属性值事件
    deleteAttrValue(index) {
      this.addAttrInfo.attrValueList.splice(index, 1)
    },
    // 保存属性值
    async saveAttrInfo() {
      this.addAttrInfo.categoryId = this.category3Id
      this.addAttrInfo.attrValueList = this.addAttrInfo.attrValueList.filter(item => {
        if (item.valueName !== '') {
          delete item.flag
          return true
        }
      })
      try {
        await this.$Api.attr.reqSaveAttrValue(this.addAttrInfo)
        this.isShowAttr = true
        this.getAttrList()
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      } catch (error) {
        console.log('保存失败')
      }
    }
  }
}
</script>

<style scoped>
.box-card {
  border: 1px solid #e1e1e1;
}
</style>
