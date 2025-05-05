<script setup>
// 步骤1: 导入必要的依赖
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

// 步骤2: 定义组件属性
const props = defineProps({
  summary: {
    type: String,
    required: true
  },
  originalText: {
    type: String,
    required: true
  }
})

// 步骤3: 定义组件状态
const isExpanded = ref(false)  // 控制文本展开/收起状态
const isCopied = ref(false)    // 控制复制按钮状态

// 步骤4: 处理复制功能
const copyToClipboard = async () => {
  try {
    // 复制摘要内容到剪贴板
    await navigator.clipboard.writeText(props.summary)
    isCopied.value = true
    ElMessage.success('复制成功')
    // 3秒后重置复制状态
    setTimeout(() => {
      isCopied.value = false
    }, 3000)
  } catch (err) {
    ElMessage.error('复制失败')
  }
}

// 步骤5: 处理展开/收起功能
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

// 步骤6: 组件挂载时的处理
onMounted(() => {
  // 如果原始文本长度超过200字符，默认收起
  if (props.originalText.length > 200) {
    isExpanded.value = false
  }
})
</script>

<template>
  <!-- 步骤7: 构建结果展示界面 -->
  <div class="summary-result">
    <!-- 摘要内容区域 -->
    <div class="summary-content">
      <h3 class="summary-title">摘要结果</h3>
      <p class="summary-text">{{ summary }}</p>
    </div>
    
    <!-- 操作按钮区域 -->
    <div class="action-buttons">
      <!-- 复制按钮 -->
      <el-button
        type="primary"
        :class="{ 'is-copied': isCopied }"
        @click="copyToClipboard"
      >
        {{ isCopied ? '已复制' : '复制摘要' }}
      </el-button>
      
      <!-- 展开/收起按钮 -->
      <el-button
        v-if="originalText.length > 200"
        type="info"
        plain
        @click="toggleExpand"
      >
        {{ isExpanded ? '收起原文' : '查看原文' }}
      </el-button>
    </div>
    
    <!-- 原文内容区域 -->
    <div v-if="isExpanded" class="original-text">
      <h4>原文内容</h4>
      <p>{{ originalText }}</p>
    </div>
  </div>
</template>

<style scoped>
/* 步骤8: 样式定义 */
/* 结果容器样式 */
.summary-result {
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(240, 118, 139, 0.15);
}

/* 摘要内容区域样式 */
.summary-content {
  margin-bottom: 20px;
}

/* 摘要标题样式 */
.summary-title {
  color: #333;
  font-size: 20px;
  margin-bottom: 15px;
  font-weight: 600;
}

/* 摘要文本样式 */
.summary-text {
  color: #666;
  font-size: 16px;
  line-height: 1.8;
  white-space: pre-wrap;
}

/* 操作按钮区域样式 */
.action-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

/* 复制按钮样式 */
.action-buttons .el-button {
  flex: 1;
  padding: 12px 0;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
}

/* 复制按钮悬停样式 */
.action-buttons .el-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(240, 118, 139, 0.2);
}

/* 已复制状态样式 */
.action-buttons .el-button.is-copied {
  background-color: #67c23a;
  border-color: #67c23a;
}

/* 原文内容区域样式 */
.original-text {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

/* 原文标题样式 */
.original-text h4 {
  color: #333;
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: 500;
}

/* 原文文本样式 */
.original-text p {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-wrap;
}
</style> 