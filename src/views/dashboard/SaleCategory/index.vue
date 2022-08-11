<template>
  <div>
    <el-card>
      <div slot="header" class="sale-category-header">
        <span>销售额类别占比</span>
        <el-radio-group v-model="radio" size="medium">
          <el-radio-button label="全部渠道" />
          <el-radio-button label="线上" />
          <el-radio-button label="门店" />
        </el-radio-group>
      </div>
      <div>
        <SaleCategoryCharts />
      </div>
    </el-card>
  </div>
</template>

<script>
import SaleCategoryCharts from './SaleCategoryCharts'
export default {
  name: 'SaleCategory',
  components: { SaleCategoryCharts },
  data() {
    return {
      radio: '全部渠道'
    }
  }
}
</script>

<style scoped>
>>>.el-card__header{
  padding-top: 0;
}
.sale-category-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sale-category-header>span{
  margin: 25px 0;
}
</style>
