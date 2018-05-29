<template>
  <div class="farm-operation" ref="farmOperation">
    <div class="kaidi" ref="kaidi" @click="kaidi($event)"></div>
    <div class="zengzhong" ref="zengzhong" v-on:click="zengzhong($event)"></div>
    <div class="shifei" ref="shifei" @click="shifei($event)"></div>
    <div class="jiaoshui" ref="jiaoshui" @click="jiaoshui($event)"></div>
    <div class="shouhuo" ref="shouhuo" @click="shouhuo($event)"></div>
    <div class="refresh" ref="refresh" @click="refresh($event)"></div>
  </div>
</template>
<script>
export default {
  name: "farm-operation",
  data() {
    return {};
  },
  mounted() {
    crossScreen().then(() => {
      this.setButtonHeight();
    });
  },
  methods: {
    setButtonHeight() {
      let parentElement = $(this.$refs.farmOperation);
      let eachHeight = parentElement.height();
      $.each(parentElement.children(), function(index, val) {
        val.style.width = eachHeight + "px";
      });
    },
    kaidi(e) {
      Bus.$emit("openKaidiModal");
    },
    zengzhong(e) {
      Bus.$emit("toggleZengzhongModal");
    },
    shifei(e) {
      Bus.$emit("shifei");
    },
    jiaoshui(e) {
      Bus.$emit("jiaoshui");
    },
    shouhuo(e) {
      Bus.$emit("openShouhuoModal");
    },
    refresh() {
      // location.reload();
      Bus.$emit("openTipModal", "刷新成功");
    }
  }
};
</script>
<style scoped lang="less" type="text/less">
.nav-ico (@num) {
  background-image: url("~@/assets/nav-ico@{num}.png");
}
.farm-operation {
  position: absolute;
  left: 50%;
  bottom: 2%;
  z-index: 7;
  width: 70%;
  height: 13%;
  text-align: center;
  transform: translateX(-50%);
  font-size: 0;
  * {
    display: inline-block;
    height: 100%;
    background-size: 100% 100%;
    margin: 0 0.2rem;
  }
  .kaidi {
    .nav-ico ("01");
  }
  .zengzhong {
    .nav-ico ("03");
  }
  .shifei {
    .nav-ico ("02");
  }
  .jiaoshui {
    .nav-ico ("04");
  }
  .shouhuo {
    .nav-ico ("05");
  }
  .refresh {
    .nav-ico ("06");
  }
}
</style>