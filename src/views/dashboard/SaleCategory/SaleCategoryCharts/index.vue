<template>
  <div ref="charts" class="charts" />
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'SaleCategoryCharts',
  data() {
    return {
      charts: {}
    }
  },
  mounted() {
    this.charts = echarts.init(this.$refs.charts)
    this.charts.setOption({
      title: {
        text: '搜索引擎',
        subtext: '1048',
        top: 'center',
        left: 'center',
        textVerticalAlign: 'mittle',
        textStyle: {
          fontSize: '16',
          color: '#b0b0b0'
        },
        subtextStyle: {
          fontSize: '32',
          color: '#000'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true
            // position: "center",
          },
          labelLine: {
            show: true,
            length: 30
          },
          data: [
            { value: 1048, name: '搜索引擎：1048' },
            { value: 735, name: '直接访问：735' },
            { value: 580, name: '邮件营销：580' },
            { value: 484, name: '联盟广告：484' },
            { value: 300, name: '视频广告：300' }
          ]
        }
      ]
    })
    this.charts.on('mouseover', (params) => {
      this.charts.setOption({
        title: {
          text: params.data.name.split('：')[0],
          subtext: params.data.value
        }
      })
    })
  }
}
</script>

<style scoped>
.charts {
  width: 100%;
  height: 364px;
}
</style>
