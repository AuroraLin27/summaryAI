<script setup>
// 组件逻辑
</script>

<template>
  <div class="header-container">
    <el-menu
      mode="horizontal"
      :ellipsis="false"
      class="header-menu"
      background-color="#f0768b"
    >
      <div class="logo-container" @click="$router.push('/')">
        <img src="@/assets/logo.svg" alt="Logo" class="logo" />
        <span class="site-name">SummaryAI</span>
      </div>

      <div class="flex-grow" />

      <el-menu-item index="1" @click="$router.push('/summary')">
        生成摘要
      </el-menu-item>
      <el-menu-item index="2" @click="$router.push('/history')">
        历史记录
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped>


:deep(.el-menu-item) {
  font-size: 16px;
  color: #ffffff !important;
}

:deep(.el-menu-item:hover) {
  background-color: rgba(255, 255, 255, 0.3) !important;
  /* border:3px solid #ffffff; */
  /* border-right: 3px solid #ffffff; */
}

:deep(.el-menu-item.is-active) {
  background-color: rgba(255, 255, 255, 0.2) !important;
  border-bottom: 2px solid #ffffff !important;
  color: #ffffff !important;
}

:deep(.el-menu--horizontal) {
  border-bottom: none;
}

:deep(.el-menu-item) {
  font-size: 16px;
}

.header-container {
  width: 100%;
  box-shadow: 0 2px 4px rgb(255, 255, 255);
  border-bottom: 5px solid #ffffff;
  margin: 0;
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: #f0768b;
}

.header-menu {
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin: 0;
  width: 100%;
}

.logo-container {
  display: flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.logo-container:hover {
  transform: scale(1.05);
}

.logo {
  height: 28px;
  margin-right: 10px;
}

.site-name {
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
}

.flex-grow {
  flex-grow: 1;
}
</style>

