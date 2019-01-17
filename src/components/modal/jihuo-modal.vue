<template>
  <div class="modal-mask" v-if="showModal">
    <div class="modal jihuo-modal">
      <div class="modal-close" @click="close($event)"></div>
      <div class="modal-head">激活好友</div>
      <div class="modal-content">
        <div class="tab-head">
          <div class="tab-head-item" @click="clickTabHead(1)" :class="{'selected': tabIndex == 1}">激活码列表</div>
          <div class="tab-head-item" @click="clickTabHead(2)" :class="{'selected': tabIndex == 2}">生成激活码</div>
          <div class="tab-head-item" @click="clickTabHead(3)" :class="{'selected': tabIndex == 3}" v-if="giveAct">赠送激活码</div>
          <!-- <div class="tab-head-item" @click="clickTabHead(3)" :class="{'selected': tabIndex == 3}">为好友激活</div> -->
        </div>
        <div class="tab-content">
          <div class="tab-content-item" v-show="tabIndex == 1">
            <div class="code-title">
              <div class="title-code">key</div>
              <div class="title-usertype">激活码类型</div>
              <!-- <div>生成人ID</div>
              <div class="title-buy-id">购买者ID</div> -->
              <div class="title-recommend-id">推荐人ID</div>
              <div class="title-user-id">使用者ID</div>
            </div>
            <!-- 滚动条 -->
            <div id="jihumaWrapper" class="scrollbar">
              <div class="code-list">
                <div class="code-list-item" v-for="item in codes">
                  <div class="code">{{ item.key }}</div>
                  <div class="code-usertype">{{ item.user_type == 1 ? '正常用户' : '测试用户' }}</div>
                 <!--  <div class="code-buy-id">{{ item.id }}</div>
                  <div class="code-buy-id">{{ item.buy_text }}</div> -->
                  <div class="code-recommend-id">{{ item.recommend_id }}</div>
                  <div class="code-user-id">{{ item.user ? item.user.id : '未使用' }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-content-item" v-show="tabIndex == 2">
            <div class="jihuoma-box">{{ newCode }}</div>
            <div class="type-select"></div>
            <!-- 单选按钮 -->
         <!--    <div class="radios">
              <radio name="robot" v-model="accountType" value="2">
                体验账号
              </radio>
              <radio name="robot" v-model="accountType" value="1">
                正常账号
              </radio>
            </div> -->
            <div class="jihuo-opra">
              <div class="create-jihuoma-btn" @click="toCreatNewJihuoma()">生成激活码</div>
            </div>
          </div>
          <div class="tab-content-item" v-show="tabIndex == 3">
            <div class="form">
              <div class="item-label">玩家ID</div>
              <div class="item-input">
                <input type="text" v-model="friendID" placeholder="请输入玩家ID">
              </div>
            </div>
            <div class="sureJiHuoBtn" @click="toSendCode">
              确认赠送
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {jihuoma, creatJihuoma, jihuoForFriend, sendJihuoma} from '@/js/allAxiosRequire'
  import {Radio} from 'vue-checkbox-radio';
  Vue.component('radio', Radio);

  export default {
    name: 'jihuo-modal',
    props: ['userType', 'giveAct'],
    data () {
      return {
        showModal: true,
        tabIndex: 1,
        codes: [],
        newCode: '',
        accountType: '1',
        friendID: ''
      }
    },
    mounted () {
      this.bindModalEvent();
    },
    components: {
    },
    computed: {
      newCodekey () {
        if(this.code.data){
          return this.code.data.key
        }
        return ''
      }
    },
    watch: {
      tabIndex(value) {
        this.$nextTick(() => {
          // 初始化scroll
          // if(!this.scroll) {
          //   this.scroll = new iScroll('jihumaWrapper', {
          //     scrollbarClass: 'myScrollbar',
          //     hScroll: true,
          //     hScrollbar: true,
          //     vScroll: true,
          //     vScrollbar: true,
          //     hideScrollbar: false,  
          //     preventDefault: false
          //   }); 
          // }else {
          //   this.scroll.refresh();
          // }
        })
      }
    },
    methods: {
      close () {
        this.showModal = false
      },
      bindModalEvent () {
        this.showModal = false
        Bus.$on('openJihuoModal', function(){
          this.showModal = true
          this.getJihuoma()
        }.bind(this));
        Bus.$on('sureCreatNewJihuoma', () => {
          this.creatNewJihuoma();
        });
        Bus.$on('sureSendCode', () => {
          this.sendCode();
        });
      },
      clickTabHead (index) {
        this.tabIndex = index
      },
      getJihuoma () {
        jihuoma()
        .then(function (response) {
          let data = response.data
          this.codes = data.actcode_list

          this.$nextTick(() => {
            // 初始化scroll
            // if(!this.scroll) {
            //   this.scroll = new iScroll('jihumaWrapper', {
            //     scrollbarClass: 'myScrollbar',
            //     hScroll: true,
            //     hScrollbar: true,
            //     vScroll: true,
            //     vScrollbar: true,
            //     hideScrollbar: false,  
            //     preventDefault: false
            //   }); 
            // }else {
            //   this.scroll.refresh();
            // }
          })
          // document.addEventListener('touchmove', function(e) {
          //   e.preventDefault();
          // }, false);

        }.bind(this))
        .catch(function (err) {
          if(err && err.response) {
            if(err.response.status === 422) {
              Bus.$emit('openTipModal', err.response.data.msg)
            }
          }
        }.bind(this))
      },
      toCreatNewJihuoma() {
        Bus.$emit('openJihuoTipsModal', 1);
      },
      creatNewJihuoma () {
        // creatJihuoma(this.userType)
        // console.log(this.accountType);
        creatJihuoma(this.accountType)
        .then(function (response) {
          let data = response.data
          Bus.$emit('openTipModal', data.msg)
          Bus.$emit('refreshData')
          this.newCode = data.data.key
        }.bind(this))
        .catch(function (err) {
          console.log(err);
          if(err && err.response) {
            if(err.response.status === 422) {
              Bus.$emit('openTipModal', err.response.data.msg)
            }
          }
        }.bind(this))
      },
      sureJiHuo() {
        if(this.friendID === '') {
          Bus.$emit('openTipModal', '请输入好友ID');
          return;
        }

        jihuoForFriend(this.friendID)
        .then(function (response) {
          console.log(response);
          Bus.$emit('openTipModal', response.data.msg)
        }.bind(this))
        .catch(function (err) {
          if(err && err.response) {
            if(err.response.status === 422) {
              Bus.$emit('openTipModal', err.response.data.msg)
            }
          }
        }.bind(this))        
      },
      toSendCode() {
        Bus.$emit('openJihuoTipsModal', 2);
      },
      sendCode() {
        if(this.friendID === '') {
          Bus.$emit('openTipModal', '请输入玩家ID');
          return;
        }

        sendJihuoma(this.accountType, this.friendID)
        .then(function (response) {
          let data = response.data
          Bus.$emit('openTipModal', data.msg)
          Bus.$emit('refreshData')
        }.bind(this))
        .catch(function (err) {
          console.log(err);
          if(err && err.response) {
            if(err.response.status === 422) {
              Bus.$emit('openTipModal', err.response.data.msg)
            }
          }
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
  .jihuo-modal {
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 70%;
    border: 1px solid #05bae7;
    .modal-head {
      height: 3rem;
      .flex-both-center()
    }
    .modal-content {
      flex: 1;
      padding: 1rem 1rem;
      display: flex;
      .tab-head {
        width: 15%;
        margin-right: 0.5rem;
        .tab-head-item {
          height: 1.5rem;
          .flex-both-center();
          border-radius: 1.5rem;
          background-color: rgba(0, 0, 0, 0.4);
          margin-bottom: 0.5rem;
          font-size: 0.85rem;
        }
        & .selected {
          color: yellow;
        }
      }
      .tab-content {
        flex: 1;
        background-color: rgba(0, 0, 0, 0.4);
        border-radius: 1rem;
        padding: 0.5rem;
        border: 1px solid #05bae7;
        .tab-content-item {
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
          .radios {
            text-align: center;
            .radio-component {
              display: inline-block;
              font-size: 0.5rem;
              margin-left: 0.5rem;
            }
          }
          .code-title {
            display: flex;
            height: 1.5rem;
            font-size: 0.9rem;
            * {
              flex: 1;
              .flex-both-center()
            }
            .title-code {
              flex: 1.5;
            }
          }
          .code-list {
            flex: 1;
            overflow: scroll;
            .code-list-item {
              display: flex;
              height: 1.5rem;
              font-size: 0.85rem;
              * {
                flex: 1;
                .flex-both-center()
              }
              .code {
                flex: 1.5;
              }
            }
          }
          .jihuoma-box {
            flex: 1;
            .flex-both-center();
            font-size: 1.8rem;
          }
          .jihuo-opra {
            .flex-both-center();
            height: 3rem;
            .create-jihuoma-btn {
              .flex-both-center();
              width: 50%;
              height: 1.6rem;
              font-size: 1rem;
              border-radius: 1.6rem;
              background-color: #20acd6;
            }
          }

          .form {
           display: flex;
           height: 16.6%;
           margin-top: 15%;

           .item-label {
            width: 30%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
          }
          .item-input {
            .flex-both-center();
            width: 65%;
            input {
              width: 85%;
              box-sizing: border-box;
              height: 1.2rem;
              border-radius: 1.2rem;
              padding-left: 1rem; 
              padding-right: 1rem;
            }
          }
        }
        .sureJiHuoBtn {
          .flex-both-center();
          width: 30%;
          height: 1.6rem;
          font-size: 1rem;
          border-radius: 1.6rem;
          background-color: #20acd6;
          margin: 2rem auto 0 auto;
        }
      }
    }
  }
}
#jihumaWrapper {
  -webkit-overflow-scrolling: touch;
  position: relative;
  height: 8rem;
  padding-bottom: 2rem;
}
</style>
