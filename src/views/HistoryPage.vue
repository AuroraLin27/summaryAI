<script setup>
// 导入
import { useHistoryStore } from '../stores/history'
import { storeToRefs } from 'pinia'
import { ElMessage, ElMessageBox, ElBacktop } from 'element-plus'
import { ref, computed } from 'vue'

// 参数对象
// 声明实例
const historyStore = useHistoryStore()
// 解构赋值
const { historyList } = storeToRefs(historyStore)
// 关键词
const searchKeyword = ref('')

// 方法
// 1.自动追踪 查找关键词
const filteredHistoryList = computed(() => {
  // 如果没有搜索关键词，返回所有记录
  if (!searchKeyword.value.trim()) {
    return historyList.value
  }

  // 将搜索关键词转换为小写，用于不区分大小写的搜索
  const keyword = searchKeyword.value.toLowerCase().trim()

  // 过滤
  return historyList.value.filter(record => {
    // 检查输入内容和摘要结果是否包含关键词
    return record.input.toLowerCase().includes(keyword) ||
           record.output.toLowerCase().includes(keyword)
  })
})

// 2.复制功能
const handleCopy = async (record) => {
  try {
    // 写入剪贴板
    await navigator.clipboard.writeText(record.output)
    ElMessage.success('复制成功！')
  } catch (err) {
    console.error(err.message)
    ElMessage.error('复制失败，请手动复制')
  }
}

// 3.删除功能
const handleDelete = (id) => {
  ElMessageBox.confirm(
    '确定要删除这条历史记录吗？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    historyStore.deleteHistory(id)
    ElMessage.success('删除成功')
  }).catch(() => {})
}

// 4.清空历史记录
const handleClearHistory = () => {
  ElMessageBox.confirm(
    '确定要清空所有历史记录吗？',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    historyStore.clearHistory()
    ElMessage.success('历史记录已清空')
  }).catch(() => {})
}
</script>

<template>
  <div class="history-page">
    <div class="page-content">
      <div class="header">
        <h2>历史记录</h2>
        <div class="header-actions">
          <!-- 搜索框 -->
          <el-input
            v-model="searchKeyword"
            placeholder="搜索历史记录..."
            class="search-input"
            clearable
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          <!-- 清空按钮 -->
          <el-button
            type="danger"
            plain
            @click="handleClearHistory"
            :disabled="!historyList.length"
          >
            清空历史
          </el-button>
        </div>
      </div>

      <!-- 1.空状态 -->
      <div v-if="historyList.length === 0" class="empty-state">
        <el-empty description="暂无历史记录" />
      </div>

      <!-- 2.无搜索结果 -->
      <div v-else-if="filteredHistoryList.length === 0" class="empty-state">
        <el-empty description="未找到匹配的历史记录" />
      </div>

      <!-- 3.历史记录 -->
      <div v-else class="history-list">
        <el-card
          v-for="record in filteredHistoryList"
          :key="record.id"
          class="history-card"
          shadow="hover"
        >
          <template #header>
            <div class="card-header">
              <span class="timestamp">{{ record.timestamp }}</span>
              <div class="actions">
                <el-button
                  type="primary"
                  link
                  @click="handleCopy(record)"
                >
                  复制内容
                </el-button>
                <el-button
                  type="danger"
                  link
                  @click="handleDelete(record.id)"
                >
                  删除
                </el-button>
              </div>
            </div>
          </template>

          <div class="card-content">
            <div class="content-section">
              <h3>输入内容</h3>
              <p class="content-text">{{ record.input }}</p>
            </div>
            <el-divider />
            <div class="content-section">
              <h3>摘要结果</h3>
              <p class="content-text">{{ record.output }}</p>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
  <!-- 返回顶部按钮 -->
  <el-backtop target="body" :visibility-height="50" :right="70" :bottom="70" />
</template>

<style scoped>
.history-page {
  min-height: calc(100vh - 80px);
  background: linear-gradient(#ffe4e8 0%, #f0768b 100%);
  padding: 100px 20px 40px;
  margin-top: 60px;
}

.page-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header h2 {
  color: #ffffff;
  font-size: 24px;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-actions {
  display: flex;
  gap: 15px;
  align-items: center;
}

.search-input {
  width: 300px;
}

.empty-state {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 40px;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.history-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.timestamp {
  color: #666;
  font-size: 14px;
}

.actions {
  display: flex;
  gap: 10px;
}

.card-content {
  padding: 10px 0;
}

.content-section {
  margin-bottom: 15px;
}

.content-section h3 {
  color: #f0768b;
  font-size: 16px;
  margin: 0 0 10px 0;
}

.content-text {
  color: #333;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-all;
}

:deep(.el-card__header) {
  padding: 12px 20px;
  border-bottom: 1px solid #f5a3b0;
}

:deep(.el-divider) {
  margin: 15px 0;
  border-color: #f5a3b0;
}

:deep(.el-icon){
  --color: #f5a3b0
}
</style>
