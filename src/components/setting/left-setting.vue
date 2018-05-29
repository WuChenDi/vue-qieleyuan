<template>
	<div class="left-setting" ref="leftSetting">
    <div class="xiaoxi" v-on:click="xiaoxi($event)"></div>
    <div class="youxidating" v-on:click="youxidating($event)"></div>
    <div class="shezhi" v-on:click="shezhi($event)"></div>
    <div class="jihuohaoyou" v-on:click="jihuohaoyou($event)"></div>
	</div>
</template>
<script>
export default {
  name: 'left-setting',
  data () {
    return {}
  },
  mounted () {
    this.setHeight()
  },
  components: {
  },
  methods: {
    getHeight (width) {
      return width * (95 /216)
    },
    setHeight () {
      let parentElement = $(this.$refs.leftSetting)
      let eachHeight = this.getHeight(parentElement.width())
      $.each(parentElement.children(), function(index, val) {
        val.style.lineHeight = val.style.height = eachHeight + 'px'
      });
    },
    xiaoxi (e) {
      Bus.$emit('openXiaoxiModal')
    },
    youxidating (e) {
      Bus.$emit('openYouxidatingModal')
    },
    shezhi (e) {
      Bus.$emit('openShezhiModal')
    },
    jihuohaoyou (e) {
      Bus.$emit('openJihuoModal')
    }
  }
}
</script>
<style scoped lang="less" type="text/less">
.left-setting {
  position: absolute;
  width: 12%;
  height: 64%;
  left: 2%;
  top: 24%;
  z-index: 6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1rem;
  * {
    width: 100%;
    margin: 9% 0;
    // background-image: url('~@/assets/menu-bg.png');
    background-size: 100% 100%;
    text-align: center;
  }
  .xiaoxi{
    background-image: url('~@/assets/menuBg-xiaoxi.png');
  }
  .youxidating{
    background-image: url('~@/assets/menuBg-youxidating.png');
  }
  .shezhi{
    background-image: url('~@/assets/menuBg-shezhi.png');
  }
  .jihuohaoyou{
    background-image: url('~@/assets/menuBg-jihuohaoyou.png');
  }
}
</style>
