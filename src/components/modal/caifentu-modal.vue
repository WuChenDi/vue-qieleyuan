<template>
  <div class="modal-mask" v-show="showModal">
    <div class="caifentu-modal modal">
      <div class="modal-close" @click="close($event)"></div>
      <div class="modal-head">企鹅乐园拆分走势图</div>
      <div class="modal-content">
        <div class="tab-head">
          <div class="tab-head-item" style="color:#EE9E19;">基础拆分率</div>
          <div class="tab-head-item" style="color:#C8D20A;">个人利率</div>
        </div>
        <div class="tab-content">
          <div class="tab-content-item" id="chart">
            <IEcharts :option="line" :loading="loading"></IEcharts>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {getCaifen} from '@/js/allAxiosRequire'
  import IEcharts from 'vue-echarts-v3/src/full.js';
  export default {
    name: 'caifentu-modal',
    data () {
      return {
        split: {},
        showModal: true,
        loading: false,
        line: {
        // 背景色可以去掉
        // backgroundColor: 'rgba(0, 0, 0, 0.4)',
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#FFF'
            }
          },
          axisLabel: {
            interval: 0,
            rotate: -60,
            showMinLabel: true
          },
          axisTick: {
            length: -130,
            color: '#fff'
          },
          color: '#fff',
          // 横坐标数据 (需要更改为动态)
          // data: ['6-13', '6-14', '6-15', '6-16', '6-17', '6-18', '6-19'],
          data: [],
        },
        yAxis: {
          type: 'value',
          boundaryGap: ['0.1', '0.1'],
          axisLabel: {
            formatter: '{value}'
          },
          min: 1,
          max: 4,
          splitNumber: 1,
          splitLine: {
            lineStyle: {
              type: 'solid',
              color: 'rgba(0,0,0,0)'
            }
          },
          // 横线长度
          axisTick: {
            // length: -400,
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(0, 0, 0, 0)'
            }
          },
        },
        series: [{
          type: 'line',
          // 基础拆分率折线数据(需要更改为动态)
          // data: [1.82, 1.71, 1.79, 1.84, 1.78, 1.77, 1.76],
          data: [],
          label: {
            normal: {
              show: true,
              // 橙色的折线
              color: '#EE9E19'
            }
          },
          itemStyle: {
            normal: {
              color: '#EE9E19'
            }
          }
        },
        {
          type: 'line',
          // 个人利率折线数据(需要更改为动态)
          // data: [{}, 1.92, 2.20, 2.25, 2.15, 2.13, 2.10],
          // data: [],
          label: {
            normal: {
              show: true,
              // 黄色的折线
              color: '#C8D20A'
            }
          },
          itemStyle: {
            normal: {
              color: '#C8D20A'
            }
          }
        }]
      }
    }
  },
  watch: {
    split (value) {
     if(value.system_split.length === 0) {
      return
    }
    if(value.user_split.length === 0) {
      let date = []
      let base = []
      for (var i = value.system_split.length - 1; i < 0; i--) {
        date.push(value.system_split[i].date)
        base.push(value.system_split[i].value)
      }
      // 横坐标
      this.line.xAxis.data = date
      // 基础
      this.line.series[0].data = base
      // 用户
      this.line.series[1].data = []
      return
    }
    if(value.system_split.length !== 0 && value.user_split.length !== 0) {
      let date = []
      let base = []
      let user = []
      for (var i = 0; i < value.system_split.length; i++) {
        date.push(value.system_split[i].date)
        base.push(value.system_split[i].value.toFixed(2))
        if(value.user_split[i] === undefined){
          user.push({})
        }else{
          user.push(value.user_split[i].value.toFixed(2))
        }
      }
        // 横坐标
        this.line.xAxis.data = date.reverse()
        // 基础
        this.line.series[0].data = base.reverse()
        // 用户
        this.line.series[1].data = user.reverse()
      }

    }
  },
  updated () {
  },
  mounted () {
    // setTimeout(() => {
    //   this.setWH();
    // }, 3000);
    this.setWH()
    this.bindModalEvent()   
  },
  components: {
   IEcharts
 },
 methods: {
  close () {
    this.showModal = false
  },
  bindModalEvent () {
    this.showModal = false
    Bus.$on('openCaifenModal', function(){
      getCaifen()
      .then(function (response) {
        let data = response.data
        this.split = data
        this.showModal = true
      }.bind(this))
      .catch(function (err) {
        if(err && err.response) {
          if(err.response.status === 422) {
            Bus.$emit('openTipModal', err.response.data.msg)
          }
        }
      })
    }.bind(this))
  },
  setWH () {
    let chart = $('#chart')
    let bodyW = $('body').width()
    if(bodyW < 560) {
      chart.width('335px')
      chart.height('11rem')
    }
    if(bodyW < 540) {
      chart.width('340px')
      chart.height('12rem')
    }
    if(bodyW >= 560) {
      chart.width('355px')
      chart.height('13rem')
    }
    if(bodyW >= 580) {
      chart.width('360px')
      chart.height('14rem')
    }
    if(bodyW >= 600) {
      chart.width('370px')
      chart.height('15rem')
    }
    
    // chart.height('15rem')
    chart.children().width(chart.width())
    chart.children().height(chart.height())
  }
}
}
</script>
<style scoped lang="less" type="text/less">
  // flex布局水平垂直居中
  .flex-both-center () {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .caifentu-modal {
    display: flex;
    flex-direction: column;
    width: 60%;
    height: 70%;
    .modal-head {
      height: 3rem;
      .flex-both-center()
    }
    .modal-content {
      display: flex;
      flex-direction: column;
      flex: 1;
      margin-left: auto;
      margin-right: auto;
      padding: 0;
      padding-bottom: 1.5rem;
      overflow: hidden;
      .tab-head {
        font-size: 0.8rem;
        height: 2.4rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .tab-head-item {
          height: 1.6rem;
          .flex-both-center();
          background-color: rgba(0, 0, 0, 0.4);
          border-radius: 1.5rem;
          width: 6rem;
        }
      }
      .tab-content {
        flex: 1;
        overflow: hidden;
        .tab-content-item {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  #chart {
    position: relative;
    top: -4rem;
  }
</style>
