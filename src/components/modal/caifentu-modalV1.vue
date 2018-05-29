<template>
  <div class="modal-mask">
    <div class="caifentu-modal modal">
      <div class="modal-close"></div>
      <div class="modal-head">企鹅乐园拆分走势图</div>
      <div class="modal-content">
        <div class="tab-head">
          <div class="tab-head-item" style="color:#EE9E19;">基础拆分率</div>
          <div class="tab-head-item" style="color:#C8D20A;">个人利率</div>
        </div>
        <div class="tab-content">
          <div class="tab-content-item" id="chart">
           <!--  <IEcharts :option="line" :loading="loading"></IEcharts> -->
           <schart :canvasId="canvasId" :type="type" :width="width" :height="height" :data="data" :options="options"></schart>
         </div>
       </div>
     </div>
   </div>
 </div>
</template>
<script>
  import {getCaifen} from '@/js/allAxiosRequire'
  // import IEcharts from 'vue-echarts-v3/src/full.vue';
  import Schart from 'vue-schart';

  export default {
    data() {
      return {
        canvasId: 'myCanvas',
        type: 'line',
        width: 350,
        height: 200,
        data: [
        {name: '6-13', value: 1.82},
        {name: '6-14', value: 1.71},
        {name: '6-15', value: 1.79},
        {name: '6-16', value: 1.84},
        {name: '6-17', value: 1.78},
        {name: '6-18', value: 1.77},
        {name: '6-19', value: 1.76},
        ],
        options: {
          bgColor: '#6C6E70',
          yEqual: 3,
          fillColor: '#EE9E19',
          contentColor: '#6C6E70',
          axisColor: '#fff'
        }
      }
    },
    components:{
      Schart
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
      padding: 0 2rem;
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
</style>
