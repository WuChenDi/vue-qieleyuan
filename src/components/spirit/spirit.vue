<template>
  <div class="spirit" ref="spirit">
    <div class="spirit-figure spirit-figure-1 max-spirit" v-if="maxSpirit === 1"></div>
    <div class="spirit-figure spirit-figure-2 medium-spirit" v-if="mediumSpirit === 1"></div>
    <div class="spirit-figure spirit-figure-3 small-spirit" v-if="smallSpirit > 0"></div>
    <div class="spirit-figure spirit-figure-4 small-spirit" v-if="smallSpirit > 1"></div>
    <div class="spirit-figure spirit-figure-5 small-spirit" v-if="smallSpirit > 2"></div>
    <div class="spirit-figure spirit-figure-6 small-spirit" v-if="smallSpirit > 3"></div>
  </div>
</template>
<script>
export default {
  name: 'spirit',
  props: {
    'smallSpirit':  {
        type: Number,
        default: 0
    },
    'mediumSpirit':  {
        type: Number,
        default: 0
    },
    'maxSpirit':  {
        type: Number,
        default: 0
    }
  },
  data () {
    return {}
  },
  mounted () {
  },
  components: {
  },
  methods: {
  }
}
</script>
<style scoped lang="less" type="text/less">
.spirit {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  .spirit-figure {
    position: absolute;
    width: 11%;
    height: 36%;
    background-repeat: no-repeat;
  }
  .spirit-figure-1 {
    background-image: url('~@/assets/elf01.png');
    background-size: 63%;
    left: 17%;
    top: 32%;
    z-index: 2;
  }
  .spirit-figure-2 {
    background-image: url('~@/assets/elf02.png');
    background-size: 75%;
    left: 23%;
    top: 35%;
    z-index: 1;
  }
  .spirit-figure-3 {
    background-image: url('~@/assets/elf03.png');
    background-size: 90%;
    left: 40%;
    top: 25%;
    z-index: 1;
  }
  .spirit-figure-4 {
    background-image: url('~@/assets/elf04.png');
    background-size: 66%;
    left: 58%;
    top: 25%;
    z-index: 2;
  }
  .spirit-figure-5 {
    background-image: url('~@/assets/elf05.png');
    background-size: 62%;
    left: 72%;
    top: 25%;
    z-index: 3;
  }
  .spirit-figure-6 {
    width: 14%;
    background-image: url('~@/assets/elf06.png');
    background-size: 100%;
    left: 73%;
    top: 50%;
    z-index: 4;
  }
}
</style>
