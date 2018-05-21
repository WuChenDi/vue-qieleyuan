<template>
  <div class="modal-mask" v-if="showModal">
    <div class="modal frends-modal">
      <div class="modal-close" @click="close($event)"></div>
      <div class="modal-content">
        <div class="tabs-head">
          <div class="tabs-head-item" :class="{'head-select': selectFriendType == 0}" @click="clickFriend('0', $event)">总数({{allFriendsNum}})</div>
          <div class="tabs-head-item" :class="{'head-select': selectFriendType == 1}" @click="clickFriend('1', $event)">一代好友({{level1Num}})</div>
          <div class="tabs-head-item" :class="{'head-select': selectFriendType == 2}" @click="clickFriend('2', $event)">二代好友({{level2Num}})</div>
          <div class="tabs-head-item" :class="{'head-select': selectFriendType == 3}" @click="clickFriend('3', $event)">三代好友({{level3Num}})</div>
          <div class="tabs-head-item" :class="{'head-select': selectFriendType == 5}" @click="clickLeaderReward($event)">领导奖提现</div>
          <!-- <div class="tabs-head-item" :class="{'head-select': selectFriendType == 4}" @click="clickReward($event)">奖励明细</div> -->
        </div>
        <div class="tabs-content">
          <!-- .friends-list-content -->
          <div class="friends-list-content" v-show="showFriends">
            <div class="tabs-content-title" v-show="selectFriendType === 0">总数</div>
            <div class="tabs-content-title" v-show="selectFriendType === 1">一代好友</div>
            <div class="tabs-content-title" v-show="selectFriendType === 2">二代好友</div>
            <div class="tabs-content-title" v-show="selectFriendType === 3">三代好友</div>
            <div class="tabs-content-list-comment">
              <div class="item-list-nicheng">昵称</div>
              <div class="item-list-id">ID</div>
              <div class="item-list-mishu">玩耍</div>
              <div class="item-list-caozuo">操作</div>
            </div>
            <!-- 滚动条 -->
            <div id="friendsWrapper" class="scrollbar">
              <div class="item-list-content">
                <div class="item-list-item" v-for="item in selectFriends" :key="item.id">
                  <div class="item-list-nicheng">{{ item.nick }}</div>
                  <div class="item-list-id">{{ item.id }}</div>
                  <div class="item-list-mishu">{{ item.day_fruit }}</div>
                  <div class="item-list-caozuo"><a href="javascript:void(0)" :data-id="item.id" v-show="item.gather ? false : true" @click="gather($event)">玩耍</a></div>
                </div>
              </div>
            </div>
            <!-- <span>{{isOneGather}}</span> -->
            <div class="isOneGather" v-show="isOneGather === 0">
              您需要消耗10个企鹅开通一键玩耍功能！
            </div>
            <div class="item-list-footer">
              <div class="list-footer-btn" @click="toAllGather($event)" :class="{'btn-disable': hasCaimi}">一键玩耍</div>
            </div>
          </div>
          <!-- 领导奖面板 -->
          <div class="leaderReward-list-content" v-show="!showFriends">
            <h2>个人信息</h2>
            <div class="formGroup">
              <div class="from">
                <label>账 户：</label>
                <input type="text" v-model="account" placeholder="请输入微信或支付宝账户">
              </div>
              <div class="from">
                <label>账户名：</label>
                <input type="text" v-model="accountName" placeholder="请输入姓名或昵称">
              </div>
              <div class="from">
                <label>类 型：</label>
                <div class="radios">
                  <radio name="payType" v-model="payType" value="微信">
                    微 信
                  </radio>
                  <radio name="payType" v-model="payType" value="支付宝">
                    支付宝
                  </radio>
                </div>
              </div>
              <div class="from">
                <label>备 注：</label>
                <input type="text" v-model="remark" placeholder="请填写联系方式或其他">
              </div>
              <div class="from">
                <button class="sure" @click="withdrawals">确认提现</button>
              </div>
            </div>
          </div>
          <!-- .reward-list-content -->
          <!-- <div class="reward-list-content" v-show="!showFriends">
            <div class="tabs-content-list-comment">
              <div class="item-list-time">时间</div>
              <div class="item-list-id">ID</div>
              <div class="item-list-reward">奖励</div>
            </div>
            <div class="item-list-content">
              <div class="item-list-item">
                <div class="item-list-time">彼岸花</div>
                <div class="item-list-id">123456789</div>
                <div class="item-list-reward">20</div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
  import Vue from 'vue'
  import {getFriends, oneGather, simplyGather, leaderRewardWithdrawals} from '@/js/allAxiosRequire'
  import {Radio} from 'vue-checkbox-radio';
  Vue.component('radio', Radio);

  export default {
    name: 'frends-modal',
    props: ['isOneGather'],
    data () {
      return {
        showModal: false,
        allFriends: [],
        rewardDetail: [],
        selectFriendType: 0,
        selectFriends: [],
        showFriends: true,
        hasCaimi: false,
        level1Num: 0,
        level2Num: 0,
        level3Num: 0,
        account: '',
        accountName: '',
        payType: '微信',
        remark: ''
      }
    },
    mounted () {
      this.modalEvent();
    },
    components: {
    },
    computed: {
      allFriendsNum() {
        return this.level1Num + this.level2Num + this.level3Num;
      }
    },
    watch: {
      showModal(value) {
        if(value === true) {
          // this.$nextTick(() => {
          //   // 初始化scroll
          //   this.scroll = new iScroll('friendsWrapper', {
          //     scrollbarClass: 'myScrollbar',
          //     hScroll: true,
          //     hScrollbar: true,
          //     vScroll: true,
          //     vScrollbar: true,
          //     hideScrollbar: false,  
          //   }); 
          // })
        }
      },      
      allFriends (value) {
        let newSelect = []
        let caimi = false
        for (var i = 0; i < value.length; i++) {
          if (value.level == this.selectFriendType) {
            newSelect.push(value[i])
          }
          if(!value[i].gather) {
            caimi = true
          }
        }
        this.hasCaimi = caimi
        
      }
    },
    methods: {
      modalEvent () {
        Bus.$on('openFriendsModal', function() {
          getFriends()
          .then(function (respones) {
            this.selectFriends = this.allFriends = respones.data.friends
            this.selectFriendType = 0
            this.showFriends = true
            this.showModal = true
            let level1 = 0;
            let level2 = 0;
            let level3 = 0;
            for (let i = 0; i < this.allFriends.length; i++) {
              if(this.allFriends[i].level == 1) {
                level1++;
              }else if(this.allFriends[i].level == 2) {
                level2++;
              }else if(this.allFriends[i].level == 3) {
                level3++;
              }
            }  
            this.level1Num = level1;
            this.level2Num = level2;
            this.level3Num = level3;
            
            // this.$nextTick(() => {
            //    // 初始化scroll
            //    if(!this.scroll) {
            //     this.scroll = new iScroll('friendsWrapper', {
            //       scrollbarClass: 'myScrollbar',
            //       hScroll: true,
            //       hScrollbar: true,
            //       vScroll: true,
            //       vScrollbar: true,
            //       hideScrollbar: false,  
            //     }); 
            //   }else {
            //     this.scroll.refresh();
            //   }
            // })

          }.bind(this))
          .catch(function (err) {
            if(err && err.response) {
              if(err.response.status === 422) {
                Bus.$emit('openTipModal', err.response.data.msg)
              }
            }
          })
        }.bind(this))
        Bus.$on('closeFriendsModal', function () {
          this.showModal = false
        }.bind(this))
        Bus.$on('sureAllGather', () => {
          this.allGather();
        });
      },
      close (e) {
        this.showModal = false
      },
      clickFriend (friendType,event) {
        this.selectFriendType = parseInt(friendType)
        if(friendType == 0) {
          this.selectFriends = this.allFriends
        }else{
          let newSelect = []
          for (let i = 0; i < this.allFriends.length; i++) {
            if(this.allFriends[i].level == friendType) {
              newSelect.push(this.allFriends[i])
            }
          }        
          this.selectFriends = newSelect
        }
        this.showFriends = true
        
        this.$nextTick(() => {
          // 初始化scroll
          // if(!this.scroll) {
          //   this.scroll = new iScroll('friendsWrapper', {
          //     scrollbarClass: 'myScrollbar',
          //     hScroll: true,
          //     hScrollbar: true,
          //     vScroll: true,
          //     vScrollbar: true,
          //     hideScrollbar: false,  
          //   }); 
          // }else {
          //   this.scroll.refresh();
          // }
        })

      },
      clickLeaderReward() {
        this.selectFriendType = 5;
        this.showFriends = false;
      },
      clickReward (event) {
        this.selectFriendType = 4
        this.showFriends = false
      },
      toAllGather() {
        if(this.isOneGather === 0) {
          Bus.$emit('openJihuoTipsModal', 3);
        }else {
          this.allGather();
        }
      },
      allGather (event) {
        oneGather()
        .then(function (respones) {
          let msg = respones.data.msg
          Bus.$emit('openTipModal', msg)
          Bus.$emit('openFriendsModal')
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
      gather (event) {
        let target = event.target
        let id = $(target).attr('data-id')
        simplyGather(id)
        .then(function (respones) {
          let msg = respones.data.msg
          Bus.$emit('openTipModal', msg)
          Bus.$emit('openFriendsModal')
          Bus.$emit('refreshData')
        }.bind(this))
        .catch(function (err) {
          if(err && err.response) {
            if(err.response.status === 422) {
              Bus.$emit('openTipModal', err.response.data.msg)
            }
          }
        })
      },
      withdrawals() {
        leaderRewardWithdrawals(this.account, this.accountName, this.payType, this.remark)
        .then(function (respones) {
          let msg = respones.data.msg
          Bus.$emit('openTipModal', msg)
          // Bus.$emit('openFriendsModal')
          Bus.$emit('refreshData')
        }.bind(this))
        .catch(function (err) {
          if(err && err.response) {
            if(err.response.status === 422) {
              Bus.$emit('openTipModal', err.response.data.msg)
            }
          }
        })
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
  // 好友列表模态框样式
  .frends-modal {
    .flex-both-center();
    width: 70%;
    height: 80%;
    border: 1px solid #05bae7;
    .modal-content {
      display: flex;
      justify-content: space-between;
      width: 80%;
      height: 75%;
      .tabs-head {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        width: 25%;
        font-size: 0.85rem;
        .tabs-head-item { 
          .flex-both-center();
          width: 100%;
          height: 1.5rem;
          white-space:nowrap;
          border-radius: 1.5rem;
          background-color: rgba(0, 0, 0, 0.4);
          &.head-select {
            color: yellow;
          }
        }
      }
      .tabs-content {
        width: 70%;
        height: 100%;
        background: white;
        background-color: rgba(0, 0, 0, 0.4);
        .friends-list-content {
          width: 100%;
          height: 100%;
          .tabs-content-title {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            height: 10%;
            font-size: 1rem;
          }
          .tabs-content-list-comment {
            height: 15%;
            display: flex;
            > * {
              .flex-both-center();
              height: 100%;
              font-size: 1rem
            }
            .item-list-nicheng {
              width: 20%;
            }
            .item-list-id {
              width: 40%;
            }
            .item-list-mishu {
              width: 20%;
            }
            .item-list-caozuo {
              width: 20%;
            }
          }
          .item-list-content {
            overflow: scroll;
            .item-list-item {
              width: 100%;
              height: 15%;
              display: flex;
              >* {
                .flex-both-center();
                height: 100%;
                font-size:0.8rem
              }
              .item-list-nicheng {
                width: 20%;
              }
              .item-list-id {
                width: 40%;
              }
              .item-list-mishu {
                width: 20%;
              }
              .item-list-caozuo {
                width: 20%;
                a {
                  color: #fff;
                }
              }
            }
          }
          .isOneGather {
            font-size: 0.5rem;
            text-align: center;
          }
          .item-list-footer {
            height: 15%;
            .flex-both-center();
            .list-footer-btn {
              .flex-both-center();
              height: 65%;
              width: 50%;
              background-image: url('~@/assets/an-bg01.png');
              background-size: 100% 100%;
              background-repeat: no-repeat;
              background-position: center center;
              font-size: 1.1rem;
              &.btn-disable {
                background: #05bae7;
                border-radius: 1rem;
                // background-image: url('~@/assets/an-bg02.png');
              }
            }
          }
        }
        .leaderReward-list-content {
          text-align: center;
          h2 {
            font-size: 1rem;
          }
          .formGroup {
            .from {
              overflow: hidden;
              margin-top: 1.2rem;
              label {
                display: inline-block;
                width: 25%;
                text-align: right;
                float: left;
                margin-left: 1rem;
                font-size: 0.8rem;
              }
              input {
                width: 55%;
                float: right;
                margin-right: 1rem;
                border-radius: 0.5rem;
                padding-left: 0.8rem;
                height: 1rem;
                font-size: 0.8rem;
              }
              .radios {
                .radio-component {
                  display: inline-block;
                  font-size: 0.8rem;
                  position: relative;
                  top: -0.1rem;
                }
              }
              .sure {
                border: none;
                background-color: #20acd6;
                color: #fff;
                border-radius: 1rem;
                padding: 0.2rem 0.8rem;
                margin-top: 0.3rem;
                font-size: 0.8rem;
              }
            }
          }
        }
        .reward-list-content {
          width: 100%;
          height: 100%;
          .tabs-content-list-comment {
            height: 15%;
            display: flex;
            > * {
              .flex-both-center();
              height: 100%;
              font-size: 1rem
            }
            .item-list-time {
              width: 40%;
            }
            .item-list-id {
              width: 40%;
            }
            .item-list-reward {
              width: 20%;
            }
          }
          .item-list-content {
            height: 85%;
            overflow: auto;
            .item-list-item {
              width: 100%;
              height: 15%;
              display: flex;
              >* {
                .flex-both-center();
                height: 100%;
                font-size:0.8rem
              }
              .item-list-time {
                width: 40%;
              }
              .item-list-id {
                width: 40%;
              }
              .item-list-reward {
                width: 20%;
              }
            }
          }
        }
      }
    }
  }
  #friendsWrapper {
    position: relative;
    height: 50%;
    -webkit-overflow-scrolling: touch;
  }
</style>
