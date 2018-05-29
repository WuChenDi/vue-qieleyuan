<template>
<!-- 用户信息弹窗 -->
  <div class="modal-mask" v-show="showModal">
    <div class="account-modal modal">
      <div class="modal-close" @click="close($event)"></div>
      <div class="modal-head"></div>
      <div class="modal-content">
        <div class="account-image">
          <img :src="imageSrc" @click="chooseImage($event)">
        </div>
        <div class="account-message">
          <div class="account-message-cell">
            <div class="account-message-cell-content">
              <div class="cell-key">手机号码</div>
              <div class="cell-value"><input type="text" v-model="phone" readonly></div>
            </div>
            <div class="account-message-cell-edit" ref="cellEdit">
            </div>
          </div>
          <div class="account-message-cell">
            <div class="account-message-cell-content">
              <div class="cell-key">ID账号</div>
              <div class="cell-value"><input type="text" v-model="userId" readonly></div>
            </div>
            <div class="account-message-cell-edit" ref="cellEdit">
            </div>
          </div>
          <div class="account-message-cell">
            <div class="account-message-cell-content">
              <div class="cell-key">游戏昵称</div>
              <div class="cell-value">
                <div class="cell-value-label" v-show="!nickEdit">{{ hereNick }}</div>
                <input type="text" v-model="hereNick" v-show="nickEdit" ref="nick">
              </div>
            </div>
            <div class="account-message-cell-edit" ref="cellEdit">
              <div class="cell-btn" @click="operateNich()">{{ nickEdit ? '保存' : '修改' }}</div>
            </div>
          </div>
          <div class="account-message-cell">
            <div class="account-message-cell-content">
              <div class="cell-key">一级密码</div>
              <div class="cell-value">
                <input type="text" v-model="oneLevelPassword" readonly>
              </div>
            </div>
            <div class="account-message-cell-edit" ref="cellEdit">
              <div class="cell-btn" @click="password('login')">修改</div>
            </div>
          </div>
          <div class="account-message-cell">
            <div class="account-message-cell-content">
              <div class="cell-key">二级密码</div>
              <div class="cell-value">
                <input type="text" v-model="twoLevelPassword" readonly>
              </div>
            </div>
            <div class="account-message-cell-edit" ref="cellEdit">
              <div class="cell-btn" @click="password('safe')">修改</div>
            </div>
          </div>
          <div class="account-message-cell">
            <div class="account-message-cell-content">
              <div class="cell-key">微信号</div>
              <div class="cell-value">
                <div class="cell-value-label" v-show="!weixinEdit">{{ hereWeixin }}</div>
                <input type="text" v-model="hereWeixin" ref="weixin" v-show="weixinEdit">
              </div>
            </div>
            <div class="account-message-cell-edit" ref="cellEdit">
              <div class="cell-btn" @click="operateWeixin()">{{ weixinEdit ? '保存' : '修改' }}</div>
            </div>
          </div>
          <div class="account-message-cell">
            <div class="account-message-cell-content">
              <div class="cell-key">推荐人ID</div>
              <div class="cell-value"><input type="text" v-model="parentId"></div>
            </div>
            <div class="account-message-cell-edit" ref="cellEdit">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {setNick, setWeixin} from '@/js/allAxiosRequire'
export default {
  name: 'account-modal',
  props: {
    phone: {
      type: String,
      default: ''
    },
    userId: {
      type: [Number, String],
      default: ''
    },
    userName: {
      type: String,
      default: ''
    },
    userImage: {
      type: String,
      default: ''
    },
    weixin: {
      type: String,
      default: ''
    },
    parentId: {
      type: [String, Number],
      default: 0
    }
  },
  data () {
    return {
      defaultImages: {
        '1': require('../../assets/portrait-tu01.png'),
        '2': require('../../assets/portrait-tu02.png'),
        '3': require('../../assets/portrait-tu03.png'),
        '4': require('../../assets/portrait-tu04.png'),
        '5': require('../../assets/portrait-tu05.png')
      },
      oneLevelPassword: '????????????',
      twoLevelPassword: '????????????',
      showModal: true,
      nickEdit: false,
      weixinEdit: false,
      hereNick: '',
      hereWeixin: ''
    }
  },
  mounted () {
    this.bindModalEvent()
  },
  updated () {
    if(this.nickEdit === true) {
      $(this.$refs.nick).focus()
    }
    if(this.weixinEdit === true) {
      $(this.$refs.weixin).focus()
    }
  },
  computed: {
    imageSrc () {
      if(this.userImage === '' || this.userImage === null || this.userImage === undefined){
        return this.defaultImages['1']
      }
      if(this.defaultImages[this.userImage]){
        return this.defaultImages[this.userImage]
      }else{
        return window.baseURL + this.userImage
      }
    }
  },
  components: {
  },
  methods: {
    password (type) {
      Bus.$emit('openPasswordModal', type);
      this.showModal = false
    },
    chooseImage (e) {
      this.showModal = false
      Bus.$emit('openChooseImageModal')
    },
    close () {
      this.showModal = false
    },
    bindModalEvent () {
      this.showModal = false
      Bus.$on('openAccountModal', function(){
        this.showModal = true
      }.bind(this))
      Bus.$on('closeAccountModal', function(){
        this.showModal = false
      }.bind(this))
    },
    // 操作游戏昵称
    operateNich () {
      if(this.nickEdit === true) {
        setNick(this.hereNick)
        .then(function (response) {
          this.nickEdit = false
          Bus.$emit('openTipModal', response.data.msg)
          Bus.$emit('refreshData')
        }.bind(this))
        .catch(function (err) {
          if(err && err.response) {
            if(err.response.status === 422) {
              Bus.$emit('openTipModal', err.response.data.msg)
            }
          }
        })
      }else{
        this.nickEdit = true
      }
    },
    // 操作微信号
    operateWeixin () {
      if(this.weixinEdit === true) {
        setWeixin(this.hereWeixin)
        .then(function (response) {
          this.weixinEdit = false
          Bus.$emit('openTipModal', response.data.msg)
          Bus.$emit('refreshData')
        }.bind(this))
        .catch(function (err) {
          if(err && err.response) {
            if(err.response.status === 422) {
              Bus.$emit('openTipModal', err.response.data.msg)
            }
          }
        })
      }else{
        this.weixinEdit = true
      }
    }
  },
  watch : {
    userName (value) {
      this.hereNick = value
    },
    weixin (value) {
      this.hereWeixin = value
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
.account-modal {
  display: flex;
  flex-direction: column;
  width: 45%;
  font-size: 0.88rem;
  border: 1px solid #05bae7;
  .modal-head {
    .flex-both-center()
  }
  .modal-content {
    flex: 1;
    padding: 1rem 2rem;
    .account-image {
      .flex-both-center();
      height: 4rem;
      padding-bottom: 0.5rem;
      img {
        height: 4rem;
        width: 4rem;
        border-radius: 4rem;
      }
    }
    .account-message {
      .account-message-cell {
        display: flex;
        height: 2.3rem;
        .account-message-cell-content {
          display: flex;
          flex: 4;
          border-bottom: 1px solid #fff;
          margin-right: 0.5rem;
          .cell-key {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex: 2;
          }
          .cell-value {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex: 4;
            margin-left: 0.5rem;
            input {
              padding: 0;
              outline: none;
              border: 0;
              width: 100%;
              height: 2.3rem;
              line-height: 2.3rem;
              background-color: transparent;
              color: #fff;
            }
            .cell-value-label {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              width: 100%;
              height: 2.3rem;
              color: #fff;
            }
          }
        }
        .account-message-cell-edit {
          flex: 1;
          .flex-both-center();
          .cell-btn {
            width: 100%;
            height: 1.5rem;
            background-image: url('~@/assets/an-bg01.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position: center center;
            .flex-both-center();
          }
        }
      }
    }
  }
}
</style>
