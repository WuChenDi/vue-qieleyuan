<template>
  <div class="modal-mask" v-show="showModal">
    <div class="password-modal modal">
      <div class="modal-close" ref="btnClose" @click="close($event)"></div>
      <div class="modal-head">
        <p v-if="passwordType === 'login'">修改登录密码</p>
        <p v-if="passwordType === 'safe'">修改交易密码</p>
      </div>
      <div class="modal-content">
        <div class="modal-content-cell" v-if="passwordType === 'login'">
          <div class="cell-key">原始密码</div>
          <div class="cell-value">
            <input type="password" v-model="oldPassword">
          </div>
        </div>
        <div class="modal-content-cell" v-if="passwordType === 'safe'">
          <div class="cell-key">验证码</div>
          <div class="cell-value cell-value-safe">
            <input type="number" v-model="code">
          </div>
          <div class="getCode" @click="getCode">获取验证码</div>
        </div>
        <div class="modal-content-cell">
          <div class="cell-key">新密码</div>
          <div class="cell-value">
            <input type="password" v-model="newPassword1">
          </div>
        </div>
        <div class="modal-content-cell">
          <div class="cell-key">再次确认</div>
          <div class="cell-value">
            <input type="password" v-model="newPassword2">
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <div class="modal-footer-btn-sure" ref="btnSure" @click="sure">确认</div>
      </div>
    </div>    
  </div>
</template>
<script>
  import {userPassword, getCode} from '@/js/allAxiosRequire'
  export default {
    name: 'password-modal',
    data () {
      return {
        showModal: true,
        oldPassword: '',
        newPassword1: '',
        newPassword2: '',
        passwordType: '',
        code: ''
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
      getCode() {
        getCode()
        .then(function (response) {
          Bus.$emit('openTipModal', response.data.msg)
        }.bind(this))
        .catch(function (err) {
          if(err && err.response) {
            if(err.response.status === 422) {
              Bus.$emit('openTipModal', err.response.data.msg)
            }
          }
        })
      },
      sure () {
        if(this.passwordType === 'login') {
          if(this.oldPassword === '' || this.newPassword1 === '' || this.newPassword2 === '') {
            Bus.$emit('openTipModal', '密码不能为空')
            return
          }
          if(this.newPassword2 !== this.newPassword1) {
            Bus.$emit('openTipModal', '两次输入的新密码不一致~')
            return
          }
        }else if(this.passwordType === 'safe') {
          if(this.code === '') {
            Bus.$emit('openTipModal', '验证码不能为空');
            return;
          }else if(this.newPassword1 === '' || this.newPassword2 === '') {
            Bus.$emit('openTipModal', '密码不能为空');
            return;
          }
          if(this.newPassword2 !== this.newPassword1) {
            Bus.$emit('openTipModal', '两次输入的新密码不一致~');
            return;
          }

          this.oldPassword = this.code;
        }

        userPassword(this.passwordType, this.oldPassword, this.newPassword1)
        .then(function (response) {
          // this.showModal = false
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
      },
      bindModalEvent () {
        this.showModal = false
        Bus.$on('openPasswordModal', function(type){
          this.passwordType = type;
          this.oldPassword = '';
          this.newPassword1 = '';
          this.newPassword2 = '';
          this.code = '';
          this.showModal = true
        }.bind(this))
      }
    }
  }
</script>
<style scoped lang="less" type="text/less">
  .flex-both-center () {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .password-modal {
    width: 20rem;
    color: #fff;
    .modal-head {
      height: 2.1rem;
      text-align: center;
    }
    .modal-content {
      padding: 1rem;
      font-size: 0.9rem;
      .modal-content-cell {
        display: flex;
        height: 2rem;
        .cell-key {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-right: 0.5rem;
        }
        .cell-value {
          flex: 3;
          margin-left: 1rem;
          .flex-both-center();
          input {
            width: 90%;
            height: 1.5rem;
            padding: 0;
            padding: 0 0.5rem;
            outline: none;
            border: 0;
            background-color: rgba(0, 0, 0, 0.4);
            line-height: 1.5rem;
            color: #fff;        
          }
        }

        .cell-value-safe {
          flex: 1.5;
          margin-left: 1.4rem;
        }

        .getCode {
          flex: 1.5;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          height: 1.2rem;
          border-radius: 1.2rem;
          font-size: 0.8rem;
          background-color: #20acd6;
          text-align: center;
          position: relative;
          top: 0.25rem;
          margin-left: 1rem;
        }
      }
    }
    .modal-footer {
      height: 2.5rem;
      display: flex;
      .flex-both-center();
      .modal-footer-btn-sure {
        .flex-both-center();
        height: 1.5rem;
        width: 5rem;
        background-image: url('~@/assets/an-bg01.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  }
</style>
