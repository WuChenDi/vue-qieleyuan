<template>
  <div class="modal-mask" v-show="showModal">
    <div class="shouhuo-modal modal">
      <div class="modal-close" ref="btnClose" @click="close($event)"></div>
      <div class="modal-head"></div>
      <div class="modal-content">该企鹅窝可收获{{ fruit }}只企鹅，是否确认收获？</div>
      <div class="modal-footer">
        <div class="modal-footer-btn-cancel" @click="cancel($event)" ref="btnCancel">取消</div>
        <div class="modal-footer-btn-sure" @click="sure($event)" ref="btnSure">确认</div>
      </div>
    </div>    
  </div>
</template>
<script>
import {pick} from '@/js/allAxiosRequire'
export default {
  name: 'shouhuo-modal',
  props: ['cell'],
  data () {
    return {
      showModal: false
    }
  },
  mounted () {
    this.bindModalEvent()
  },
  components: {
  },
  computed: {
    fruit () {
      if(this.cell.xy !== undefined && this.cell.tree){
        return this.cell.tree.fruit - this.cell.land.min_fruit
      }
      return 0
    }
  },
  methods: {
    cancel (e) {
      Bus.$emit('closeShouhuoModal')
    },
    sure (e) {
      Bus.$emit('closeShouhuoModal')
      pick(this.cell.tree.id)
      .then(function (respones) {
        Bus.$emit('openTipModal', respones.data.msg)
        Bus.$emit('refreshData')
      })
      .catch(function (err) {
        if(err && err.response) {
          if(err.response.status === 422) {
            Bus.$emit('openTipModal', err.response.data.msg)
          }
        }
      })
    },
    close () {
      Bus.$emit('closeShouhuoModal')
    },
    // 收获模态框事件绑定
    bindModalEvent () {
      Bus.$on('openShouhuoModal', function(){
        if(this.cell.xy === undefined) {
          Bus.$emit('openTipModal', '请先选择企鹅窝')
        }else{
          if(!this.cell.tree) {
            Bus.$emit('openTipModal', '该企鹅窝还未开放')
          }else{
            if(this.cell.tree.fruit === this.cell.land.min_fruit){
              Bus.$emit('openTipModal', '企鹅可收获')
            }else{
              this.showModal = true
            }
          }
        }
      }.bind(this))
      Bus.$on('closeShouhuoModal', function(){
        this.showModal = false
      }.bind(this))
    },
  }
}
</script>
<style scoped lang="less" type="text/less">
.flex-both-center () {
  display: flex;
  justify-content: center;
  align-items: center;
}
.shouhuo-modal {
  width: 18rem;
  color: #fff;
  border: 1px solid #05bae7;
  .modal-head {
    height: 2.1rem;
  }
  .modal-content {
    height: 5rem;
    .flex-both-center();
    font-size: 1rem;
    padding: 0 1rem;
  }
  .modal-footer {
    height: 2.5rem;
    display: flex;
    justify-content: space-between;
    align-content: center;
    * {
      .flex-both-center();
      height: 1.5rem;
      width: 5rem;
      background-image: url('~@/assets/an-bg01.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
      margin: 0 2rem;
    }
  }
}
</style>
