<template>
  <div class="modal-mask" v-show="showModal">
    <div class="shangcheng-modal modal">
      <div class="modal-close" @click="close($event)"></div>
      <div class="modal-head">游戏大厅</div>
      <div class="modal-content">该功能暂未开放，敬请期待！</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'shangcheng-modal',
  data () {
    return {
      showModal: true
    }
  },
  mounted () {
    this.bindModalEvent()
  },
  components: {
  },
  methods: {
    close () {
      this.showModal = false
    },
    bindModalEvent () {
      this.showModal = false
      Bus.$on('openShangchengModal', function(){
        this.showModal = true
      }.bind(this))
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
.shangcheng-modal {
  width: 18rem;
  display: flex;
  flex-direction: column;
  .modal-head {
    height: 2.1rem;
    .flex-both-center()
  }
  .modal-content {
    height: 7rem;
    .flex-both-center();
    font-size: 0.9rem;
    padding: 0 1rem;
  }
}
</style>
