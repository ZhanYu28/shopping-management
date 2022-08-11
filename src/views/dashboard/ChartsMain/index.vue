<template>
  <div ref="charts" class="charts" />
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'ChartsMain',
  props: ['title', 'mainChartsData'],
  data() {
    return {
      charts: {}
    }
  },
  watch: {
    title() {
      this.charts.setOption({
        title: {
          text: this.title + '趋势'
        },
        xAxis: {
          data: this.title === '访问量' ? this.mainChartsData.userFullYearAxis : this.mainChartsData.orderFullYearAxis
        },
        series: {
          data: this.title === '访问量' ? this.mainChartsData.userFullYear : this.mainChartsData.orderFullYear
        }
      })
    },
    mainChartsData() {
      this.charts.setOption({
        xAxis: {
          data: this.mainChartsData.orderFullYearAxis
        },
        series: {
          data: this.mainChartsData.orderFullYear
        }
      })
    }
  },
  mounted() {
    this.charts = echarts.init(this.$refs.charts)
    this.charts.setOption({
      title: {
        text: this.title + '趋势',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      xAxis: {
        type: 'category',
        data: this.mainChartsData.orderFullYearAxis,
        axisTick: {
          alignWithLabel: true
        }
      },
      yAxis: {
        show: true
      },
      series: {
        type: 'bar',
        data: this.mainChartsData.orderFullYear,
        barWidth: '50%'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      }
    })
  }
}
</script>

<style scoped>
.charts{
    width: 100%;
    height: 350px;
}
</style>
