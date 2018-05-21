<template>
  <div class="modal-mask" v-show="showModal">
    <div class="kaidi-modal modal">
      <div class="modal-close" ref="btnClose" @click="close($event)"></div>
      <div class="modal-head"></div>
      <div class="modal-content">确认要筑巢并增养{{ minFruit }}只企鹅吗？</div>
      <div class="modal-footer">
        <div class="modal-footer-btn-cancel" @click="cancel($event)" ref="btnCancel">取消</div>
        <div class="modal-footer-btn-sure" @click="sure($event)" ref="btnSure">确认</div>
      </div>
    </div>
  </div>
</template>
<script>
import { assart } from "@/js/allAxiosRequire";
export default {
  name: "kaidi-modal",
  props: ["cell"],
  data() {
    return {
      showModal: true
    };
  },
  mounted() {
    this.bindModalEvent();
  },
  components: {},
  computed: {
    minFruit() {
      if (this.cell.xy !== undefined) {
        return this.cell.land.min_fruit;
      }
    }
  },
  methods: {
    cancel(e) {
      this.showModal = false;
    },
    sure(e) {
      this.showModal = false;
      assart(this.cell.xy)
        .then(
          function(respones) {
            Bus.$emit("openTipModal", respones.data.msg);
            Bus.$emit("refreshData");
          }.bind(this)
        )
        .catch(function(err) {
          if (err && err.response) {
            if (err.response.status === 422) {
              Bus.$emit("openTipModal", err.response.data.msg);
            }
          }
        });
    },
    close() {
      this.showModal = false;
    },
    bindModalEvent() {
      this.showModal = false;
      Bus.$on(
        "openKaidiModal",
        function() {
          if (this.cell.land === undefined) {
            Bus.$emit("openTipModal", "请先选择企鹅窝");
          } else {
            if (this.cell.tree) {
              Bus.$emit("openTipModal", "该企鹅窝已开放");
            } else {
              this.showModal = true;
            }
          }
        }.bind(this)
      );
      Bus.$on(
        "closeKaidiModal",
        function() {
          this.showKaidiModal = false;
        }.bind(this)
      );
    }
  }
};
</script>
<style scoped lang="less" type="text/less">
.flex-both-center () {
  display: flex;
  justify-content: center;
  align-items: center;
}
.kaidi-modal {
  width: 18rem;
  color: #fff;
  .modal-head {
    height: 2.1rem;
  }
  .modal-content {
    height: 5rem;
    padding: 0 1rem;
    .flex-both-center();
    font-size: 1rem;
  }
  .modal-footer {
    height: 2.5rem;
    display: flex;
    justify-content: space-between;
    align-content: center;
    * {
      .flex-both-center();
      height: 1.5rem;
      width: 5rem;
      background-image: url("~@/assets/an-bg01.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
      margin: 0 2rem;
    }
  }
}
</style>
