<template>
  <div class="user-message" ref="userMessage" @click="showAccount">
    <div class="user-detail">
      <div class="user-image" ref="userImage">
        <img :src="imageSrc" class="image" ref="image">
      </div>
      <div class="user-detail-message">
        <div class="user-name">
          <div class="name" ref="name">{{ userName }}</div>
        </div>
        <div class="user-id">
          <div class="id" ref="id">{{ userId }}</div>
        </div>
      </div>
    </div>
    <div class="user-comment">
      <div class="comment" ref="comment">{{ comment }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "user-message",
  props: {
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
    return {
      defaultImages: {
        "1": require("../../assets/portrait-tu01.png"),
        "2": require("../../assets/portrait-tu02.png"),
        "3": require("../../assets/portrait-tu03.png"),
        "4": require("../../assets/portrait-tu04.png"),
        "5": require("../../assets/portrait-tu05.png")
      }
    };
  },
  mounted() {
    this.setImageWH();
    this.setBorderRadius();
  },
  computed: {
    comment() {
      return this.userName + " : " + this.userId;
    },
    imageSrc() {
      if (
        this.userImage === "" ||
        this.userImage === null ||
        this.userImage === undefined
      ) {
        sessionStorage.userHeadImg = this.defaultImages["1"];
        return this.defaultImages["1"];
      }
      if (this.defaultImages[this.userImage]) {
        sessionStorage.userHeadImg = this.defaultImages[this.userImage];
        return this.defaultImages[this.userImage];
      } else {
        sessionStorage.userHeadImg = window.baseURL + this.userImage;
        return window.baseURL + this.userImage;
      }
    }
  },
  components: {},
  methods: {
    min(val1, val2) {
      return val1 > val2 ? val2 : val1;
    },
    setImageWH() {
      let userImage = $(this.$refs.userImage);
      let image = this.$refs.image;
      let min = this.min(userImage.width(), userImage.height());
      image.style.width = image.style.height = min * 0.85 + "px";
    },
    setBorderRadius() {
      let refs = this.$refs;
      let min = this.min;
      let elements = [refs.name, refs.id, refs.comment];
      let foreach = function(value, index, array) {
        let val = $(value);
        let _min = min(val.width(), val.height());
        value.style.borderRadius = _min / 2 + "px";
        value.style.lineHeight = val.height() + "px";
      };
      elements.forEach(foreach);
    },
    showAccount() {
      Bus.$emit("openAccountModal");
    }
  }
};
</script>
<style scoped lang="less" type="text/less">
.center-vertical {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.message-box () {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateY(-50%);
  height: 60%;
  left: 5px;
  right: 5px;
  background-color: rgba(0, 0, 0, 0.2);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.user-message {
  position: relative;
  display: flex;
  width: 24%;
  margin: 1% 0% -3% 2%;
  border-radius: 6px;
  // background-color: rgba(0, 0, 0, 0.2);
  flex-direction: column;
  font-size: 0.7rem;
  color: #fff;
  background-image: url("~@/assets/userMessage_bg.png");
  background-size: 100% 100%;
  .user-detail {
    flex: 2;
    display: flex;
    margin-top: 1.2rem;
    .user-image {
      position: relative;
      flex: 2;
      display: flex;
      .image {
        flex: 1;
        .center-vertical ();
      }
    }
    .user-detail-message {
      flex: 3;
      display: flex;
      flex-direction: column;
      .user-name {
        flex: 1;
        position: relative;
        .name {
          .message-box();
          text-align: center;
        }
      }
      .user-id {
        flex: 1;
        position: relative;
        .id {
          .message-box();
          text-align: center;
        }
      }
    }
  }
  .user-comment {
    flex: 1;
    position: relative;
    width: 90%;
    margin: 0 auto;
    margin-bottom: 1.1rem;
    .comment {
      .message-box();
      text-align: center;
    }
  }
}
</style>
