<template>
  <div>
    <div class="home-header">
      <el-row :gutter="20">
        <el-col :span="6">
          <ChartsHeader title="总销售额" content="￥126560">
            <template slot="charts">
              <span>周同比</span>
              <span>
                56.67%
                <svg t="1658129829558" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2242" width="16" height="16"><path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" p-id="2243" fill="#d81e06" /></svg>
              </span>
              <span>日同比</span>
              <span>
                19.16%
                <svg t="1658129961138" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6027" width="16" height="16"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" p-id="6028" fill="#1afa29" /></svg>
              </span>
            </template>
            <template slot="footer">
              <span>日销售额</span>￥12423
            </template>
          </ChartsHeader>
        </el-col>
        <el-col :span="6">
          <ChartsHeader title="访问量" content="88460">
            <template slot="charts">
              <LineCharts />
            </template>
            <template slot="footer">
              <span>日访问量</span>1234
            </template>
          </ChartsHeader>
        </el-col>
        <el-col :span="6">
          <ChartsHeader title="支付笔数" content="88460">
            <template slot="charts">
              <BarCharts />
            </template>
            <template slot="footer">
              <span>转化率</span>65%
            </template>
          </ChartsHeader>
        </el-col>
        <el-col :span="6">
          <ChartsHeader title="运营活动效果" content="78%">
            <template slot="charts">
              <ProgressCharts />
            </template>
            <template slot="footer">
              <span>周同比</span>
              <span>
                12%
                <svg t="1658129829558" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2242" width="16" height="16"><path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" p-id="2243" fill="#d81e06" /></svg>
              </span>
              <span>日同比</span>
              <span>
                11%
                <svg t="1658129961138" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6027" width="16" height="16"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" p-id="6028" fill="#1afa29" /></svg>
              </span>
            </template>
          </ChartsHeader>
        </el-col>
      </el-row>
    </div>
    <div class="home-main">
      <el-card>
        <div slot="header" class="header">
          <el-tabs v-model="activeName">
            <el-tab-pane label="销售额" name="sale" />
            <el-tab-pane label="访问量" name="visited" />
          </el-tabs>
          <div class="date-box">
            <span @click="setDay">今日</span>
            <span @click="setWeek">本周</span>
            <span @click="setMonth">本月</span>
            <span @click="setYear">本年</span>
            <el-date-picker
              v-model="date"
              class="date"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              size="mini"
            />
          </div>
        </div>
        <div>
          <el-row :gutter="20">
            <el-col :span="18">
              <ChartsMain :title="title" :main-charts-data="MainChartsData" />
            </el-col>
            <el-col :span="6">
              <RankingList :title="title" :rank-data="rankData" />
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
    <div class="home-footer">
      <el-row :gutter="20">
        <el-col :span="12" :offset="0">
          <HotSearch />
        </el-col>
        <el-col :span="12" :offset="0">
          <SaleCategory />
        </el-col>
      </el-row>
    </div>
  </div>

</template>

<script>
import { mapGetters, mapState } from 'vuex'
// 第三方库
import dayjs from 'dayjs'
// 组件
import ChartsHeader from './ChartsHeader'
import LineCharts from './ChartsHeader/LineCharts'
import BarCharts from './ChartsHeader/BarCharts'
import ProgressCharts from './ChartsHeader/ProgressCharts'
import ChartsMain from './ChartsMain'
import RankingList from './RankingList'
import HotSearch from './HotSearch'
import SaleCategory from './SaleCategory'

export default {
  name: 'Dashboard',
  components: {
    ChartsHeader,
    LineCharts,
    BarCharts,
    ProgressCharts,
    ChartsMain,
    RankingList,
    HotSearch,
    SaleCategory
  },
  data() {
    return {
      activeName: 'sale',
      date: []
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ]),
    ...mapState('home', ['homeData']),
    title() {
      return this.activeName === 'sale' ? '销售额' : '访问量'
    },
    MainChartsData() {
      const { orderFullYear, orderFullYearAxis, userFullYear, userFullYearAxis } = this.homeData
      return {
        orderFullYear,
        orderFullYearAxis,
        userFullYear,
        userFullYearAxis
      }
    },
    rankData() {
      const { saleRank = {}, userRank } = this.homeData
      if (this.activeName === 'sale') {
        return saleRank.shop || {}
      } else {
        return userRank
      }
    }
  },
  created() {
    try {
      this.$store.dispatch('home/getData')
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    setDay() {
      const day = dayjs().format('YYYY-MM-DD')
      this.date = [day, day]
    },
    setWeek() {
      const weekStart = dayjs().day(1).format('YYYY-MM-DD')
      const weekEnd = dayjs().day(7).format('YYYY-MM-DD')
      this.date = [weekStart, weekEnd]
    },
    setMonth() {
      const monthStart = dayjs().startOf('month').format('YYYY-MM-DD')
      const monthEnd = dayjs().endOf('month').format('YYYY-MM-DD')
      this.date = [monthStart, monthEnd]
    },
    setYear() {
      const yearStart = dayjs().startOf('year').format('YYYY-MM-DD')
      const yearEnd = dayjs().endOf('year').format('YYYY-MM-DD')
      this.date = [yearStart, yearEnd]
    }
  }
}
</script>

<style scoped>
>>>.el-card__header{
  padding-bottom: 0;
}
>>>.el-tabs__header{
  margin-bottom: 0;
}
>>>.el-tabs__nav-wrap::after{
  height:0
}
.header{
  display: flex;
  justify-content: space-between;
}
.home-main{
  margin: 10px 0;
}
.date-box span{
  margin-right: 20px;
}
.date-box .date{
  width: 340px;
}
</style>
