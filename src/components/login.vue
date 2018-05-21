<template>
  <div class="login">
    <!-- 登录加载 -->
    <div class="modal-mask loading" v-show="loginType == 'loading'">
      <div class="login-loading">
        <div class="login-loading-bar">
          <div class="login-loading-wrap">
            <div class="login-loading-dot" ref="dot"></div>
          </div>
          <div class="login-loading-left"></div>
          <div class="login-loading-right"></div>
          <!-- <div class="login-loading-percent">{{ percent }}%</div> -->
        </div>
      </div>
    </div>
    <!-- 登录界面 -->
    <div class="modal-mask denglu" v-show="loginType == 'denglu'">
      <div class="login-denglu">
        <div class="denglu-logo"></div>
        <div class="denglu-content">
          <div class="denglu-main">
            <div class="main-input-wrap" ref="mainInputWrap">
              <div class="input-cell">
                <div class="input-label">游戏账号 : </div>
                <div class="input"><input type="text" ref="youxizhanghu" v-model.number.trim="dengluAccount"></div>
              </div>
              <div class="input-cell">
                <div class="input-label">登录密码 : </div>
                <div class="input"><input type="password" ref="denglumima" v-model.trim="dengluPassword"></div>
              </div>
              <div class="input-cell">
                <div class="input-label">记住密码 : </div>
                <div class="input">
                  <checkbox name="rememberPsw" class="rememberPsw" v-model="rememberPsw" value="1">
                  </checkbox>
                </div>
              </div>
            </div>
            <div class="main-btn-wrap">
              <div class="main-btn-denglu" ref="dengluBtn" @click="dengluOperation($event)">登录</div>
              <div class="main-btn-other-wrap">
                <div class="main-btn-wangjimima" @click="toForget($event)">忘记密码?</div>
                <div class="main-btn-zhuce" @click="toZhuce($event)">注册</div>
              </div>
            </div>
          </div>
          <div class="denglu-mianze">
            <div class="input-label">我已阅读并同意</div>
            <div class="input">
              <checkbox name="rememberMZSM" class="rememberMZSM" v-model="rememberMZSM" value="1">
              </checkbox>
            </div>
            <div class="mianze-content-cli" @click="toMianzeshengming($event)">《免责声明》</div>
          </div>
        </div>
        <!-- <a class="downloadUrl" href="https://fir.im/jc5f" target="_blank">Android、IOS下载</a> -->
        <!-- <div class="deng-footer">确认</div> -->
      </div>
    </div>
    <!-- 注册界面 -->
    <div class="modal-mask zhuce" v-show="loginType == 'zhuce'">
      <div class="zhuce-modal">
        <div class="modal-head">注册</div>
        <div class="modal-content">
          <div class="content-item">
            <div class="item-label">手机号</div>
            <div class="item-input">
              <input type="text" v-model="DLPhone" placeholder="请输入手机号">
            </div>
            <div class="item-star"></div>
          </div>
          <div class="content-item">
            <div class="item-label">游戏昵称</div>
            <div class="item-input">
              <input type="text" v-model="DLName" placeholder="请输入昵称">
            </div>
            <div class="item-star"></div>
          </div>
          <div class="content-item">
            <div class="item-label">激活码</div>
            <div class="item-input">
              <input type="text" v-model="DLJihuoma" placeholder="请输入激活码" @blur="yanzhengJiHuoMa">
            </div>
            <div class="item-star"></div>
          </div>
          <div class="content-item">
            <div class="item-label">一级密码</div>
            <div class="item-input">
              <input type="text" v-model="DLFirstPassword" placeholder="请输入登录密码">
            </div>
            <div class="item-star"></div>
          </div>
          <div class="content-item">
            <div class="item-label">二级密码</div>
            <div class="item-input">
              <input type="text" v-model="DLSencondPassword" placeholder="请输入交易密码">
            </div>
            <div class="item-star"></div>
          </div>
          <div class="content-item">
            <div class="item-label">微信账号</div>
            <div class="item-input">
              <input type="text" v-model="DLWeixin" placeholder="请输入微信号">
            </div>
            <div class="item-star"></div>
          </div>
          <div class="content-item" v-if="is_DLJihuoma">
            <div class="item-label">验证码</div>
            <div class="item-input">
              <div class="input-yanzheng">
                <input type="text" v-model="DLYanzheng" placeholder="4位数字">
              </div>
              <div class="btn-yanzheng">
                <div class="yanzheng" @click="getYanzheng()">{{ ZCdaojishi ? ZCdaojishimiao : '获取验证码'}}</div>
              </div>
            </div>
            <div class="item-star"></div>
          </div>
        </div>
        <div class="modal-foot">
          <div class="btn-to-denglu">
            <a @click="toDenglu($event)">返回登录</a>
          </div>
          <div class="btn-zhuce" @click="postChuze()">注册</div>
          <div class="btn-to-forget">
            <a @click="toForget($event)">忘记密码</a>
          </div>
        </div>
      </div>
    </div>
    <!-- 忘记密码 -->
    <div class="modal-mask forget" v-show="loginType == 'forget'">
      <div class="login-forget">
        <div class="forget-logo"></div>
        <div class="forget-modal">
          <div class="modal-head">忘记密码</div>
          <div class="modal-content">
            <div class="content-item">
              <div class="item-label">手机账号:</div>
              <div class="item-input">
                <input type="text" v-model="forgetPnone">
              </div>
            </div>
            <div class="content-item">
              <div class="item-label">验证码:</div>
              <div class="item-input">
                <div class="input-yanzheng">
                  <input type="text" v-model="forgetYanzhengma">
                </div>
                <div class="btn-yanzheng">
                  <div class="yanzheng" @click="getForgetYanzhengma()">{{ WJdaojishi ? WJdaojishimiao : '获取验证码' }}</div>
                </div>
              </div>
            </div>
            <div class="content-item">
              <div class="item-label">新密码:</div>
              <div class="item-input">
                <input type="text" v-model="forgetPassword1">
              </div>
            </div>
            <div class="content-item">
              <div class="item-label">再次确认:</div>
              <div class="item-input">
                <input type="text" v-model="forgetPassword2">
              </div>
            </div>
            <div class="main-btn-wrap">
              <div class="main-btn-forget" @click="forgetOperation($event)">确认</div>
              <div class="main-btn-other-wrap">
                <div class="main-btn-wangjimima" @click="toDenglu($event)">返回登录</div>
                <div class="main-btn-zhuce" @click="toZhuce($event)">注册</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 免责声明 -->
    <div class="modal-mask mianzeshengming" v-show="loginType == 'mianzeshengming'">
      <div class="login-mianze">
        <div class="mianze-logo"></div>
        <div class="mianze-modal">
          <div class="mianze-head">免责声明</div>
          <div class="mianze-content">
            企鹅乐园科技（香港）有限公司对网站服务不承担任何责任，公司不保证服务一定会满足用户的使用要求，也不保证服务不会被中断，对服务的及时性，安全性准确性也不作任何担保。
          </div>
          <div class="mianze-btn-denglu" @click="toDenglu($event)">确认</div>
        </div>
      </div>
    </div>
    <tip-modal></tip-modal>
    <!-- <a class="downloadUrl" href="https://fir.im/jc5f" target="_blank">Android、IOS下载</a> -->
    <!-- <a class="recordNumber" href="http://www.miitbeian.gov.cn/" target="_blank">沪ICP备17043533号</a> -->
  </div>
</template>
<script>
import TipModal from "@/components/modal/tip-modal";
import {
  getToken,
  login,
  getIs_JiHuoMa,
  registerSms,
  register,
  forgetYanzhengma,
  forgetPost
} from "@/js/allAxiosRequire";
import util from "@/js/util";
import Vue from "vue";
import { Checkbox } from "vue-checkbox-radio";
Vue.component("checkbox", Checkbox);
export default {
  name: "login",
  data() {
    return {
      percent: -100,
      loginType: "loading",
      rememberPsw: true,
      rememberMZSM: true,
      // 注册的数据
      DLPhone: "",
      DLName: "",
      DLJihuoma: "",
      is_DLJihuoma: false,
      jihuo_code: "",
      DLFirstPassword: "",
      DLSencondPassword: "",
      DLWeixin: "",
      DLYanzheng: "",
      // 登录的数据
      dengluAccount: localStorage.userName ? localStorage.userName : "",
      dengluPassword: localStorage.password ? localStorage.password : "",
      // 忘记密码的数据
      forgetPnone: "",
      forgetYanzhengma: "",
      forgetPassword1: "",
      forgetPassword2: "",
      // 倒计时
      ZCdaojishi: 0,
      WJdaojishi: 0
    };
  },
  computed: {
    ZCdaojishimiao() {
      return this.ZCdaojishi + "s";
    },
    WJdaojishimiao() {
      return this.WJdaojishi + "s";
    }
  },
  created() {
    // this.getAndSetToken()
  },
  mounted() {
    sessionStorage.clear();
    this.moveDot();

    sessionStorage.reload = "false";
  },
  components: {
    TipModal
  },
  methods: {
    // 加载动画
    moveDot() {
      var timer = setInterval(
        function() {
          if (this.percent < 1) {
            this.percent++;
            this.$refs.dot.style.left = this.percent + "%";
          } else {
            clearInterval(timer);
            this.loginType = "denglu";
          }
        }.bind(this),
        30
      );
      // var timer = setInterval(
      //   function() {
      //     if (this.percent < 100) {
      //       this.percent++;
      //       this.$refs.dot.style.left = 1 / 100 * this.percent + "%";
      //     } else {
      //       clearInterval(timer);
      //       this.loginType = "denglu";
      //     }
      //   }.bind(this),30);
    },
    // token
    // getAndSetToken () {
    //   getToken()
    //   .then(function (response) {
    //     util.setSession('Token', response.data.token)
    //   })
    // },
    // 登录操作请求
    // dengluOperation(e) {
    //   this.$router.push({ path: "/" });
    // },
    dengluOperation(e) {
      // console.log(this.rememberPsw);
      if (!this.rememberMZSM) {
        Bus.$emit("openTipModal", "请阅读并且同意免责声明");
      } else {
        if (this.dengluAccount === "") {
          Bus.$emit("openTipModal", "登录账号不能为空");
          return;
        }
        if (this.dengluPassword === "") {
          Bus.$emit("openTipModal", "登录密码不能为空");
          return;
        }
        login(this.dengluAccount, this.dengluPassword)
          .then(
            function(response) {
              // debugger
              let data = response.data;
              if (data.error === 0) {
                // 登录成功
                if (this.rememberPsw) {
                  localStorage.userName = this.dengluAccount;
                  localStorage.password = this.dengluPassword;
                } else {
                  localStorage.removeItem("userName");
                  localStorage.removeItem("password");
                }
                this.$router.push({ path: "/" });
              }
            }.bind(this)
          )
          .catch(
            function(err) {
              // debugger;
              console.log("err:" + err);
              // console.log('err:' + err.response);
              // console.log('err:' + err.response.status);
              // console.log('err:' + err.response.data.phone);
              if (err && err.response) {
                if (err.response.status === 422) {
                  this.dengluPassword = "";
                  Bus.$emit("openTipModal", err.response.data.phone);
                }
              }
            }.bind(this)
          );
      }
    },
    // modal状态跳转
    toZhuce($event) {
      this.loginType = "zhuce";
    },
    toDenglu($event) {
      this.loginType = "denglu";
    },
    toForget($event) {
      this.loginType = "forget";
    },
    toMianzeshengming() {
      this.loginType = "mianzeshengming";
    },
    // 验证激活码
    yanzhengJiHuoMa() {
      if (this.DLJihuoma === "" || this.DLJihuoma === null) {
        Bus.$emit("openTipModal", "请先填写激活码");
      } else {
        getIs_JiHuoMa(this.DLJihuoma)
          .then(
            function(respones) {
              this.is_DLJihuoma = true;
              this.jihuo_code = respones.data.data.code;
            }.bind(this)
          )
          .catch(
            function(err) {
              if (err && err.response) {
                if (err.response.status === 422) {
                  Bus.$emit("openTipModal", err.response.data.msg);
                  this.DLJihuoma = "";
                }
              }
            }.bind(this)
          );
      }
    },
    // 获取验证码
    getYanzheng($event) {
      registerSms(this.DLPhone, this.jihuo_code)
        .then(
          function(respones) {
            Bus.$emit("openTipModal", respones.data.msg);
            var vthis = this;
            vthis.ZCdaojishi = 60;
            var timer = setInterval(function() {
              vthis.ZCdaojishi--;
              if (vthis.ZCdaojishi === 0) {
                clearInterval(timer);
              }
            }, 1000);
          }.bind(this)
          // function(respones) {
          //   Bus.$emit("openTipModal", respones.data.msg);
          //   this.ZCdaojishi = 60;
          //   window.ZCyanzheng = setInterval(
          //     function() {
          //       this.ZCdaojishi--;
          //       if (this.ZCdaojishi === 0) {
          //         clearInterval(window.ZCdaojishi);
          //       }
          //     }.bind(this),
          //     1000
          //   );
          // }.bind(this)
        )
        .catch(
          function(err) {
            if (err && err.response) {
              if (err.response.status === 422) {
                Bus.$emit("openTipModal", err.response.data.msg);
              }
            }
          }.bind(this)
        );
    },
    // 注册请求
    postChuze() {
      let full =
        this.DLPhone != "" &&
        this.DLName != "" &&
        this.DLJihuoma != "" &&
        this.DLFirstPassword != "" &&
        this.DLSencondPassword != "" &&
        this.DLWeixin != "" &&
        this.DLYanzheng != "";
      if (!full) {
        Bus.$emit("openTipModal", "请填写完整注册信息");
        return;
      }
      register(
        this.DLPhone,
        this.DLYanzheng,
        this.DLJihuoma,
        this.DLFirstPassword,
        this.DLSencondPassword,
        this.DLName,
        this.DLWeixin
      )
        .then(
          function(response) {
            this.DLPhone = "";
            this.DLName = "";
            this.DLJihuoma = "";
            this.DLFirstPassword = "";
            this.DLSencondPassword = "";
            this.DLWeixin = "";
            this.DLYanzheng = "";
            Bus.$emit("openTipModal", response.data.msg);
            if (!response.err) {
              this.loginType = "denglu";
            }
          }.bind(this)
        )
        .catch(
          function(err) {
            if (err && err.response) {
              if (err.response.status === 422) {
                Bus.$emit("openTipModal", err.response.data.msg);
              }
            }
          }.bind(this)
        );
    },
    // 获取忘记密码验证码
    getForgetYanzhengma(e) {
      forgetYanzhengma(this.forgetPnone)
        .then(
          function(respones) {
            this.WJdaojishi = 60;
            window.WJyanzheng = setInterval(
              function() {
                this.WJdaojishi--;
                if (this.WJdaojishi === 0) {
                  clearInterval(window.WJyanzheng);
                }
              }.bind(this),
              1000
            );
            Bus.$emit("openTipModal", respones.data.msg);
          }.bind(this)
        )
        .catch(
          function(err) {
            if (err && err.response) {
              if (err.response.status === 422) {
                Bus.$emit("openTipModal", err.response.data.msg);
              }
            }
          }.bind(this)
        );
    },
    // 忘记密码请求
    forgetOperation($event) {
      if (this.forgetPassword1 !== this.forgetPassword2) {
        Bus.$emit("openTipModal", "两次输入新密码不一致");
        return;
      }
      let params = {
        phone: this.forgetPnone,
        code: this.forgetYanzhengma,
        password: this.forgetPassword1
      };
      forgetPost(params)
        .then(
          function(respones) {
            Bus.$emit("openTipModal", respones.data.msg);
            this.loginType = "denglu";
            this.forgetPnone = "";
            this.forgetYanzhengma = "";
            this.forgetPassword1 = "";
            this.forgetPassword2 = "";
          }.bind(this)
        )
        .catch(
          function(err) {
            if (err && err.response) {
              if (err.response.status === 422) {
                Bus.$emit("openTipModal", err.response.data.msg);
              }
            }
          }.bind(this)
        );
    }
  }
};
</script>
<style scoped lang="less" type="text/less">
.recordNumber {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  z-index: 100;
  font-size: 0.6rem;
  color: #fff;
  text-decoration: none;
}
.flex-both-center () {
  display: flex;
  justify-content: center;
  align-items: center;
}
.hide {
  display: none !important;
}
.modal-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background: none;
}
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("~@/assets/login-body-bg.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  color: #fff;
  .denglu {
    .flex-both-center();
    background-image: url("~@/assets/box-bg.png");
    background-repeat: no-repeat;
    background-position: 48% 76%;
    background-size: 45% 16rem;
    .login-denglu {
      position: relative;
      // overflow: hidden;
      width: 40%;
      height: 100%;
      .denglu-logo {
        position: absolute;
        height: 50%;
        width: 118%;
        top: 30%;
        left: -6%;
        background-image: url("~@/assets/logo_bg.png");
        background-size: 100% auto;
        background-position: center center;
        background-repeat: no-repeat;
        transform: translateY(-8rem);
        z-index: 1;
      }
      .denglu-content {
        box-sizing: border-box;
        padding: 1.5rem 10%;
        position: absolute;
        width: 100%;
        height: 17.5rem;
        top: 62%;
        left:3%;
        transform: translateY(-8rem);
        z-index: 2;
        .denglu-main {
          width: 100%;
          height: 95%;
          display: flex;
          flex-direction: column;
          .main-input-wrap {
            .input-cell {
              display: flex;
              height: 3rem;
              .input-label {
                flex: 1;
                font-size: 0.88rem;
                display: flex;
                align-items: center;
                justify-content: flex-start;
              }
              .input {
                flex: 2;
                .flex-both-center();
                input {
                  padding: 0;
                  padding: 0 1rem;
                  width: 100%;
                  box-sizing: border-box;
                  height: 1.6rem;
                  line-height: 1.6rem;
                  border-radius: 1.6rem;
                }
                .rememberPsw {
                  position: relative;
                  left: -4rem;
                  top: 0.1rem;
                }
              }
            }
          }
          .main-btn-wrap {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 0.5rem;
            .main-btn-denglu {
              height: 2rem;
              border-radius: 2rem;
              width: 100%;
              background-color: #3db3e0;
              .flex-both-center();
            }
            .main-btn-other-wrap {
              flex: 1;
              display: flex;
              width: 100%;
              justify-content: space-between;
              align-items: center;
              * {
                font-size: 0.75rem;
                height: 1rem;
                .flex-both-center();
              }
            }
          }
        }
        .denglu-mianze {
          height: 2rem;
          line-height: 2rem;
          font-size: 0.75rem;
          color: #1d5a74;
          .input-label {
            float: left;
          }
          .input {
            float: left;
            width: 1rem;
            height: 1rem;
            line-height: 1rem;
            margin: 0.5rem 0 0 0.5rem;
          }
          .mianze-content-cli {
            float: right;
          }
        }
      }
    }
  }
  .loading {
    .login-loading {
      position: absolute;
      z-index: 1;
      left: 50%;
      width: 57%;
      height: 100%;
      transform: translateX(-50%);
      background-image: url("~@/assets/logo.png");
      background-size: 100% auto;
      background-position: center 13%;
      background-repeat: no-repeat;
      .login-loading-bar {
        position: absolute;
        top: 63%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 40%;
        width: 80%;
        background-image: url("~@/assets/load-bg01.png");
        background-size: 80% auto;
        background-position: center 60%;
        background-repeat: no-repeat;
        overflow: hidden;
        .login-loading-wrap {
          position: absolute;
          width: 80%;
          height: 100%;
          left: 10%;
          overflow: hidden;
          .login-loading-dot {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 100%;
            height: 20%;
            background-image: url("~@/assets/load-dian.png");
            background-size: 100% auto;
            background-position: center center;
            background-repeat: no-repeat;
            left: -100%;
          }
          .login-loading-percent {
            position: absolute;
            top: 60%;
            width: 100%;
            text-align: center;
            color: red;
            font-size: 0.9rem;
          }
        }
        .login-loading-left {
          position: absolute;
          width: 20%;
          height: 20%;
          background-image: url("~@/assets/load-dian-left.png");
          background-size: 100% auto;
          background-position: center center;
          background-repeat: no-repeat;
          top: 40%;
        }
        .login-loading-right {
          position: absolute;
          width: 20%;
          height: 20%;
          background-image: url("~@/assets/load-dian-right.png");
          background-size: 100% auto;
          background-position: center center;
          background-repeat: no-repeat;
          top: 40%;
          right: 0;
        }
      }
    }
  }
  .zhuce {
    .flex-both-center();
    .zhuce-modal {
      width: 45%;
      border-radius: 0.5rem;
      background-color: rgba(19, 61, 100, 0.4);
      border: 1px solid rgba(5, 186, 231, 0.4);
      .modal-head {
        .flex-both-center();
        font-size: 1.1rem;
        height: 3rem;
      }
      .modal-content {
        padding: 0 1rem;
        .content-item {
          display: flex;
          height: 2.4rem;
          .item-label {
            flex: 3;
            .flex-both-center();
            font-size: 0.85rem;
          }
          .item-input {
            flex: 6;
            .flex-both-center();
            > input {
              padding: 0 1em;
              box-sizing: border-box;
              width: 100%;
              height: 1.5rem;
              line-height: 1.5rem;
              border-radius: 1.5rem;
            }
            .input-yanzheng {
              flex: 1;
              .flex-both-center();
              input {
                box-sizing: border-box;
                padding: 0 1rem;
                width: 100%;
                height: 1.5rem;
                border-radius: 1.5rem;
                line-height: 1.5rem;
              }
            }
            .btn-yanzheng {
              flex: 1;
              margin-left: 0.5rem;
              height: 1.5rem;
              .flex-both-center();
              .yanzheng {
                width: 100%;
                height: 1.5rem;
                .flex-both-center();
                color: #fff;
                font-size: 0.65rem;
                background-color: #00b8ff;
                border-radius: 1.5rem;
                line-height: 1.5rem;
              }
            }
          }
          .item-star {
            flex: 1;
            .flex-both-center();
            &:after {
              content: "*";
              font-size: 0.8rem;
              color: red;
            }
          }
        }
      }
      .modal-foot {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 3.5rem;
        padding: 0 1rem;
        .btn-zhuce {
          .flex-both-center();
          width: 5rem;
          height: 1.8rem;
          font-size: 1rem;
          border-radius: 1.8rem;
          background-color: #00b8ff;
        }
        .btn-to-denglu {
          a {
            font-size: 0.75rem;
            color: #fff;
          }
        }
        .btn-to-forget {
          a {
            font-size: 0.75rem;
            color: #fff;
          }
        }
      }
    }
  }
  .forget {
    .login-forget{
    position: relative;
    width: 40%;
    height: 100%;
    }
    .flex-both-center();
    background-image: url("~@/assets/box-bg02.png");
    background-repeat: no-repeat;
    background-position: 45% 90%;
    background-size: 45% 18rem;
    .forget-logo {
      position: absolute;
      height: 40%;
      width: 100%;
      top: 30%;
      background-image: url("~@/assets/logo_bg.png");
      background-size: 100% auto;
      background-position: center center;
      background-repeat: no-repeat;
      -webkit-transform: translateY(-8rem);
      transform: translateY(-8rem);
      z-index: 1;
    }
    .forget-modal {
      padding-top: 10%;
      position: absolute;
      width: 100%;
      top: 25%;
      // background-image: url("~@/assets/box-bg.png");
      // background-repeat: no-repeat;
      // background-position: center center;
      // background-size: 100% 100%;
      // border-radius: 0.5rem;
      // background-color: rgba(19, 61, 100, 0.4);
      // border: 1px solid rgba(5, 186, 231, 0.4);
      .modal-head {
        .flex-both-center();
        font-size: 1.1rem;
      }
      .modal-content {
        padding: 0 1rem;
        .content-item {
          display: flex;
          height: 2.3rem;
          .item-label {
            flex: 3;
            .flex-both-center();
            font-size: 0.85rem;
          }
          .item-input {
            flex: 6;
            .flex-both-center();
            > input {
              padding: 0 1em;
              box-sizing: border-box;
              width: 100%;
              height: 1.5rem;
              line-height: 1.5rem;
              border-radius: 1.5rem;
            }
            .input-yanzheng {
              flex: 1;
              .flex-both-center();
              input {
                box-sizing: border-box;
                padding: 0 1rem;
                width: 100%;
                height: 1.5rem;
                border-radius: 1.5rem;
                line-height: 1.5rem;
              }
            }
            .btn-yanzheng {
              flex: 1;
              margin-left: 0.5rem;
              height: 1.5rem;
              .flex-both-center();
              .yanzheng {
                width: 100%;
                height: 1.5rem;
                .flex-both-center();
                color: #fff;
                font-size: 0.65rem;
                // background-color: #00b8ff;
                background: rgba(6, 39, 42, 0.5);
                border: 1px solid #513c51;
                border-radius: 1.5rem;
                line-height: 1.5rem;
              }
            }
          }
        }
        .main-btn-wrap {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 1rem;
          .main-btn-forget {
            height: 2rem;
            border-radius: 2rem;
            width: 100%;
            background-color: #3db3e0;
            .flex-both-center();
          }
          .main-btn-other-wrap {
            flex: 1;
            display: flex;
            width: 100%;
            height: 2.5rem;
            justify-content: space-between;
            align-items: center;
            * {
              font-size: 0.75rem;
              height: 1rem;
              .flex-both-center();
            }
          }
        }
      }
    }
  }
  .mianzeshengming {
    .login-mianze{
    position: relative;
    width: 40%;
    height: 100%;
    }
    .flex-both-center();
    background-image: url("~@/assets/box-bg02.png");
    background-repeat: no-repeat;
    background-position: 45% 76%;
    background-size: 45% 17rem;
    .mianze-logo {
      position: absolute;
      height: 40%;
      width: 100%;
      top: 30%;
      background-image: url("~@/assets/logo_bg.png");
      background-size: 100% auto;
      background-position: center center;
      background-repeat: no-repeat;
      -webkit-transform: translateY(-8rem);
      transform: translateY(-8rem);
      z-index: 1;
    }
    .mianze-modal {
      padding-top: 10%;
      position: absolute;
      width: 100%;
      top: 25%;
      font-size: 0.88rem;
      .mianze-head {
        .flex-both-center();
        font-size: 1rem;
      }
      .mianze-content {
        padding: 1rem 2rem 0;
      }
      .mianze-btn-denglu {
        height: 2rem;
        border-radius: 2rem;
        width: 80%;
        margin: 1rem auto 0;
        background-color: #3db3e0;
        .flex-both-center();
      }
    }
  }
}
</style>

