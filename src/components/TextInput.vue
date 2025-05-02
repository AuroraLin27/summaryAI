<script setup>
import { ref } from 'vue'

const inputText = ref('')
const maxLength = ref(200)
const emit = defineEmits(['submit'])

const handleSubmit = () => {
  if (inputText.value.trim()) {
    emit('submit', {
      text: inputText.value,
      maxLength: maxLength.value
    })
  }
}
</script>

<template>
  <div class="text-input-container">
    <el-input
      v-model="inputText"
      type="textarea"
      :rows="8"
      placeholder="请输入需要总结的文本内容..."
      resize="none"
      class="text-area"
    />
    <div class="input-footer">
      <div class="length-input">
        <span class="label">摘要长度：</span>
        <el-input-number
          v-model="maxLength"
          :min="50"
          :max="500"
          :step="50"
          size="large"
          class="length-number"
        />
        <span class="unit">字</span>
      </div>
      <el-button
        type="primary"
        class="submit-button"
        :disabled="!inputText.trim()"
        @click="handleSubmit"
      >
        开始总结
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.text-input-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(240, 118, 139, 0.15);
}

.text-area {
  margin-bottom: 20px;
  width: 100%;
}

.text-area :deep(.el-textarea__inner) {
  font-size: 16px;
  line-height: 1.6;
  padding: 15px;
  border-radius: 8px;
  border: 2px solid #f0768b;
  box-shadow: 0 2px 12px rgba(240, 118, 139, 0.1);
}

.text-area :deep(.el-textarea__inner:focus) {
  border-color: #f0768b;
  box-shadow: 0 0 0 2px rgba(240, 118, 139, 0.2);
}

.input-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.length-input {
  display: flex;
  align-items: center;
  gap: 10px;
}

.label {
  color: #666;
  font-size: 14px;
}

.length-number {
  width: 120px;
}

.length-number :deep(.el-input-number__decrease),
.length-number :deep(.el-input-number__increase) {
  background-color: #f0768b;
  border-color: #f0768b;
  color: white;
}

.length-number :deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #f0768b;
}

.unit {
  color: #666;
  font-size: 14px;
}

.submit-button {
  flex: 1;
  padding: 24px 0;
  font-size: 16px;
  font-weight: bold;
  background-color: #f0768b;
  border: none;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.submit-button:hover:not(:disabled) {
  background-color: #e85d74;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(240, 118, 139, 0.3);
}

.submit-button:disabled {
  background-color: #f5a3b0;
  cursor: not-allowed;
}
</style>`
