<template>
  <!-- 设置 -->
  <!-- <audio id="mainBgMusic" ref="mainBgMusic" loop autoplay>
    <source src="/static/music/back.mp3" type="audio/mpeg">
  </audio> -->
  <div class="modal-mask" v-show="showModal">
    <div class="shezhi-modal modal">
      <div class="modal-close" @click="close($event)"></div>
      <div class="modal-head">设置</div>
      <div class="modal-content">
        <div class="modal-content-cell">
          <div class="cell-key">
            <div class="cell-key-bg yinyue"></div>
            <div class="cell-key-word">音乐</div>
          </div>
          <div class="cell-value">
            <div class="switch-bg"  @click="clickSound" :class="{'close': !sound}">
              <div class="switch-cir" :class="{'close': !sound}"></div>
            </div>
          </div>
        </div>
        <div class="modal-content-cell">
          <div class="cell-key">
            <div class="cell-key-bg yinxiao"></div>
            <div class="cell-key-word">音效</div>
          </div>
          <div class="cell-value">
            <div class="switch-bg"  @click="clickSoundEffect" :class="{'close': !soundEffect}">
              <div class="switch-cir" :class="{'close': !soundEffect}"></div>
            </div>
          </div>
        </div>
        <div class="modal-content-cell">
          <div class="logout" @click="logout">退出游戏</div>
          <!-- <button class="logout" @click="logout">退出游戏</button> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {logout} from '@/js/allAxiosRequire'
  import util from '@/js/util'

  export default {
    name: 'shezhi-modal',
    data () {
      return {
        sound: true,
        soundEffect: true,
        showModal: false
      }
    },
    mounted () {
      setTimeout(()=>{
        if(!localStorage.musicFlag) {
          localStorage.musicFlag = 'open';
        }
        // var mainBgMusic = this.$refs.mainBgMusic;
        var mainBgMusic = document.getElementById('mainBgMusic');
        console.log('mounted: ' + mainBgMusic);
        if(localStorage.musicFlag === 'close') {
          // 关闭音乐
          mainBgMusic.pause();
          this.sound = false;
        }

        this.bindModalEvent()

      }, 500);
    },
    components: {
    },
    methods: {
      logout() {
        logout()
        .then(function (response) {
          util.setSession('Token', '');
          sessionStorage._token = '';
          // console.log('logout: ' + sessionStorage._token);
          this.$router.push({path: '/login'});
        })
        .catch(function (err) {
          this.$router.push({path: '/login'});
          util.setSession('Token', '');
        }.bind(this))
      },
      close () {
        this.showModal = false
      },
      clickSound () {
        console.log(localStorage.musicFlag);
        // var mainBgMusic = this.$refs.mainBgMusic;
        var mainBgMusic = document.getElementById('mainBgMusic');
        console.log(this.sound);

        if(localStorage.musicFlag === 'open') {
          // 关闭音乐
          mainBgMusic.pause();
          localStorage.musicFlag = 'close';
          this.sound = false;
        }else {
          // 开启音乐
          mainBgMusic.play();
          localStorage.musicFlag = 'open';
          this.sound = true;
        }
        // this.sound = !this.sound
      },
      clickSoundEffect () {
        this.soundEffect = !this.soundEffect
      },
      bindModalEvent () {
        this.showModal = false
        Bus.$on('openShezhiModal', function(){
          this.showModal = true
        }.bind(this))
      },
    }
  // watch : {}
}
</script>
<style scoped lang="less" type="text/less">
  // flex布局水平垂直居中
  .flex-both-center () {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .shezhi-modal {
    display: flex;
    flex-direction: column;
    width: 16rem;
    border: 1px solid #05bae7;
    .modal-head {
      height: 2.1rem;
      .flex-both-center()
    }
    .modal-content {
      flex: 1;
      padding: 1rem 2rem;
      .modal-content-cell {
        display: flex;
        height: 2.5rem;
        .cell-key {
          display: flex;
          font-size: 1rem;
          .flex-both-center();
          flex: 1;
          .cell-key-bg {
            flex: 1;
            height: 100%;
            background-size: 55% 55%;
            background-repeat: no-repeat;
            background-position: right center;
            &.yinyue {
              background-image: url('~@/assets/set-ico01.png')
            }
            &.yinxiao {
              background-image: url('~@/assets/set-ico02.png')
            }
          }
          .cell-key-word {
            flex: 1;
            height: 100%;
            .flex-both-center();
          }
        }
        .cell-value {
          .flex-both-center();
          flex: 1;
          .switch-bg {
            position: relative;
            width: 65%;
            height: 1.5rem;
            border-radius: 1.5rem;
            background-color: #1ff37e;
            transition: all 1s;
            &.close {
              background-color: #d4d4d4;
            }
            .switch-cir {
              position: absolute;
              right: 0;
              width: 1.5rem;
              height: 1.5rem;
              border-radius: 1.5rem;
              transition: all 1s;
              background-color: #fff;
              &.close {
                left: 0;
                right: auto;
              }
            }
          }
        }
        .logout {
          // border: none;
          // border-radius: 3rem;
          // background-color: #e37f2c;
          // padding: 0.1rem 1rem;
          // height: 2rem;
          // font-size: 0.8rem;
          // color: #fff;
          // margin: 0.7rem auto;
          color: #fff;
          height: 65%;
          width: 60%;
          background-image: url('~@/assets/an-bg01.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-position: center center;
          font-size: 1.1rem;
          text-align: center;
          margin: 1rem auto 0;
        }
      }
    }
  }
</style>
