<!--
    Author: earl
    Create Time: 2018-06-03 23:23
    Description: 首页
-->
<template>
  <div class="index">
    <ve-radar :data="chartData"></ve-radar>
    <ve-bar :data="chartData"></ve-bar>
    <ve-pie :data="chartData"></ve-pie>
    <ve-waterfall :data="chartData"></ve-waterfall>
    <ve-sankey :data="chartDataSankey" :settings="chartSettings"></ve-sankey>
    <ve-heatmap :data="chartData"></ve-heatmap>
    <ve-gauge :data="chartDataGauge"></ve-gauge>
  </div>
</template>

<script>
  import VeRadar from 'v-charts/lib/radar'
  import VeBar from 'v-charts/lib/bar'
  import VePie from 'v-charts/lib/pie'
  import VeWaterfall from 'v-charts/lib/waterfall'
  import VeSankey from 'v-charts/lib/sankey'
  import VeHeatmap from 'v-charts/lib/heatmap'
  import VeGauge from 'v-charts/lib/gauge'
  export default {
    data () {
      this.chartSettings = {
        links: [
          { source: '首页', target: '列表页a', value: 0.5 },
          { source: '首页', target: '列表页b', value: 0.5 },
          { source: '列表页a', target: '内容页a-1', value: 0.1 },
          { source: '列表页a', target: '内容页a-2', value: 0.4 },
          { source: '列表页b', target: '内容页b-1', value: 0.2 },
          { source: '列表页b', target: '内容页b-2', value: 0.3 }
        ]
      }
      return {
        chartData: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        },
        chartDataGauge: {
          columns: ['type', 'a', 'b', 'value'],
          rows: [
            { type: '速度', value: 80, a: 10, b: 2 }
          ]
        },
        chartDataSankey: {
          columns: ['页面', '访问量'],
          rows: [
            { '页面': '首页', '访问量': 100000 },
            { '页面': '列表页a', '访问量': 20000 },
            { '页面': '列表页b', '访问量': 80000 },
            { '页面': '内容页a-1', '访问量': 10000 },
            { '页面': '内容页a-2', '访问量': 10000 },
            { '页面': '内容页b-1', '访问量': 60000 },
            { '页面': '内容页b-2', '访问量': 20000 }
          ]
        }
      }
    },
    components: {VeRadar,VeBar,VePie,VeWaterfall,VeSankey,VeHeatmap,VeGauge},
  }
</script>

<style scoped>

  .index {

  }

</style>
