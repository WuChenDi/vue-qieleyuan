<template>
  <div class="zengzhong-modal" ref="zengzhongModal" v-if="showModal">
    <div class="modal-content"><div class="title">数量：</div><input class="zengzhong-number" type="text" v-model="seedNum" ref="number"></div>
    <div class="modal-footer" ref="modalFooter">
      <div class="modal-footer-btn-sure" @click="sure($event)" ref="btnSure">确认</div>
    </div>
  </div>
</template>
<script>
import {seeding} from '@/js/allAxiosRequire'
export default {
  name: 'zengzhong-modal',
  props: ['cell', 'depot'],
  data () {
    return {
      seedNum: 0,
      showModal: true
    }
  },
  mounted () {
    this.setHeaderFooterHeight()
    this.setBtnBorder()
    this.setNumberHeight()
    this.bindModalEvent()
    
  },
  components: {
  },
  methods: {
    setHeaderFooterHeight () {
      let bodyH = $(document.body).height()
      let footerH = bodyH * .065
      let footer = this.$refs.modalFooter
      footer.style.height = footerH + 'px'
    },
    setBtnBorder () {
      let btn = this.$refs.btnSure
      let [width, height] = [$(btn).width(), $(btn).height()]
      btn.style.borderRadius = (width > height ? height : width) + 'px'
    },
    setNumberHeight () {
      let number = this.$refs.number
      let height  = $(number).parent().height()
      number.style.height = number.style.lineHeight = number.style.borderRadius = height + 'px'
    },
    sure (e) {
      this.showModal = false
      seeding(this.cell.tree.id, this.seedNum)
      .then(function () {
        Bus.$emit('openTipModal', '成功增养~')
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
    bindModalEvent () {
      this.showModal = false
      Bus.$on('toggleZengzhongModal', function(){
        if(this.cell.xy === undefined) {
          Bus.$emit('openTipModal', '请先选择企鹅窝')
        }else{
          if(!this.cell.tree) {
            Bus.$emit('openTipModal', '该企鹅屋未开放，不能增养')
          }else{
            this.seedNum = 0
            this.showModal = !this.showModal
          }
        }

        console.log('test_cell: ' + this.cell);
        if(this.cell.xy !== undefined) {
          let max_fruit = this.cell.land.max_fruit * 1;
          let currentFruit = this.cell.tree.fruit;
          let n = max_fruit - currentFruit;
          if(n > this.depot) {
            this.seedNum = this.depot;
          }else {
            this.seedNum = n;
          }
        }
      }.bind(this))
    },
  }
}
</script>
<style scoped lang="less" type="text/less">
.hide {
  display: none;
}
.zengzhong-modal {
  position: absolute;
  width: 15%;
  left: 33%;
  top: 69%;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 8%;
  z-index: 10;
  font-size: 0.75rem;
  color: #fff;
  .modal-content {
    display: flex;
    padding: 10% 5%;
    white-space: nowrap;
    align-items: center;
    .title {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .zengzhong-number {
      width: 70%;
      color: #333;
      box-sizing: border-box;
      padding: 0 10%;
      display: inline-block;
      background-color: #fff;
    }
  }
  .modal-footer {
    position: relative;
    text-align: center;
    .modal-footer-btn-sure {
      display: flex;
      justify-content: center;
      align-items: center;
      display: inline-block;
      padding: 1% 5%;
      width: 30%;
      background-color: #14c3fe; 
      text-align: center;
    }
  }
}
</style>
