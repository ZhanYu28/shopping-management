<template>
  <el-card shadow="always" :body-style="{ padding: '20px' }">
    <div class="title">
      <span>{{ title }}</span>
      <i class="el-icon-warning-outline" />
    </div>
    <div class="content">
      <span>{{ content }}</span>
    </div>
    <div class="charts-box">
      <slot name="charts" />
    </div>
    <div class="footer">
      <slot name="footer" />
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'ChartsHeader',
  props: ['title', 'content'],
  data() {
    return {

    }
  }
}
</script>

<style scoped>
.title{
    display: flex;
    justify-content: space-between;
    color: #848484;
}
.content{
    font-size: 28px;
    margin: 5px 0;
}
.charts-box{
    padding: 10px 0;
    height: 100px;
    display: flex;
    align-items: center;
}
.footer{
    padding-top:10px;
    border-top: 1px solid #eee;
}
>>>.footer span,>>>.charts-box span{
    margin-right: 10px;
}
</style>
