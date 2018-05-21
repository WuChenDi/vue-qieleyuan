<template>
  <div class="tip-modal" ref="tipModal" :class="{'hide': !showModal}">{{ tip }}</div>
</template>
<script>
export default {
  name: 'tip-modal',
  data () {
    return {
      showModal: true,
      tip: '??????????????????'
    }
  },
  mounted () {
    this.setBorderRadius()
    this.tipModalEvent()
  },
  components: {
  },
  methods: {
    setBorderRadius () {
      let tipModal = this.$refs.tipModal
      tipModal.style.borderRadius = $(tipModal).height() + 'px'
    },
    tipModalEvent () {
      this.showModal = false
      Bus.$on('openTipModal', function(tip){
        clearTimeout(this.timer)
        this.tip = tip
        this.showModal = true
        this.timer = setTimeout(function(){
          this.showModal = false
        }.bind(this), 2000)
      }.bind(this))
    }
  },
  computed: {
  }
}
</script>
<style scoped lang="less" type="text/less">
.hide {
  display: none;
}
.tip-modal {
  position: absolute;
  left: 50%;
  top: 70%;
  background-color: rgba(0, 0, 0, 0.4);
  transform: translateX(-50%);
  z-index: 1000;
  font-size: 0.75rem;
  color: #fff;
  line-height: 2;
  padding: 0 3%;
  white-space: nowrap;
}
</style>
