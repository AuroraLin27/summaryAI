<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import TextInput from '../components/TextInput.vue'
import ResultCard from '../components/ResultCard.vue'
import { generateSummary } from '../api/summary'
import { useHistoryStore } from '../stores/history'

const summaryResult = ref('')
const showResult = ref(false)
const error = ref('')
const loading = ref(false)
const historyStore = useHistoryStore()

const handleSubmit = async (data) => {
  try {
    error.value = ''
    showResult.value = false
    summaryResult.value = ''

    if(data.text.length > 3000) {
      error.value = '输入文本超过3000字限制'
      ElMessage.error(error.value)
      return
    }

    loading.value = true
    ElMessage.info('正在生成摘要，请稍后...')

    const result = await generateSummary(data.text, data.maxLength)
    summaryResult.value = result || ''
    showResult.value = true
    historyStore.addHistory(data.text, result)
    ElMessage.success('摘要生成成功！')
  } catch (err) {
    error.value = '生成摘要失败，请稍后重试'
    ElMessage.error('生成摘要失败，请稍后重试')
    console.error('生成摘要失败:', err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="summary-page">
    <div class="page-content">
      <TextInput @submit="handleSubmit" />
      <div class="result-container" v-loading="loading" element-loading-text="AI摘要中，请稍候片刻..." element-loading-background="rgba(255, 255, 255, 0.9)">
        <ResultCard
          :result="summaryResult"
          :show="showResult"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.summary-page {
  min-height: calc(100vh - 60px);
  background: linear-gradient(#ffe4e8 0%, #f0768b 100%);
  padding: 100px 40px 20px;
}

.page-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 20px;
}

.result-container {
  width: 100%;
  max-width: 800px;
  min-height: 200px;
  position: relative;
}

:deep(.el-alert) {
  width: 100%;
  max-width: 800px;
}

:deep(.el-loading-mask) {
  border-radius: 12px;
}

:deep(.el-loading-spinner .el-loading-text) {
  color: #f0768b;
  font-size: 16px;
  margin-top: 10px;
}
</style>
