<template>
  <div class="modal-mask" v-show="showModal">
    <div class="choose-image-modal modal">
      <div class="modal-close" ref="btnClose" @click="close($event)"></div>
      <div class="modal-head">修改头像</div>
      <div class="modal-content">
        <div class="modal-content-line">
          <div class="line-column"><img :src="image1" @click="choose('1')"></div>
          <div class="line-column"><img :src="image2" @click="choose('2')"></div>
          <div class="line-column"><img :src="image3" @click="choose('3')"></div>
        </div>
        <div class="modal-content-line">
          <div class="line-column"><img :src="image4" @click="choose('4')"></div>
          <div class="line-column"><img :src="image5" @click="choose('5')"></div>
          <!-- <div class="line-column"><img :src="image6" @click="choose('6')"></div> -->
          <div class="line-column add-image">
            <label>+<input style="display:none;" type="file" accept="image/png,image/gif,image/jpeg" @change="upload($event)"/></label>
          </div>
        </div>
      </div>
    </div>    
  </div>
</template>
<script>
import {setHead, uploadImage} from '@/js/allAxiosRequire'
export default {
  name: 'choose-image-modal',
  data () {
    return {
      image1 : require('../../assets/portrait-tu01.png'),
      image2 : require('../../assets/portrait-tu02.png'),
      image3 : require('../../assets/portrait-tu03.png'),
      image4 : require('../../assets/portrait-tu04.png'),
      image5 : require('../../assets/portrait-tu05.png'),
      image6 : require('../../assets/portrait-tu06.png'),
      showModal: true
    }
  },
  mounted () {
    this.bindModalEvent()
  },
  components: {
  },
  methods: {
    choose (imageSrc) {
      setHead(imageSrc)
      .then(function (respones) {
        this.showModal = false
        Bus.$emit('openTipModal', respones.data.msg)
        Bus.$emit('refreshData')
      }.bind(this))
      .catch(function (err) {
        if(err && err.response) {
          if(err.response.status === 422) {
            Bus.$emit('openTipModal', err.response.data.msg)
          }
        }
      }.bind(this))
    },
    close () {
      this.showModal = false
    },
    bindModalEvent () {
      this.showModal = false
      Bus.$on('openChooseImageModal', function(){
        this.showModal = true
      }.bind(this))
    },
    upload (e) {
      let file = e.target.files[0];
      let param = new FormData();
      param.append('uploadfile',file,file.name);
      uploadImage(param)
      .then(function (response) {
         let data = response.data
         this.choose(data)
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
.choose-image-modal {
  color: #fff;
  border: 1px solid #05bae7;
  .modal-head {
    height: 3rem;
    .flex-both-center();
  }
  .modal-content {
    padding: 1rem;
    padding-top: 0;
    font-size: 0.9rem;
    .modal-content-line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 5rem;
      .line-column {
        .flex-both-center();
        font-size: 3.5rem;
        height: 4rem;
        width: 4rem;
        margin: 0 0.5rem;
        img {
          height: 4rem;
          width: 4rem;
          border-radius: 4rem;
        }
        label {
          .flex-both-center();
          height: 4rem;
          width: 4rem;
          border-radius: 4rem;
        }
      }
    }
  }
}
</style>
