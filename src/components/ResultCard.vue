<script setup>
// 导入
import { Document } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// 参数对象
// 接收数据
const props = defineProps({
  result: {
    type: String,
    default: ''
  },
  // 显示开关
  show: {
    type: Boolean,
    default: false
  }
})

// 方法
// 剪贴板
const copyToClipboard = async () => {
  if (!props.result) return
  try {
    await navigator.clipboard.writeText(props.result)
    ElMessage.success('复制成功！')
  } catch (err) {
    console.error(err.message)
    ElMessage.error('复制失败，请手动复制')
  }
}
</script>

<template>
  <div class="result-card" v-if="show && result">
    <div class="card-header">
      <h2>AI 总结结果</h2>
      <el-button
        type="primary"
        link
        class="copy-button"
        @click="copyToClipboard"
      >
        <el-icon><Document /></el-icon>
        复制结果
      </el-button>
    </div>
    <div class="card-content">
      <p>{{ result }}</p>
    </div>
  </div>
</template>

<style scoped>
.result-card {
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  padding: 25px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(240, 118, 139, 0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f5a3b0;
}

.card-header h2 {
  color: #f0768b;
  font-size: 1.5rem;
  margin: 0;
}

.copy-button {
  color: #f0768b;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.copy-button:hover {
  color: #e85d74;
}

.card-content {
  color: #333;
  font-size: 16px;
  line-height: 1.8;
  white-space: pre-wrap;
}
</style>`
