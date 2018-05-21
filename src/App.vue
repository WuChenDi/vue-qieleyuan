<template>
  <div id="app" class="cross">
    <!-- <img src="./assets/logo.png"> -->
    <router-view></router-view>
    <!-- <a class="recordNumber" href="http://www.miitbeian.gov.cn/" target="_blank">沪ICP备17043533号</a> -->
  </div>
</template>

<script>
  export default {
    name: 'app',
    mounted(){
      crossScreen();
    }
  }
</script>

<style>
  /* @import '~@/less/reset.less' */
  html,
  body{
    overflow: hidden;
    font-size: 16px;
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    font-family: Tahoma,Helvetica,Arial,'宋体',sans-serif;
  }
  input {
    outline:none;
    border:  0;
  }

  #app {
    font-size: 16px;
    height: 100%;
    width: 100%;
  }
  /*横屏*/
  .cross {
    position: absolute;
  }
  /*竖屏*/
  .vertical {
    position: absolute;
  }
  /*#app .recordNumber {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    z-index: 100;
    font-size: 0.6rem;
    color: #fff;
    text-decoration: none;
  }*/

  /* 自定义滚动条样式 */
  .scrollbar {
    overflow-y: auto !important;
  }
  .scrollbar::-webkit-scrollbar {
    width: 0.5rem;
    background-color: #cba264;
  }
  .scrollbar::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow:inset 1px 1px 0 rgba(255,255,255,0.5);
    background-color: #6C5F54;
  }
  .scrollbar::-webkit-scrollbar-track {
    -webkit-box-shadow:inset 1px 1px 0 rgba(255,255,255,0.5);
    border-radius: 10px;
    background-color: #cba264;
  }

  /*.scrollbar::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: red;
    border: 0px solid #fff;
  }*/
</style>
