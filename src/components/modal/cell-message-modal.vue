<template>
  <div class="cell-message-modal" ref="cellMessageModal" v-show="showModal">
    <div class="message-item head">
      <div class="landName">{{ cellName }}</div>
    </div>
    <div class="message-item">
      <div class="label">增养范围:</div>
      <div class="value">{{ cellRange }}</div>
    </div>
    <div class="message-item" v-show="cell.tree">
      <div class="label">增养量:</div>
      <div class="value">{{ cellFruit }}</div>
    </div>
    <div class="message-item" v-show="cell.tree">
      <div class="label">施肥:</div>
      <div class="value">{{ cellFertilizer }}</div>
    </div>
    <div class="message-item" v-show="cell.tree">
      <div class="label">剩余生长期:</div>
      <div class="value">{{ restDay }}天</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'cell-message-modal',
    props: ['fertilizer'],
    data () {
      return {
        showModal: true,
        cell: {}
      }
    },
    mounted () {
      this.modalEvent()
    },
    updated () {
      if(this.ele) {
        this.setPosition(this.ele)
      }
    },
    components: {
    },
    methods: {
      close () {
      },
      modalEvent () {
        this.showModal = false
        Bus.$on('showCellMessage', function (el, cell) {
          this.ele = el
          this.cell = cell
          this.showModal = true
          clearTimeout(this.timer)
          this.timer = setTimeout(function () {
            this.showModal = false
          }.bind(this), 3000)
        }.bind(this))
      },
      setPosition (el) {
        let position = $(el).position()
        let modal = this.$el
        if($('body').width() > $('body').height()) {
          $(modal).css('left', position.left + ($(el).width()-$(modal).width())/2)
          $(modal).css('top', position.top - $(modal).height())
        }else {
          $(modal).css('bottom', position.left + ($(el).width()-$(modal).width())/2 + 70)
          $(modal).css('left', position.top - $(modal).height())
        }

      }
    },
    computed: {
      cellName () {
        if(this.cell.xy === undefined){
          return ''
        }
        return this.cell.land.name || ''
      },
      cellRange () {
        if(this.cell.xy === undefined) {
          return ''
        }
        return this.cell.land.min_fruit + '-' + this.cell.land.max_fruit
      },
      cellFruit () {
        if(this.cell.xy === undefined) {
          return ''
        }
        if(!this.cell.tree) {
          return ''
        }
        return this.cell.tree.fruit
      },
      cellFertilizer () {
        if(this.cell.xy === undefined) {
          return 0
        }
        if(!this.cell.tree){
          return 0
        }
        if(this.fertilizer == 0) {
          return 0
        }
        return this.cell.tree.out_fruit
      },
      restDay () {
        if(this.cell.xy === undefined) {
          return 0
        }
        if(!this.cell.tree){
          return 0
        }
        let createDate = new Date(this.cell.tree.created_at.replace(/-/g,"/"))
        let thisDate = new Date()
        return 60 - parseInt((thisDate/1000 - createDate/1000)/(3600*24));
      }
    },
    watch: {
    }
  }
</script>
<style scoped lang="less" type="text/less">
  .hide {
    display: none;
  }
  .cell-message-modal {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 0.5rem;
    z-index: 10;
    font-size: 0.8rem;
    color: #fff;
    padding: 0.5rem 0;
    width: 11rem;
    .message-item {
      display: flex;
      height: 1rem;
      font-size: 0.7rem;
      &.head {
        font-size: 0.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1.3rem;
      }
      .label {
        flex: 1;
        padding-right: 0.5rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
      .value {
        flex: 1;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
    }
  }
</style>
