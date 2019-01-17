<template>
  <div class="modal-mask" v-if="showModal">
    <div class="jihuoTips-modal modal">
      <div class="modal-close" ref="btnClose" @click="close($event)"></div>
      <div class="modal-head"></div>
      <div class="modal-content" v-if="type === 1">您确定花费{{fruit}}企鹅生成激活码么？</div>
      <div class="modal-content" v-if="type === 2">您确定花费{{fruit}}企鹅赠送激活码么？</div>
      <div class="modal-content" v-if="type === 3">您确定花费10企鹅开通一件玩耍么？</div>
      <div class="modal-footer">
        <div class="modal-footer-btn-cancel" @click="cancel($event)" ref="btnCancel">取消</div>
        <div class="modal-footer-btn-sure" @click="sure($event)" ref="btnSure">确认</div>
      </div>
    </div>    
  </div>
</template>
<script>
import {assart} from '@/js/allAxiosRequire'
export default {
  name: 'jihuoTips-modal',
  data () {
    return {
      showModal: false,
      type: 1,
      fruit: '',
    }
  },
  mounted () {
    this.bindModalEvent();
  },
  components: {
  },
  computed: {
  },
  methods: {
    cancel (e) {
      this.showModal = false
    },
    sure (e) {
      this.showModal = false
      if(this.type === 1) {
        Bus.$emit('sureCreatNewJihuoma');
      }
      if(this.type === 2) {
        Bus.$emit('sureSendCode');
      }
      if(this.type === 3) {
        Bus.$emit('sureAllGather');
      }
    },
    close () {
      this.showModal = false
    },
    bindModalEvent () {
      Bus.$on('openJihuoTipsModal', function(type){
        this.type = type;
        this.showModal = true;

        console.log('花费企鹅：' + window.userData.price_act);
        if(parseInt(window.userData.price_act) === 0) {
          this.fruit = window.globalMessage.actcode_price;
        } else {
          this.fruit = window.userData.price_act;
        }
      }.bind(this))
    }
  }
}
</script>
<style scoped lang="less" type="text/less">
.modal-mask {
  position: absolute;
  z-index: 999;
}
.flex-both-center () {
  display: flex;
  justify-content: center;
  align-items: center;
}
.jihuoTips-modal {
  width: 18rem;
  color: #fff;
  background: #2290ab;
  .modal-head {
    height: 2.1rem;
  }
  .modal-content {
    height: 5rem;
    padding: 0 1rem;
    .flex-both-center();
    font-size: 1rem;
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
