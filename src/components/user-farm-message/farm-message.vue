<template>
  <div class="farm-message" ref="farmMessage">
    <!-- 企鹅总数 -->
    <div class="fm seed">企鹅总数:
      <p>{{ seed }}</p>
      <div class="clear"></div>
    </div>
    <!-- 孵化 -->
    <div class="fm fertilizer">孵化: 
      <p>{{ fertilizer }}</p>
      <div class="clear"></div>
    </div>
    <!-- 仓库 -->
    <div class="fm depot">仓库: 
      <p>{{ depot }}</p>
    </div>
    <!-- 已开地 -->
    <div class="fm landCount">生产量：
      <p>{{ landCount }}</p>
    </div>
    <!-- 总收益 -->
    <div class="fm earnings">总收益: 
      <p>{{ earnings }}</p>
    </div>
    <!-- 直推奖 -->
    <div class="fm directPush">领导奖: 
      <p>{{ directPush }}</p>
    </div>
    <!-- 玩耍 -->
    <div class="fm wanshua">玩耍：
      <p>{{ wanshua }}</p>
    </div>
    <!-- 滚动公告 -->
    <notice-modal></notice-modal>
    <!-- <div class="refresh" @click="refresh"></div> -->
  </div>
</template>
<script>
import NoticeModal from "@/components/modal/notice-modal";
export default {
  name: "farm-message",
  props: {
    seed: {
      type: Number,
      default: 0
    },
    fertilizer: {
      type: Number,
      default: 0
    },
    depot: {
      type: Number,
      default: 0
    },
    earnings: {
      type: Number,
      default: 0
    },
    landCount: {
      type: Number,
      default: 0
    },
    directPush: {
      type: Number,
      default: 0
    },
    wanshua: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  },
  mounted() {
    this.setHeight();
  },
  components: {
    NoticeModal
  },
  methods: {
    // setHeight() {
    //   let messageElement = $(this.$refs.farmMessage).children();
    //   let width = $(messageElement[0]).width();
    //   let eachHeight = this.getHeight(width);
    //   $.each(messageElement, function(index, val) {
    //     // val.style.lineHeight = val.style.height = eachHeight + "px";
    //     var vEachHeight = eachHeight + 6;
    //     val.style.height = eachHeight + "px";
    //     val.style.lineHeight = vEachHeight + "px";
    //   });
    // },
    // getHeight(width) {
    //   return width * (100 / 240);
    // },
    // refresh() {
    //   location.reload();
    // }
  }
};
</script>
<style scoped lang="less" type="text/less">
.farm-message {
  flex: 1;
  display: flex;
  margin-top: 2%;
  font-size: 0.8rem;
  color: #fff;
  position: relative;
  .fm {
    width: 13%;
    height: 2.8rem;
    line-height: 2.3rem;
    flex: 1;
    margin: 0 0.15rem;
    background-image: url("~@/assets/status-bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    text-align: center;
    white-space: nowrap;
  }
  p {
    height: 1rem;
    line-height: 1rem;
    margin: -0.65rem;
    padding: 0;
  }
  .clear{
    clear: both;
  }
  .noticeModal {
    background-image: none;
  }

  .refresh {
    position: absolute;
    top: 35px;
    right: 10px;
    width: 40px;
    height: 40px !important;
    border-radius: 50%;
    background-image: url("~@/assets/nav-ico06.png");
  }
}
</style>
