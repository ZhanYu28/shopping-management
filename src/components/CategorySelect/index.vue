<template>
  <!--
  props:(show:选择框可操作性，默认值为false)
  自定义事件: getCategoryId() 每级分类change时调用，回调为{categoryId：xx，level：xx}
 -->
  <el-form :inline="true" :model="cForm" class="demo-form-inline" :disabled="show">
    <el-form-item label="一级分类">
      <el-select v-model="cForm.category1Id" placeholder="请选择" @change="changeCategory1">
        <el-option v-for="c1 in list1" :key="c1.id" :label="c1.name" :value="c1.id" />
      </el-select>
    </el-form-item>
    <el-form-item label="二级分类">
      <el-select v-model="cForm.category2Id" placeholder="请选择" @change="changeCategory2">
        <el-option v-for="c2 in list2" :key="c2.id" :label="c2.name" :value="c2.id" />
      </el-select>
    </el-form-item>
    <el-form-item label="三级分类">
      <el-select v-model="cForm.category3Id" placeholder="请选择" @change="changeCategory3">
        <el-option v-for="c3 in list3" :key="c3.id" :label="c3.name" :value="c3.id" />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'CategorySelect',
  props: {
    show: {
      type: Boolean,
      require: false
    }
  },
  data() {
    return {
      data: {},
      list1: [],
      list2: [],
      list3: [],
      cForm: {
        category1Id: '',
        category2Id: '',
        category3Id: ''
      }
    }
  },
  mounted() {
    this.getCategory1List()
  },
  methods: {
    // 获取分类1列表
    async getCategory1List() {
      const result = await this.$Api.attr.reqGetCategory1List()
      if (result.code === 200) {
        this.list1 = result.data
      }
    },
    // 分类一修改事件(获取分类贰列表)
    async changeCategory1() {
      this.cForm.category2Id = ''
      this.cForm.category3Id = ''
      this.list2 = []
      this.list3 = []
      const { category1Id } = this.cForm
      this.$emit('getCategoryId', { categoryId: category1Id, level: 1 })
      const result = await this.$Api.attr.reqGetCategory2List(category1Id)
      if (result.code === 200) {
        this.list2 = result.data
      }
    },
    // 分类二修改事件(获取分类三列表)
    async changeCategory2() {
      this.cForm.category3Id = ''
      this.list3 = []
      const { category2Id } = this.cForm
      this.$emit('getCategoryId', { categoryId: category2Id, level: 2 })
      const result = await this.$Api.attr.reqGetCategory3List(category2Id)
      if (result.code === 200) {
        this.list3 = result.data
      }
    },
    // 分类三修改事件(获取商品属性列表)
    async changeCategory3() {
      const { category3Id } = this.cForm
      this.$emit('getCategoryId', { categoryId: category3Id, level: 3 })
    }
  }
}
</script>

<style>
</style>
