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
        min: 0,
        max: 100
      },
      yAxis: {
        show: false,
        type: 'category'
      },
      series: {
        type: 'bar',
        data: [78],
        yAxisIndex: 0,
        barWidth: 15,
        backgroundStyle: {
          color: '#eee'
        },
        showBackground: true,
        label: {
          show: true,
          position: 'outside',
          formatter: '|',
          color: 'yellowgreen'
        },
        itemStyle: {
          color: 'yellowgreen'
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

<style>
.charts{
    width: 100%;
    height: 100%;
}
</style>
