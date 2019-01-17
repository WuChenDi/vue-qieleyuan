// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import FastClick from 'fastclick'
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
}, false);
}

import Vue from 'vue'
import App from './App'
import router from './router'
window.$ = require('jquery')

Vue.config.productionTip = false


window.crossScreen = function() {
    return new Promise(function(resolve, reject){
       setTimeout(()=>{
           let width = document.documentElement.clientWidth;
           let height = document.documentElement.clientHeight;
           let cross = $('.cross');
           let vertical = $('.vertical');
           let duan = width;
           if (width > height) {
               duan = height;
               cross.width(width);
               cross.height(height);
               cross.css('top', 0);
               cross.css('left', 0);
               cross.css('transform', 'none');
               cross.css('transform-origin', '50% 50%');

               vertical.width(height);
               vertical.height(width);
               vertical.css('top', (height - width) / 2);
               vertical.css('left', 0 - (height - width) / 2);
               vertical.css('transform', 'rotate(90deg)');
               vertical.css('transform-origin', '50% 50%');
           } else {
               cross.width(height);
               cross.height(width);
               cross.css('top', (height - width) / 2);
               cross.css('left', 0 - (height - width) / 2);
               cross.css('transform', 'rotate(90deg)');
               cross.css('transform-origin', '50% 50%');

               vertical.width(width);
               vertical.height(height);
               vertical.css('top', 0);
               vertical.css('left', 0);
               vertical.css('transform', 'none');
               vertical.css('transform-origin', '50% 50%');
           }
           if (duan < 330) {
               $('html').css('font-size', '12px');
           } else if (duan < 380) {
               $('html').css('font-size', '14px');
           } else if (duan < 450) {
               $('html').css('font-size', '16px');
           } else {
               $('html').css('font-size', '18px');
           }
           resolve();
       }, 500);   
   });

}
let evt = "onorientationchange" in window ? "orientationchange" : "resize";
window.addEventListener(evt, crossScreen, false);
crossScreen();

/* eslint-disable no-new */
window.Bus = new Vue()
var Root = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

// 下拉滚动条时禁止浏览器下拉刷新
setTimeout(() => {
  $('.modal').on('touchmove', function (event) { 
    event.preventDefault();
  });
}, 2000);
