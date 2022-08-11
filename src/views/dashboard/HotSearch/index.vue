<template>
  <div>
    <el-card>
      <div slot="header" class="header">
        <span>线上热门搜索</span>
        <i class="el-icon-more" />
      </div>
      <div>
        <el-row :gutter="20">
          <el-col :span="12" :offset="0">
            <div class="search-charts-title">
              <span>搜索用户数</span><i class="el-icon-warning-outline" />
            </div>
            <div class="search-charts-data">
              <span class="count">12321</span>
              <span class="percent">
                17.1
                <svg
                  t="1658129829558"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2242"
                  width="16"
                  height="16"
                >
                  <path
                    d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"
                    p-id="2243"
                    fill="#d81e06"
                  />
                </svg>
              </span>
            </div>
            <div class="search-charts">
              <SearchCharts :charts-data="searchUserCount" />
            </div>
          </el-col>
          <el-col :span="12" :offset="0">
            <div class="search-charts-title">
              <span>人均搜索次数</span><i class="el-icon-warning-outline" />
            </div>
            <div class="search-charts-data">
              <span class="count">2.7</span>
              <span class="percent">
                26.2
                <svg
                  t="1658129961138"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="6027"
                  width="16"
                  height="16"
                >
                  <path
                    d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"
                    p-id="6028"
                    fill="#1afa29"
                  />
                </svg>
              </span>
            </div>
            <div class="search-charts">
              <SearchCharts :charts-data="avgSearchUser" />
            </div>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{ prop: 'keyword', order: 'descending' }"
          border
        >
          <el-table-column label="排名" type="index" width="80px" />
          <el-table-column prop="keyword" label="搜索关键字" width="width" />
          <el-table-column prop="user" label="用户数" sortable width="width" />
          <el-table-column prop="range" label="周涨幅" sortable width="width" />
        </el-table>
        <el-pagination
          style="text-align:center;margin-top:10px"
          layout="prev, pager, next"
          :total="500"
          :page-size="5"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import SearchCharts from './SearchCharts'
export default {
  name: 'HotSearch',
  components: { SearchCharts },
  data() {
    return {
      searchUserCount: [20, 16, 15, 19, 22, 15, 18, 16, 11, 20],
      avgSearchUser: [15, 18, 20, 16, 20, 16, 19, 20, 16, 22],
      tableData: [{}]
    }
  }
}
</script>

<style scoped>
>>>.el-card__header{
  padding-top: 0;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0;
}
.search-charts-title {
  margin: 20px 0;
  color: #b0b0b0;
  display: flex;
  align-items: center;
  font-size: 24px;
}
.search-charts-title span {
  margin-right: 10px;
}
.search-charts-data {
  margin-top: 30px;
}
.search-charts-data .count {
  font-size: 32px;
  margin-right: 50px;
}
.search-charts-data .percent {
  color: #b0b0b0;
}
</style>
