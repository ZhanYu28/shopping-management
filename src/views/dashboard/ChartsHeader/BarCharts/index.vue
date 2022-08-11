<template>
  <div ref="charts" class="charts" />
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {
      charts: {}
    }
  },
  mounted() {
    this.charts = echarts.init(this.$refs.charts)
    this.charts.setOption({
      xAxis: {
        show: false,
        type: 'category',
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      },
      yAxis: {
        show: false
      },
      series: {
        type: 'bar',
        data: [10, 20, 5, 8, 10, 20, 5, 4, 6, 20, 30, 5]
      },
      grid: {
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
      },
      tooltip: {}
    })
  }
}
</script>

<style scoped>
.charts{
    width:100%;
    height: 100%;
}
</style>
