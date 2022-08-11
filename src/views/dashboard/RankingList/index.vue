<template>
  <div>
    <h4>门店{{ title }}排名</h4>
    <ul v-show="title == '销售额'" key="1">
      <li v-for="(item,index) in rankData.name" :key="index">
        <span>
          <span class="index">{{ index+1 }}</span>
          {{ item }}
        </span>
        <span>{{ rankData.value[index] }}</span>
      </li>
    </ul>
    <ul v-show="title == '访问量'" key="2">
      <li v-for="item in rankData" :key="item.no">
        <span>
          <span class="index">{{ item.no }}</span>
          {{ item.name }}
        </span>
        <span>{{ item.money }}</span>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'RankingList',
  props: {
    title: {
      type: String,
      default: ''
    },
    rankData: Object
  }
}
</script>

<style scoped>
ul,li{
    margin: 0;
    padding: 0;
    list-style-type: none;
}
li{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}
li .index{
    margin-right: 20px;
    display: inline-block;
    text-align: center;
    width: 20px;
    height: 20px;
    line-height: 20px;
    border-radius: 50%;
}
li:nth-child(1) .index,li:nth-child(2) .index,li:nth-child(3) .index{
    background-color: #000;
    color: #fff;
}
</style>
