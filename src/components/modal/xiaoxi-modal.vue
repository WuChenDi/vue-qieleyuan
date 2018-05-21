<template>
  <div class="modal-mask" v-show="showModal">
    <div class="xiaoxi-modal modal">
      <div class="modal-close" @click="close($event)"></div>
      <div class="modal-head">消息</div>
      <div class="modal-content">
        <div class="xiaoxi-list">
          <div class="xiaoxi-wrap" v-for="item in news" :key="item.id">
            <div class="xiaoxi-content">{{ item.msg }}</div>
            <div class="xiaoxi-footer">
              <div class="xiaoxi-time">{{ item.start_time }}</div>
            </div>
          </div>          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {getNews} from '@/js/allAxiosRequire'
export default {
  name: 'xiaoxi-modal',
  data () {
    return {
      showModal: true,
      news: []
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
      Bus.$on('openXiaoxiModal', function(){
        getNews()
        .then(function (response) {
          this.showModal = true
          this.news = response.data.news
        }.bind(this))
        .catch(function (err) {
          if(err && err.response) {
            if(err.response.status === 422) {
              Bus.$emit('openTipModal', err.response.data.msg)
            }
          }
        })
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
.xiaoxi-modal {
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 70%;
  border: 1px solid #05bae7;
  .modal-head {
    height: 3rem;
    .flex-both-center()
  }
  .modal-content {
    flex: 1;
    padding: 1rem 2rem;
    overflow: hidden;
    .xiaoxi-list {
      height: 100%;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      .xiaoxi-wrap {
        // background-color: rgba(53, 86, 115, 0.4);
        background-color: rgba(0, 0, 0, 0.4);
        font-size: 0.75em;
        border-radius: 1rem;
        padding: 0.5rem;
        margin-top: 0.8rem;
        border: 1px solid #05bae7;
        &:first-child {
          margin-top: 0;
        }
        .xiaoxi-content {
        }
        .xiaoxi-footer {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          height: 1.5rem;
          .xiaoxi-time {}
        }
      }
    }
  }
}
</style>
