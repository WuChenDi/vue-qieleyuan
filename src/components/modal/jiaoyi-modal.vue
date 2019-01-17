<template>
  <div class="modal-mask" v-if="showModal">
    <div class="modal jiaoyi-modal">
      <div class="modal-close" @click="close($event)"></div>
      <div class="modal-content">
        <div class="tabs-head">
          <div class="tabs-head-item" :class="{'head-select': outerTabSelect == 1}" @click="clickOuerTab(1)">定向交易</div>
          <div class="tabs-head-item" :class="{'head-select': outerTabSelect == 2}" @click="clickOuerTab(2)">自由交易</div>
          <div class="tabs-head-item" :class="{'head-select': outerTabSelect == 3}" @click="clickOuerTab(3)">交易记录</div>
        </div>
        <div class="tabs-content">
          <!-- 定向交易 -->
          <div class="tabs-content-item dx" v-show="outerTabSelect == 1">
            <div class="content-head">
              <div class="content-head-item" :class="{'head-select': dxTabSelect == 1}" @click="clickDxTab(1)">我要买</div>
              <div class="content-head-item" :class="{'head-select': dxTabSelect == 2}" @click="clickDxTab(2)">我要卖</div>
              <div class="content-head-item" :class="{'head-select': dxTabSelect == 3}" @click="clickDxTab(3)">待收米</div>
            </div>
            <div class="content-content">
              <!-- 我要买 -->
              <div class="content-content-item" v-show="dxTabSelect == 1">
                <div class="content-yaoBuy-list" v-for="item in yaobuy">
                  <div class="content-yaoBuy-list-content">
                    <div class="yaoBuy-list-content-row-1">
                      <div class="yaoBuy-name-title">{{ item.sell_user.nick }}</div>
                      <div class="yaoBuy-num">{{ item.fruit }}个</div>
                    </div>
                    <div class="yaoBuy-list-content-row-2">
                      <div class="yaoBuy-name">{{ item.sell_user.phone }}</div>
                    </div>
                    <div class="yaoBuy-list-content-row-3">
                      <div class="yaoBuy-time">{{ item.updated_at }}</div>
                      <div class="yaoBuy-state-opera">
                        <div class="yaoBuy-state" v-show="item.status == 1">等待卖家确认收米</div>
                        <div class="yaoBuy-opera" v-show="item.status == 0">
                          <div class="yaoBuy-sure" :data-id="item.id" @click="makesureBuyfang($event)">确认打米</div>
                          <div class="yaoBuy-cancel" :data-id="item.id" @click="rejectBuyfang($event)">取消交易</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 我要卖 -->
              <div class="content-content-item yaoSell-content" v-show="dxTabSelect == 2">
                <div class="content-yaoSell-title">
                  最小10企鹅起售，且是10的倍数
                </div>
                <div class="content-yaoSell-content">
                  <div class="content-middle">
                    <div class="yaoSell-item">
                      <div class="item-label">卖家账号</div>
                      <div class="item-input">
                        <input type="text" v-model="userPhone" readonly="true">
                      </div>
                    </div>
                    <div class="yaoSell-item">
                      <div class="item-label">买家账号</div>
                      <div class="item-input">
                        <input type="text" v-model="yaoAccount">
                      </div>
                    </div>
                    <div class="yaoSell-item">
                      <div class="item-label">出售数量</div>
                      <div class="item-input">
                        <input type="text" v-model="yaoNum">
                      </div>
                    </div>
                    <div class="yaoSell-item">
                      <div class="item-label">交易密码</div>
                      <div class="item-input">
                        <input type="password" v-model="yaoPas">
                      </div>
                    </div>
                    <div class="yaoSell-item">
                      <div class="item-label">预留手机号</div>
                      <div class="item-input">
                        <input type="text" v-model="yaoPhone">
                      </div>
                    </div>
                    <!-- <div class="yaoSell-item">
                      <div class="item-label">验证码</div>
                      <div class="item-yanzheng">
                        <input type="text" v-model="yaoYanzheng">
                      </div>
                      <div class="item-yanzheng-btn">
                        <div class="button"  @click="getYaoYanzheng()">发送验证码</div class="button">
                      </div>
                    </div> -->
                    <div class="yaoSell-item">
                      <div class="item-sure">
                        <div class="sure" @click="yaoSellPost">确认</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 待收米 -->
              <div class="content-content-item" v-show="dxTabSelect == 3">
                <div class="content-wait-list" v-for="item in wait">
                  <div class="content-wait-list-content">
                    <div class="wait-list-content-row-1">
                      <div class="wait-name">{{ item.buy_user.nick }}</div>
                      <div class="wait-num">{{ item.fruit }}个</div>
                    </div>
                    <div class="wait-list-content-row-2">
                      <div class="wait-phone">{{ item.buy_user.phone }}</div>
                      <div class="wait-statue">
                        <span v-show="item.status == 0">等待买方确认打米</span>
                        <span v-show="item.status == 1">合计米</span>
                      </div>
                    </div>
                    <div class="wait-list-content-row-3">
                      <div class="wait-weixin">{{ item.buy_user.wx_name }}</div>
                    </div>
                    <div class="wait-list-content-row-4">
                      <div class="wait-time">{{ item.updated_at }}</div>
                      <div class="wait-opera">
                        <div class="wait-cancel" :data-id="item.id" v-show="item.status == 0" @click="rejectSellfang($event)">取消交易</div>
                        <div class="wait-cancel" :data-id="item.id" v-show="item.status == 1" @click="makesureSellfang($event)">确认收米</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 自由交易 -->
          <div class="tabs-content-item zy" v-show="outerTabSelect == 2">
            <div class="content-head">
              <div class="content-head-item" :class="{'head-select': zyTabSelect == 1}" @click="clickZyTab(1)">抢购</div>
              <div class="content-head-item" :class="{'head-select': zyTabSelect == 2}" @click="clickZyTab(2)">挂卖</div>
              <div class="content-head-item" :class="{'head-select': zyTabSelect == 3}" @click="clickZyTab(3)">抢购单</div>
            </div>
            <div class="content-content">
              <!-- 抢购 -->
              <div class="content-content-item" v-show="zyTabSelect == 1">
                <div class="content-qianggou-list" v-for="item in qianggou">
                  <div class="content-qianggou-list-content">
                    <div class="qianggou-list-content-row-1">
                      <div class="qianggou-name-title">{{ item.sell_user.nick }}</div>
                      <div class="qianggou-num">{{ item.fruit }}</div>
                    </div>
                    <div class="qianggou-list-content-row-2">
                      <div class="qianggou-name">{{ item.sell_user.phone }}</div>
                    </div>
                    <div class="qianggou-list-content-row-3">
                      <div class="qianggou-time">{{ item.updated_at }}</div>
                      <div class="qianggou-state-opera">
                        <div class="qianggou-opera">
                          <div class="qianggou-sure" :data-id="item.id" @click="makesureBuyfang($event)">确认抢购</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 挂卖 -->
              <div class="content-content-item guamai-content" v-show="zyTabSelect == 2">
                <div class="content-guamai-title">
                  最小10个企鹅起售，且是10的倍数
                </div>
                <div class="content-guamai-content">
                  <div class="content-middle">
                    <div class="guamai-item">
                      <div class="item-label">出售数量</div>
                      <div class="item-input">
                        <input type="text" v-model="guaNum">
                      </div>
                    </div>
                    <div class="guamai-item">
                      <div class="item-label">交易密码</div>
                      <div class="item-input">
                        <input type="password" v-model="guaPas">
                      </div>
                    </div>
                    <div class="guamai-item">
                      <div class="item-label">预留手机</div>
                      <div class="item-input">
                        <input type="text" v-model="guaPhone">
                      </div>
                    </div>
                   <!--  <div class="guamai-item">
                      <div class="item-label">验证码</div>
                      <div class="item-yanzheng">
                        <input type="text" v-model="guaYanzhengma">
                      </div>
                      <div class="item-yanzheng-btn">
                        <div class="button" @click="getGuaYanzheng()">发送验证码</div class="button">
                      </div>
                    </div> -->
                    <div class="guamai-item">
                      <div class="item-sure">
                        <div class="sure" @click="guamaiPost()">确认</div>
                      </div>
                    </div>
                  </div>
                </div>              
              </div>
              <!-- 抢购单 -->
              <div class="content-content-item" v-show="zyTabSelect == 3">
                <div class="content-qianggoulist-list" v-for="item in guamai">
                  <div class="content-qianggoulist-list-content">
                    <div class="qianggoulist-list-content-row-1">
                      <div class="qianggoulist-name-title">{{ item.status == 0 ? '暂无买家信息' : item.buy_user.nick }}</div>
                      <div class="qianggoulist-num">{{ item.fruit }}个</div>
                    </div>
                    <div class="qianggoulist-list-content-row-2">
                      <div class="qianggoulist-name">{{ item.status == 0 ? '' : item.buy_user.phone }}</div>
                      <div class="qianggoulist-statue">
                        <div class="qianggoulist-comment">{{ item.status == 0 ? '等待抢购' : '等待卖家确认收米' }}</div>
                      </div>
                    </div>
                    <div class="qianggoulist-list-content-row-3">
                      <div class="qianggoulist-weixin-title" v-if="item.status === 1">{{ item.buy_user.wx_name }}</div>
                    </div>
                    <div class="qianggoulist-list-content-row-4">
                      <div class="qianggoulist-time">{{ item.updated_at }}</div>
                      <div class="qianggoulist-opera">
                        <div class="qianggoulist-cancel" v-show="item.status == 0" :data-id="item.id" @click="rejectSellfang">取消挂卖</div>
                        <div class="qianggoulist-cancel" v-show="item.status == 1" :data-id="item.id" @click="makesureSellfang">确认收米</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 交易记录 -->
          <div class="tabs-content-item record" v-show="outerTabSelect == 3">
            <div class="content-head">
              <div class="content-head-item" :class="{'head-select': recordTabSelect == 1}" @click="clickRecordTab(1)">购买记录</div>
              <div class="content-head-item" :class="{'head-select': recordTabSelect == 2}" @click="clickRecordTab(2)">出售记录</div>
              <div class="content-head-item" :class="{'head-select': recordTabSelect == 3}" @click="clickRecordTab(3)">委托记录</div>
              <div class="content-head-item" :class="{'head-select': recordTabSelect == 4}" @click="clickRecordTab(4)">取消记录</div>
            </div>
            <!-- 添加滚动条 -->
            <div class="content-content scrollbar" id="recordsWrapper">
              <!-- 购买记录 -->
              <div class="content-content-item" v-if="recordTabSelect == 1">
                <div class="content-record-list" v-for="item in goumaiR">
                  <div class="content-record-list-content">
                    <div class="record-list-content-row-1">
                      <div class="record-name-title">{{ item.sell_user ? '卖家：' + item.sell_user.nick :  '无卖家信息' }}</div>
                      <div class="record-num">{{ item.fruit }}个</div>
                    </div>
                    <div class="record-list-content-row-2">
                      <div class="record-name">{{ item.sell_user ? item.sell_user.phone :  '' }}</div>
                      <div class="record-all">合计米</div>
                    </div>
                    <div class="record-list-content-row-3">
                      <div class="record-time">{{ item.updated_at }}</div>
                      <div class="record-state">交易完成</div>
                    </div>
                  </div>
                </div>
              </div>              
              <!-- 出售记录 -->
              <div class="content-content-item" v-if="recordTabSelect == 2">
                <div class="content-record-list" v-for="item in chushouR">
                  <div class="content-record-list-content">
                    <div class="record-list-content-row-1">
                      <div class="record-name-title">{{ item.buy_user ? '买家：' + item.buy_user.nick :  '无买家信息' }}</div>
                      <div class="record-num">{{ item.fruit }}个</div>
                    </div>
                    <div class="record-list-content-row-2">
                      <div class="record-name">{{ item.buy_user ? item.buy_user.phone :  '' }}</div>
                      <div class="record-all">合计米</div>
                    </div>
                    <div class="record-list-content-row-3">
                      <div class="record-time">{{ item.updated_at }}</div>
                      <div class="record-state">交易完成</div>
                    </div>
                  </div>
                </div>
              </div>              
              <!-- 委托记录 -->
              <div class="content-content-item" v-if="recordTabSelect == 3">
                <div class="content-record-list" v-for="item in weituoR">
                  <div class="content-record-list-content">
                    <div class="record-list-content-row-1">
                      <div class="record-name-title">{{ item.buy_user ? '买家：' + item.buy_user.nick :  '无买家信息' }}</div>
                      <div class="record-num">{{ item.fruit }}个</div>
                    </div>
                    <div class="record-list-content-row-2">
                      <div class="record-name">{{ item.buy_user ? item.buy_user.phone :  '' }}</div>
                      <div class="record-all">合计米</div>
                    </div>
                    <div class="record-list-content-row-3">
                      <div class="record-time">{{ item.updated_at }}</div>
                      <div class="record-state">交易完成</div>
                    </div>
                  </div>
                </div>
              </div>              
              <!-- 取消记录 -->
              <div class="content-content-item" v-if="recordTabSelect == 4">
                <div class="content-record-list" v-for="item in quxiaoR">
                  <div class="content-record-list-content">
                    <div class="record-list-content-row-1">
                      <div class="record-name-title">{{ item.buy_user ? item.buy_user.nick :  '无买家信息' }}</div>
                      <div class="record-num">{{ item.fruit }}个</div>
                    </div>
                    <div class="record-list-content-row-2">
                      <div class="record-name">{{ item.buy_user ? item.buy_user.phone :  '' }}</div>
                      <div class="record-all">合计米</div>
                    </div>
                    <div class="record-list-content-row-3">
                      <div class="record-time">{{ item.updated_at }}</div>
                      <div class="record-state">交易已取消</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {dxSell, dxBuy, zyBuy, zySell, recordBuy, recordSell, recordBy, recordCancel, jiaoyiYanzhengma, woyaomai, sureBuyfang, cancelBuyfang, sureSellfang, cancelSellfang} from '@/js/allAxiosRequire'
  export default {
    name: 'jiaoyi-modal',
    props: ['userPhone'],
    data () {
      return {
        showModal: false,
      // tabIndex
      outerTabSelect: 1,
      dxTabSelect: 1,
      zyTabSelect: 1,
      recordTabSelect: 1,
      // 我要卖
      yaoAccount: '',
      yaoNum: '',
      yaoPas: '',
      yaoPhone: '',
      yaoYanzheng: '',
      // 挂卖
      guaNum: '',
      guaPas: '',
      guaPhone: '',
      guaYanzhengma: '',
      // 大厅信息
      wait: [],
      yaobuy: [],
      qianggou: [],
      guamai: [],
      goumaiR: [],
      chushouR: [],
      weituoR: [],
      quxiaoR: []
    }
  },
  mounted () {
    this.modalEvent();
  },
  components: {
  },
  computed: {
  },
  watch: {
  },
  methods: {
    modalEvent () {
      Bus.$on('openJiaoyiModal', function() {
        this.getJiaoyiMessage();
        this.showModal = true
      }.bind(this))
      Bus.$on('closeJiaoyiModal', function () {
        this.showModal = false
      }.bind(this))
    },
    createScroll() {
      this.$nextTick(() => {
        // 初始化scroll
        // if(!this.scroll) {
        //   this.scroll = new iScroll('recordsWrapper', {
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
    },
    clickOuerTab (tabSelect) {
      this.outerTabSelect = tabSelect

      if(tabSelect === 3) {
        this.createScroll();
      }
    },
    close (e) {
      this.showModal = false
    },
    clickDxTab (dxTabType) {
      this.dxTabSelect = parseInt(dxTabType)
    },
    clickZyTab (zyTabType) {
      this.zyTabSelect = parseInt(zyTabType)
    },
    clickRecordTab (recordTabType) {
      this.recordTabSelect = parseInt(recordTabType)

      this.createScroll();
    },
    // 获取交易所的数据
    getJiaoyiMessage () {
      // 待收米
      dxSell()
      .then(function (response) {
        let trade = response.data.trade
        console.log(response)
        this.wait = trade
      }.bind(this))
      // 我要买
      dxBuy()
      .then(function (response) {
        let trade = response.data.trade
        this.yaobuy = trade
      }.bind(this))
      // 抢购
      zyBuy()
      .then(function (response) {
        let trade = response.data.trade
        this.qianggou = trade
      }.bind(this))
      // 挂卖
      zySell()
      .then(function (response) {
        let trade = response.data.trade
        this.guamai = trade
      }.bind(this))
      // 购买记录
      recordBuy()
      .then(function (response) {
        let trade = response.data.trade
        this.goumaiR = trade
        this.createScroll();
      }.bind(this))
      // 出售记录
      recordSell()
      .then(function (response) {
        let trade = response.data.trade
        this.chushouR = trade
        this.createScroll();
      }.bind(this))
      // 委托记录
      recordBy()
      .then(function (response) {
        let trade = response.data.trade
        this.weituoR = trade
        this.createScroll();
      }.bind(this))
      // 取消记录
      recordCancel()
      .then(function (response) {
        let trade = response.data.trade
        this.quxiaoR = trade
        this.createScroll();
      }.bind(this))
    },
    // 获取我要卖验证码
    getYaoYanzheng () {
      let phone = this.yaoPhone
      jiaoyiYanzhengma(phone)
      .then(function (response) {
        let data = response.data
        Bus.$emit('openTipModal', data.msg)
      }.bind(this))
      .catch(function (err) {
        if(err && err.response) {
          if(err.response.status === 422) {
            Bus.$emit('openTipModal', err.response.data.msg)
          }
        }
      }.bind(this))
    },
    // 获取挂卖验证码
    getGuaYanzheng () {
      let phone = this.guaPhone
      jiaoyiYanzhengma(phone)
      .then(function (response) {
        let data = response.data
        Bus.$emit('openTipModal', data.msg)
      }.bind(this))
      .catch(function (err) {
        if(err && err.response) {
          if(err.response.status === 422) {
            Bus.$emit('openTipModal', err.response.data.msg)
          }
        }
      }.bind(this))
    },
    // 提交我要卖操作
    yaoSellPost () {
      let params = {
        code: this.yaoYanzheng,
        phone: this.yaoPhone,
        password: this.yaoPas,
        fruit: this.yaoNum,
        buy_user_id: this.yaoAccount
      }
      woyaomai(params)
      .then(function (response) {
        let data = response.data
        Bus.$emit('openTipModal', data.msg)
        Bus.$emit('refreshData')
        this.getJiaoyiMessage()
      }.bind(this))
      .catch(function (err) {
        if(err && err.response) {
          if(err.response.status === 422) {
            Bus.$emit('openTipModal', err.response.data.msg)
          }
        }
      }.bind(this))
    },
    // 提交挂卖操作
    guamaiPost () {
      let params = {
        code: this.guaYanzhengma,
        phone: this.guaPhone,
        password: this.guaPas,
        fruit: this.guaNum
      }
      woyaomai(params)
      .then(function (response) {
        let data = response.data
        Bus.$emit('openTipModal', data.msg)
        Bus.$emit('refreshData')
        this.getJiaoyiMessage()
      }.bind(this))
      .catch(function (err) {
        if(err && err.response) {
          if(err.response.status === 422) {
            Bus.$emit('openTipModal', err.response.data.msg)
          }
        }
      }.bind(this))
    },
    // 确认抢购
    // 确认打米
    makesureBuyfang (e) {
      let id = $(e.target).attr('data-id')
      sureBuyfang(id)
      .then(function (response) {
        let data = response.data
        Bus.$emit('openTipModal', data.msg)
        Bus.$emit('refreshData')
        this.getJiaoyiMessage()
      }.bind(this))
      .catch(function (err) {
        if(err && err.response) {
          if(err.response.status === 422) {
            Bus.$emit('openTipModal', err.response.data.msg)
          }
        }
      }.bind(this))
    },
    // 我要买 取消交易
    rejectBuyfang (e) {
      let id = $(e.target).attr('data-id')
      cancelBuyfang(id)
      .then(function (response) {
        let data = response.data
        Bus.$emit('openTipModal', data.msg)
        Bus.$emit('refreshData')
        this.getJiaoyiMessage()
      }.bind(this))
      .catch(function (err) {
        if(err && err.response) {
          if(err.response.status === 422) {
            Bus.$emit('openTipModal', err.response.data.msg)
          }
        }
      }.bind(this))
    },
    // 待收米 确认收米
    // 抢购单  确认收米
    makesureSellfang (e) {
      let id = $(e.target).attr('data-id')
      sureSellfang(id)
      .then(function (response) {
        let data = response.data
        Bus.$emit('openTipModal', data.msg)
        Bus.$emit('refreshData')
        this.getJiaoyiMessage()
      }.bind(this))
      .catch(function (err) {
        if(err && err.response) {
          if(err.response.status === 422) {
            Bus.$emit('openTipModal', err.response.data.msg)
          }
        }
      }.bind(this))
    },
    // 代收米 取消交易
    // 抢购单  取消挂卖
    rejectSellfang (e) {
      let id = $(e.target).attr('data-id')
      cancelSellfang(id)
      .then(function (response) {
        let data = response.data
        Bus.$emit('openTipModal', data.msg)
        Bus.$emit('refreshData')
        this.getJiaoyiMessage()
      }.bind(this))
      .catch(function (err) {
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
  // 交易所模态框样式
  .jiaoyi-modal {
    .flex-both-center();
    width: 70%;
    height: 80%;
    .modal-content {
      display: flex;
      justify-content: space-between;
      width: 92%;
      height: 85%;
      .tabs-head {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        height: 100%;
        width: 25%;
        font-size: 0.85rem;
        padding-top: 1.8rem;
        box-sizing: border-box;
        .tabs-head-item { 
          margin-bottom: 30%;
          .flex-both-center();
          width: 100%;
          height: 1.5rem;
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
        overflow: hidden;
        .tabs-content-item {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          .content-head {
            display: flex;
            height: 1.8rem;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            .content-head-item {
              .flex-both-center();
              display: flex;
              height: 1.3rem;
              width: 28%;
              border-radius: 1.3rem;
              background-color: #20acd6;
              font-size: 0.9rem;
              &.head-select {
                color: yellow;
              }
            }
          }
          .content-content {
            overflow: hidden;
            flex: 1;
            .content-content-item {
              width: 100%;
              height: 100%;
              overflow: auto;
              // 我要买
              .content-yaoBuy-list {
                display: flex;
                widht: 100%;
                height:50%;
                background-color: rgba(0, 0, 0, 0.4);
                border-radius: 1rem;
                margin: 0.5rem 0;
                /* .content-yaoBuy-list-content {
                  flex: 1;
                  margin: 4%;
                  font-size: 0.8rem;
                  .yaoBuy-list-content-row-1 {
                    height: 25%;
                    display: flex;
                    .yaoBuy-name-title {
                      display: flex;
                      width: 60%;
                      height: 100%;
                    }
                    .yaoBuy-num {
                      display: flex;
                      width: 40%;
                      height: 100%;
                    }
                  }
                  .yaoBuy-list-content-row-2 {
                    display: flex;
                    height: 25%;
                  }
                  .yaoBuy-list-content-row-3 {
                    display: flex;
                    height: 50%;
                    .yaoBuy-time {
                      display: flex;
                      width: 60%;
                      height: 100%;
                    }
                    .yaoBuy-state-opera {
                      width: 40%;
                      height: 100%;
                      .yaoBuy-state {
                        width: 100%;
                        height: 100%;
                      }
                      .yaoBuy-opera {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        font-size: 0.8rem;
                        * {
                          height: 42%;
                          width: 60%;
                          background-size: 100% auto;
                          background-repeat: no-repeat;
                          background-position: center;
                        }
                        .yaoBuy-sure {
                          .flex-both-center();
                          background-image: url('~@/assets/an-bg01.png');
                        }
                        .yaoBuy-cancel {
                          .flex-both-center();
                          margin-top: 5px;
                          background-image: url('~@/assets/an-bg02.png');
                        }
                      }
                    }
                  }
                } */
                .content-yaoBuy-list-content {
                  width: 100%;
                  margin: 4%;
                  font-size: 0.8rem;
                  .yaoBuy-list-content-row-1 {
                    height: 25%;
                    .yaoBuy-name-title {
                      float: left;
                      width: 60%;
                      height: 100%;
                    }
                    .yaoBuy-num {
                      float: right;
                      width: 40%;
                      height: 100%;
                    }
                  }
                  .yaoBuy-list-content-row-2 {
                    height: 25%;
                  }
                  .yaoBuy-list-content-row-3 {
                    height: 50%;
                    .yaoBuy-time {
                      width: 60%;
                      height: 100%;
                      float: left;
                    }
                    .yaoBuy-state-opera {
                      float: right;
                      width: 40%;
                      height: 100%;
                      .yaoBuy-state {
                        width: 100%;
                        height: 100%;
                      }
                      .yaoBuy-opera {
                        width: 100%;
                        height: 100%;
                        font-size: 0.8rem;
                        text-align: center;
                        * {
                          height: 42%;
                          width: 60%;
                          background-size: 100% 100%;
                          background-repeat: no-repeat;
                          background-position: center;
                        }
                        .yaoBuy-sure {
                          width: 4rem;
                          height: 1.2rem;
                          line-height: 1.2rem;
                          background-image: url('~@/assets/an-bg01.png');
                        }
                        .yaoBuy-cancel {
                          margin-top: 5px;
                          width: 4rem;
                          height: 1.2rem;
                          line-height: 1.2rem;
                          background-image: url('~@/assets/an-bg02.png');
                        }
                      }
                    }
                  }
                }
              }
              // 我要卖
              &.yaoSell-content {
                .content-yaoSell-title {
                  height: 10%;
                  .flex-both-center();
                  font-size: 0.8rem;
                  color: yellow;
                }
                .content-yaoSell-content {
                  font-size: 0.9rem;
                  height: 90%;
                  display: flex;
                  background-color: rgba(0, 0, 0, 0.4);
                  border-radius: 1rem;
                  .content-middle {
                    flex: 1;
                    margin: 0 1rem;
                    .yaoSell-item {
                      display: flex;
                      // height: 16%;
                      height: 2.3rem;
                      * {
                        height: 100%;
                      }
                      .item-label {
                        width: 35%;
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                      }
                      .item-input {
                        .flex-both-center();
                        width: 65%;
                        input {
                          width: 90%;
                          box-sizing: border-box;
                          height: 1.2rem;
                          border-radius: 1.2rem;
                          padding-left: 1rem; 
                          padding-right: 1rem;
                        }
                      }
                      .item-yanzheng {
                        .flex-both-center();
                        width: 35%;
                        input {
                          width: 90%;
                          box-sizing: border-box;
                          height: 1.2rem;
                          border-radius: 1.2rem;
                          padding-left: 1rem; 
                          padding-right: 1rem;
                        }
                      }
                      .item-yanzheng-btn {
                        .flex-both-center();
                        width: 30%;
                        .button {
                          .flex-both-center();
                          width: 90%;
                          box-sizing: border-box;
                          height: 1.2rem;
                          border-radius: 1.2rem;
                          font-size: 0.5rem;
                          background-color: #20acd6;
                          .flex-both-center();
                        }
                      }
                      .item-sure {
                        .flex-both-center();
                        height: 100%;
                        width: 100%;
                        .sure {
                          width: 60%;
                          .flex-both-center();
                          height: 1.2rem;
                          border-radius: 1.2rem;
                          font-size: 0.8rem;
                          background-color: #20acd6;
                        }
                      }
                    }

                  }

                }
              }
              // 待收米
              .content-wait-list {
                display: flex;
                box-sizing: border-box;
                width: 100%;
                height:50%;
                background-color: rgba(0, 0, 0, 0.4);
                border-radius: 1rem;
                margin-bottom: 0.5rem;
                padding: 4%;
                .content-wait-list-content {
                  flex: 1;
                  font-size: 0.8rem;
                  .wait-list-content-row-1 {
                    overflow: hidden;
                    height: 25%;
                    display: flex;
                    .wait-name {
                      flex: 1;
                      display: flex;
                      width: 60%;
                      height: 100%;
                    }
                    .wait-num {
                      flex: 1;
                      display: flex;
                      width: 40%;
                      height: 100%;
                    }
                  }
                  .wait-list-content-row-2 {
                    display: flex;
                    height: 25%;
                    .wait-phone {
                      display: flex;
                      width: 60%;
                      height: 100%;
                    } 
                    .wait-state {
                      display: flex;
                      width: 40%;
                      height: 100%;
                      .wait-comment {
                        height: 100%;
                      }
                      .wait-all {
                        height: 100%;
                      }
                    }
                  }
                  .wait-list-content-row-3 {
                    display: flex;
                    height: 25%;
                    .wait-weixin {
                      width: 100%;
                      height: 100%;
                    }
                  }
                  .wait-list-content-row-4 {
                    display: flex;
                    height: 25%;
                    .wait-time {
                      width: 60%;
                      height: 100%;
                    }
                    .wait-opera {
                      width: 40%;
                      height: 100%;
                      * {
                        height: 100%;
                        width: 60%;
                        background-size: 100% auto;
                        background-repeat: no-repeat;
                        background-position: center;
                        .flex-both-center();
                        background-image: url('~@/assets/an-bg01.png');
                      }

                    }
                  }
                }
              }
              // 抢购
              .content-qianggou-list {
                display: flex;
                widht: 100%;
                height:50%;
                background-color: rgba(0, 0, 0, 0.4);
                border-radius: 1rem;
                margin: 0.5rem 0;
                .content-qianggou-list-content {
                  flex: 1;
                  margin: 4%;
                  font-size: 0.8rem;
                  .qianggou-list-content-row-1 {
                    height: 25%;
                    display: flex;
                    .qianggou-name-title {
                      display: flex;
                      width: 60%;
                      height: 100%;
                    }
                    .qianggou-num {
                      display: flex;
                      width: 40%;
                      height: 100%;
                    }
                  }
                  .qianggou-list-content-row-2 {
                    display: flex;
                    height: 25%;
                  }
                  .qianggou-list-content-row-3 {
                    display: flex;
                    height: 50%;
                    .qianggou-time {
                      display: flex;
                      align-items: center;
                      width: 60%;
                      height: 100%;
                    }
                    .qianggou-state-opera {
                      width: 40%;
                      height: 100%;
                      .qianggou-opera {
                        width: 100%;
                        height: 100%;
                        font-size: 0.8rem;
                        display: flex;
                        align-items: center;
                        * {
                          height: 42%;
                          width: 60%;
                          background-size: 100% auto;
                          background-repeat: no-repeat;
                          background-position: center;
                        }
                        .qianggou-sure {
                          .flex-both-center();
                          background-image: url('~@/assets/an-bg01.png');
                        }
                      }
                    }
                  }
                }
              }
              // 挂卖
              &.guamai-content {
                .content-guamai-title {
                  height: 10%;
                  .flex-both-center();
                  font-size: 0.8rem;
                  color: yellow;
                }
                .content-guamai-content {
                  font-size: 0.9rem;
                  height: 90%;
                  display: flex;
                  background-color: rgba(0, 0, 0, 0.4);
                  border-radius: 1rem;
                  .content-middle {
                    flex: 1;
                    margin: 0 1rem;
                    .guamai-item {
                      display: flex;
                      // height: 23%;
                      height: 3.5rem;
                      * {
                        height: 100%;
                      }
                      .item-label {
                        width: 35%;
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                      }
                      .item-input {
                        .flex-both-center();
                        width: 65%;
                        input {
                          width: 90%;
                          box-sizing: border-box;
                          height: 1.2rem;
                          border-radius: 1.2rem;
                          padding-left: 1rem; 
                          padding-right: 1rem;
                        }
                      }
                      .item-yanzheng {
                        .flex-both-center();
                        width: 35%;
                        input {
                          width: 90%;
                          box-sizing: border-box;
                          height: 1.2rem;
                          border-radius: 1.2rem;
                          padding-left: 1rem; 
                          padding-right: 1rem;
                        }
                      }
                      .item-yanzheng-btn {
                        .flex-both-center();
                        width: 30%;
                        .button {
                          .flex-both-center();
                          width: 90%;
                          box-sizing: border-box;
                          height: 1.2rem;
                          border-radius: 1.2rem;
                          font-size: 0.5rem;
                          background-color: #20acd6;
                          .flex-both-center();
                        }
                      }
                      .item-sure {
                        .flex-both-center();
                        height: 100%;
                        width: 100%;
                        .sure {
                          width: 60%;
                          .flex-both-center();
                          height: 1.2rem;
                          border-radius: 1.2rem;
                          font-size: 0.8rem;
                          background-color: #20acd6;
                        }
                      }
                    }

                  }

                }
              }
              // 抢购单
              .content-qianggoulist-list {
                display: flex;
                widht: 100%;
                height:50%;
                background-color: rgba(0, 0, 0, 0.4);
                border-radius: 1rem;
                margin: 0.5rem 0;
                .content-qianggoulist-list-content {
                  flex: 1;
                  margin: 4%;
                  font-size: 0.8rem;
                  .qianggoulist-list-content-row-1 {
                    height: 25%;
                    display: flex;
                    .qianggoulist-name-title {
                      display: flex;
                      width: 60%;
                      height: 100%;
                    }
                    .qianggoulist-num {
                      display: flex;
                      width: 40%;
                      height: 100%;
                    }
                  }
                  .qianggoulist-list-content-row-2 {
                    display: flex;
                    height: 25%;
                    .qianggoulist-name {
                      display: flex;
                      width: 60%;
                      height: 100%;
                    } 
                    .qianggoulist-state {
                      display: flex;
                      width: 40%;
                      height: 100%;
                      .qianggoulist-comment {
                        height: 100%;
                      }
                      .qianggoulist-all {
                        height: 100%;
                      }
                    }
                  }
                  .qianggoulist-list-content-row-3 {
                    display: flex;
                    height: 25%;
                    .qianggoulist-weixin-title {
                      width: 60%;
                      height: 100%;
                    }
                    .qianggoulist-weixin {
                      width: 40%;
                      height: 100%;
                    }

                  }
                  .qianggoulist-list-content-row-4 {
                    display: flex;
                    height: 25%;
                    .qianggoulist-time {
                      width: 60%;
                      height: 100%;
                    }
                    .qianggoulist-opera {
                      width: 40%;
                      height: 100%;
                      * {
                        height: 100%;
                        width: 60%;
                        background-size: 100% auto;
                        background-repeat: no-repeat;
                        background-position: center;
                        .flex-both-center();
                        background-image: url('~@/assets/an-bg01.png');
                      }
                    }
                  }
                }
              }
              // 记录公用
              .content-record-list {
                display: flex;
                widht: 100%;
                height:50%;
                background-color: rgba(0, 0, 0, 0.4);
                border-radius: 1rem;
                margin: 0.5rem 0;
                .content-record-list-content {
                  flex: 1;
                  height: 5rem;
                  margin: 4%;
                  font-size: 0.8rem;
                  .record-list-content-row-1 {
                    height: 33.3%;
                    display: flex;
                    .record-name-title {
                      display: flex;
                      width: 60%;
                      height: 100%;
                    }
                    .record-num {
                      display: flex;
                      width: 40%;
                      height: 100%;
                    }
                  }
                  .record-list-content-row-2 {
                    display: flex;
                    height: 33.3%;
                    .record-name {
                      display: flex;
                      width: 60%;
                      height: 100%;
                    } 
                    .record-state {
                      display: flex;
                      width: 40%;
                      height: 100%;
                      .record-comment {
                        height: 100%;
                      }
                      .record-all {
                        height: 100%;
                      }
                    }
                  }
                  .record-list-content-row-3 {
                    display: flex;
                    height: 33.3%;
                    .record-time {
                      width: 60%;
                      height: 100%;
                    }
                    .record-state {
                      width: 40%;
                      height: 100%;
                      color: yellow;
                    }

                  }
                }
              }
            }
          }
          &.record {
            .content-head-item {
              height: 1.2rem;
              width: 22%;
              border-radius: 1.2rem;
              background-color: #20acd6;
              font-size: 0.8rem;
            }
          }
        }
      }
      .zy {

      }
      .record {
        .content-head{
          .content-head-item {

          }
        }
      }
    }
  }

  #recordsWrapper {
    position: relative;
    height: 8rem;
    padding-bottom: 2rem;

    .content-content-item {
      height: auto;
    }
  }
</style>
