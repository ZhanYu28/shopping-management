<template>
  <div ref="charts" class="charts" />
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'SearchCharts',
  props: ['ChartsData'],
  mounted() {
    const charts = echarts.init(this.$refs.charts)
    charts.setOption({
      xAxis: {
        show: false,
        type: 'category',
        boundaryGap: false,
        axisTick: {
          alignWithLabel: true
        }
      },
      yAxis: {
        show: false
      },
      series: {
        type: 'line',
        data: this.ChartsData,
        smooth: true,
        itemStyle: {
          opacity: 0
        },
        lineStyle: {
          color: 'skyblue'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0.8,
                color: '#fff' // 0% 处的颜色
              },
              {
                offset: 0,
                color: 'skyblue' // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        }
      },
      grid: {
        top: 1,
        right: 0,
        bottom: 0,
        left: 0
      }
    })
  }
}
</script>

<style soped>
.charts {
  width: 100%;
  height: 100px;
}
</style>
