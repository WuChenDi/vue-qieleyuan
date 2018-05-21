<template>
  <!-- 背景层 -->
  <div class="home-bg">
    <!-- 精灵层 -->
    <spirit :smallSpirit="small_spirit" :mediumSpirit="medium_spirit" :maxSpirit="max_spirit"></spirit>
    <!-- 麦田层 -->
    <farm :lands="landsData" :fertilizer="fertilizer"></farm>
    <!-- 用户农场信息层 -->
    <user-farm-message :seed="seed" :fertilizer="fertilizer" :landCount="landCount" :depot="depot" :earnings="earnings" :directPush="directPush" :wanshua="wanshua" :userId="userId" :userName="userName" :userImage="userImage"></user-farm-message>
    <!-- 左侧系统操作 -->
    <left-setting></left-setting>
    <!-- 右侧系统操作 -->
    <right-setting></right-setting>
    <!-- 下方农场操作层 -->
    <farm-operation></farm-operation>
    <!-- 土地信息模态窗 -->
    <!-- <cell-message-modal
    :cell.sync="currentCell"
    :fertilizer="fertilizer"></cell-message-modal> -->
    <!-- 开地模态窗 -->
    <kaidi-modal :cell.sync="currentCell"></kaidi-modal>
    <!-- 增重模态窗 -->
    <zengzhong-modal :cell.sync="currentCell" :depot="depot"></zengzhong-modal>
    <!-- 收获模态窗 -->
    <shouhuo-modal :cell.sync="currentCell"></shouhuo-modal>
    <!-- 消息模态窗 -->
    <xiaoxi-modal></xiaoxi-modal>
    <!-- 游戏大厅模态窗 -->
    <youxidating-modal></youxidating-modal>
    <!-- 商城模态窗 -->
    <!-- <shangcheng-modal></shangcheng-modal> -->
    <shopping-modal></shopping-modal>
    <!-- 操作提示模态窗 -->
    <tip-modal></tip-modal>
    <!-- 账户信息模态窗 -->
    <account-modal :phone="phone" :userId="userId" :userName="userName" :userImage="userImage" :weixin="weixin" :parentId="parentId"></account-modal>
    <!-- 选择头像模态窗 -->
    <choose-image-modal></choose-image-modal>
    <!-- 修改密码模态窗 -->
    <password-modal></password-modal>
    <!-- 激活中心模态窗 -->
    <jihuo-modal :userType="userType" :giveAct="give_act"></jihuo-modal>
    <jihuoTips-modal></jihuoTips-modal>
    <!-- 设置模态窗 -->
    <shezhi-modal></shezhi-modal>
    <!-- 好友列表模态窗 -->
    <friends-modal :is-one-gather="userData.is_one_gather"></friends-modal>
    <!-- 交易所模态窗 -->
    <jiaoyi-modal :userPhone="phone"></jiaoyi-modal>
    <!-- 吐司信息显示框 -->
    <!-- <toast-modal :toast="toast"></toast-modal> -->
    <!-- 拆分图模态框 -->
    <caifentu-modal></caifentu-modal>
  </div>
</template>
<script>
import Farm from "@/components/farm/farm";
import UserFarmMessage from "@/components/user-farm-message/user-farm-message";
import FarmOperation from "@/components/farm-operation/farm-operation";
import LeftSetting from "@/components/setting/left-setting";
import RightSetting from "@/components/setting/right-setting";
import Spirit from "@/components/spirit/spirit";
import KaidiModal from "@/components/modal/kaidi-modal";
import ZengzhongModal from "@/components/modal/zengzhong-modal";
// import CellMessageModal from '@/components/modal/cell-message-modal'
import TipModal from "@/components/modal/tip-modal";
import ShouhuoModal from "@/components/modal/shouhuo-modal";
import XiaoxiModal from "@/components/modal/xiaoxi-modal";
import YouxidatingModal from "@/components/modal/youxidating-modal";
// import ShangchengModal from '@/components/modal/shangcheng-modal'
import ShoppingModal from "@/components/modal/shopping-modal";
import AccountModal from "@/components/modal/account-modal";
import ChooseImageModal from "@/components/modal/choose-image-modal";
import PasswordModal from "@/components/modal/password-modal";
import JihuoModal from "@/components/modal/jihuo-modal";
import jihuoTipsModal from "@/components/modal/jihuoTips-modal";
import ShezhiModal from "@/components/modal/shezhi-modal";
import FriendsModal from "@/components/modal/friends-modal";
import JiaoyiModal from "@/components/modal/jiaoyi-modal";
import CaifentuModal from "@/components/modal/caifentu-modal";
import {
  getToken,
  getUserDate,
  getLandsData,
  fertilizer,
  irrigation,
  getGlobalMessage,
  getToast
} from "@/js/allAxiosRequire";
import util from "@/js/util";
export default {
  name: "home",
  data() {
    return {
      // 用户信息
      userData: {},
      // 土地信息
      landsData: [],
      // 当前点击的土地
      currentCell: {},
      // 全局配置信息
      globalMessage: {},
      // 吐司数据
      toast: []
    };
  },
  created() {
    // 刚刚登录进来时根据token的有无判断是否首次登录
    if (!sessionStorage._token) {
      // 路由跳转都登录页
      this.$router.push("login");
    } else {
      // 移除所有事件
      Bus.$off();

      this.requireUserData();
      this.requireLandsData();
      this.requireGlobalMessage();
    }
  },
  mounted() {
    // 刷新移除所有事件
    // if(sessionStorage.reload === 'false') {
    //   sessionStorage.reload = 'true';
    //   setTimeout(() => {
    //     location.reload();
    //   }, 500);
    // }

    this.shifeiEvent();
    this.jiaoshuiEvent();
    this.refreshDataEvent();
    this.setCurrentCellEvent();
    // 隐藏备案号
    $(".recordNumber").css("display", "none");
  },
  components: {
    Farm,
    UserFarmMessage,
    FarmOperation,
    LeftSetting,
    RightSetting,
    Spirit,
    KaidiModal,
    ZengzhongModal,
    // CellMessageModal,
    TipModal,
    ShouhuoModal,
    XiaoxiModal,
    YouxidatingModal,
    // ShangchengModal,
    ShoppingModal,
    AccountModal,
    ChooseImageModal,
    PasswordModal,
    JihuoModal,
    jihuoTipsModal,
    ShezhiModal,
    FriendsModal,
    JiaoyiModal,
    CaifentuModal
  },
  methods: {
    // 请求用户信息
    requireUserData() {
      getUserDate()
        .then(
          function(response) {
            let data = response.data;
            // console.log
            console.log(data.user);
            this.userData = data.user;
            window.userData = this.userData;
          }.bind(this)
        )
        .catch(
          function(error) {
            // let data = arguments[0].response.data
            // if(data.error === 11) {
            this.$router.push("login");
            // }
          }.bind(this)
        );
    },
    // 请求土地信息
    requireLandsData() {
      getLandsData().then(
        function(response) {
          let data = response.data;
          // console.log
          console.log(data.lands);
          this.landsData = data.lands;
        }.bind(this)
      );
    },
    // 请求全局配置信息
    requireGlobalMessage() {
      getGlobalMessage().then(
        function(response) {
          let data = response.data;
          console.log(data);
          this.globalMessage = data.config;
          window.globalMessage = this.globalMessage;
        }.bind(this)
      );
    },
    // 请求吐司信息
    requireToast() {
      getToast().then(
        function(response) {
          let data = response.data;
          console.log(data);
          this.toast = data.toast;
        }.bind(this)
      );
    },
    // 施肥操作事件绑定
    shifeiEvent() {
      Bus.$on(
        "shifei",
        function() {
          fertilizer()
            .then(function(respones) {
              Bus.$emit("refreshData");
              Bus.$emit("openTipModal", respones.data.msg);
            })
            .catch(function(err) {
              if (err && err.response) {
                if (err.response.status === 422) {
                  Bus.$emit("openTipModal", err.response.data.msg);
                }
              }
            });
        }.bind(this)
      );
    },
    // 浇水操作事件绑定
    jiaoshuiEvent() {
      Bus.$on(
        "jiaoshui",
        function() {
          irrigation()
            .then(function(respones) {
              Bus.$emit("refreshData");
              Bus.$emit("openTipModal", respones.data.msg);
            })
            .catch(function(err) {
              if (err && err.response) {
                if (err.response.status === 422) {
                  Bus.$emit("openTipModal", err.response.data.msg);
                }
              }
            });
        }.bind(this)
      );
    },
    // 绑定事件用于设置当前点击的土地对象
    setCurrentCellEvent() {
      Bus.$on(
        "setCurrentCell",
        function(currentCell) {
          this.currentCell = currentCell;
        }.bind(this)
      );
    },
    // 更新用户，土地数据事件绑定
    refreshDataEvent() {
      Bus.$on(
        "refreshData",
        function() {
          this.requireUserData();
          this.requireLandsData();
          this.requireGlobalMessage();
        }.bind(this)
      );
    }
  },
  computed: {
    // 小精灵数量
    small_spirit() {
      return this.userData.small_spirit || 0;
    },
    // 中精灵数量
    medium_spirit() {
      return this.userData.medium_spirit || 0;
    },
    // 大精灵数量
    max_spirit() {
      return this.userData.max_spirit || 0;
    },
    // 播种总数
    seed() {
      return this.userData.fruit_land || 0;
    },
    // 已开地
    landCount(){
      return this.userData.fruit_prod || 0;
    },
    // 肥料
    fertilizer() {
      if (this.userData.is_irrigation) {
        if (this.userData.is_fertilizer) {
          return 0;
        } else {
          return this.userData.day_fruit;
        }
      } else {
        return 0;
      }
    },
    // 仓库
    depot() {
      return this.userData.fruit || 0;
    },
    // 总收益
    earnings() {
      return parseFloat(parseFloat(this.userData.fruit_prod || 0) + parseFloat(this.userData.sum_gather || 0)).toFixed(2) ;
    },
    // 领导奖
    directPush() {
      return this.userData.recommend_bouns || 0;
    },
    // 玩耍
    wanshua(){
      return this.userData.sum_gather || 0;
    },
    // 玩家ID
    userId() {
      return this.userData.id || 0;
    },
    // 玩家昵称
    userName() {
      return this.userData.nick || "";
    },
    // 玩家头像图片
    userImage() {
      return this.userData.head || "";
    },
    // 没有微信号只有微信名称
    // 玩家微信号
    weixin() {
      return this.userData.wx_name || "";
    },
    // 玩家的推荐人id
    parentId() {
      return this.userData.parent_id || "";
    },
    //玩家的手机号
    phone() {
      return this.userData.phone || "";
    },
    // 玩家账号类型
    userType() {
      return this.userData.type_id || "";
    },
    // 赠送激活码权限
    give_act() {
      return this.userData.give_act || false;
    }
  }
};
</script>
<style lang="less" type="text/less">
// 模态框mask样式
.modal-mask {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: rgba(12, 40, 65, 0.3);
  .modal {
    background-color: rgba(12, 40, 65, 0.4);
    border-radius: 1rem;
    color: #fff;
  }
}
.home-bg {
  width: 100%;
  height: 100%;
  background: url("~@/assets/body-bg.jpg");
  background-size: 100% 100%;
  .modal {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .modal-close {
      position: absolute;
      right: -0.5rem;
      top: -0.5rem;
      width: 2.1rem;
      height: 2.1rem;
      border-radius: 50%;
      background-image: url("~@/assets/close.png");
      background-size: 100% auto;
      background-repeat: no-repeat;
    }
  }
}
</style>
