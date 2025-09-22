<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue';
</script>

<template>
  <div id="app">
    <HeaderComponent></HeaderComponent>
    <router-view></router-view>
    <footer class="site-footer">
      <a href="http://beian.miit.gov.cn/"   target="_blank" rel="noopener noreferrer">
        粤ICP备2025474253号
      </a>
  </footer>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

#app {
  /* 根容器占满宽度 */
  width: 100%;
  min-height: 100vh;
  display: flex;
  /* 垂直排列 */
  flex-direction: column;
}
.site-footer {
  background-color: #f0768b;
  height: 20px;
  text-align: center;
  font-size: 12px;
  a {
    color: black;
  }
}
</style>
