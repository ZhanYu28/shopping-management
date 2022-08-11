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
        type: 'category'
      },
      yAxis: {
        show: false
      },
      series: {
        type: 'line',
        data: [5, 10, 8, 15, 14, 3, 5, 20, 15, 22, 16, 33],
        smooth: true,
        showSymbol: false,
        lineStyle: {
          color: 'pink'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0.3, color: 'pink' // 0% 处的颜色
            }, {
              offset: 1, color: 'white' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        }
      },
      grid: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }
    })
  }

}
</script>

<style scoped>
.charts{
    width: 100%;
    height: 100%;
}

</style>
