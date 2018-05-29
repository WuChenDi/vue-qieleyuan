<template>
  <div class="user-farm-message">
    <user-message :userId="userId" :userName="userName" :userImage="userImage"></user-message>
    <farm-message :seed="seed" :fertilizer="fertilizer" :depot="depot" :landCount="landCount" :earnings="earnings" :directPush="directPush" :wanshua="wanshua"></farm-message>
  </div>
</template>
<script>
import UserMessage from "@/components/user-farm-message/user-message";
import FarmMessage from "@/components/user-farm-message/farm-message";
export default {
  name: "farm-user-message",
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
    landCount: {
      type: Number,
      default: 0
    },
    earnings: {
      type: Number,
      default: 0
    },
    directPush:{
      type: Number,
      default: 0
    },
    wanshua: {
      type: Number,
      type: 0
    },
    userId: {
      type: Number,
      default: 0
    },
    userName: {
      type: String,
      default: ""
    },
    userImage: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
  components: {
    UserMessage,
    FarmMessage
  }
};
</script>
<style scoped lang="less" type="text/less">
.user-farm-message {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 5;
  width: 100%;
  height: 24%;
  display: flex;
}
</style>
