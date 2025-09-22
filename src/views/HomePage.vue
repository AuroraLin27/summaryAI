<script setup></script>

<template>
  <div class="home-container">
    <div class="content">
      <h1 class="title">快来试试用AI总结你的内容吧！</h1>
      <el-button
        type="primary"
        size="large"
        class="start-button"
        @click="$router.push('/summary')"
      >
        点击开始
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  min-height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  /* 只有一个content */
  align-items: center;
  background: linear-gradient( #ffe4e8 0%, #f0768b 100%);
  margin: 0;
  padding: 0;
  width: 100%;
  box-sizing: border-box;
  /* 顶部导航 */
  margin-top: 60px;
}

.content {
  text-align: center;
  padding: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 2rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.start-button {
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1.7rem 2rem;
  background-color: #ffffff;
  color: #f0768b;
  border: none;
  transition: all 0.3s ease;
  box-shadow: 0px 2px 15px 7px rgba(0, 0, 0, 0.1);
}

.start-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
}

.start-button:active {
  transform: translateY(0);
}
</style>
