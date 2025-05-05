<script setup>
// 步骤1: 导入必要的依赖
import { ref } from 'vue'

// 步骤2: 定义组件状态
const inputText = ref('')  // 存储用户输入的文本
const maxLength = ref(200) // 存储用户选择的摘要长度
const emit = defineEmits(['submit']) // 定义组件事件

// 步骤3: 处理提交事件
const handleSubmit = () => {
  // 检查输入文本是否为空
  if (inputText.value.trim()) {
    // 触发submit事件，传递文本内容和最大长度
    emit('submit', {
      text: inputText.value,
      maxLength: maxLength.value
    })
  }
}
</script>

<template>
  <!-- 步骤4: 构建输入界面 -->
  <div class="text-input-container">
    <!-- 文本输入区域 -->
    <el-input
      v-model="inputText"
      type="textarea"
      :rows="8"
      placeholder="请输入需要总结的文本内容..."
      resize="none"
      class="text-area"
    />
    <!-- 底部控制区域 -->
    <div class="input-footer">
      <!-- 摘要长度设置 -->
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
      <!-- 提交按钮 -->
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
/* 步骤5: 样式定义 */
/* 容器样式 */
.text-input-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(240, 118, 139, 0.15);
}

/* 文本区域样式 */
.text-area {
  margin-bottom: 20px;
  width: 100%;
}

/* 文本输入框内部样式 */
.text-area :deep(.el-textarea__inner) {
  font-size: 16px;
  line-height: 1.6;
  padding: 15px;
  border-radius: 8px;
  border: 2px solid #f0768b;
  box-shadow: 0 2px 12px rgba(240, 118, 139, 0.1);
}

/* 文本输入框焦点样式 */
.text-area :deep(.el-textarea__inner:focus) {
  border-color: #f0768b;
  box-shadow: 0 0 0 2px rgba(240, 118, 139, 0.2);
}

/* 底部控制区域样式 */
.input-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

/* 长度输入区域样式 */
.length-input {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 标签样式 */
.label {
  color: #666;
  font-size: 14px;
}

/* 数字输入框样式 */
.length-number {
  width: 120px;
}

/* 数字输入框按钮样式 */
.length-number :deep(.el-input-number__decrease),
.length-number :deep(.el-input-number__increase) {
  background-color: #f0768b;
  border-color: #f0768b;
  color: white;
}

/* 数字输入框边框样式 */
.length-number :deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #f0768b;
}

/* 单位样式 */
.unit {
  color: #666;
  font-size: 14px;
}

/* 提交按钮样式 */
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

/* 提交按钮悬停样式 */
.submit-button:hover:not(:disabled) {
  background-color: #e85d74;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(240, 118, 139, 0.3);
}

/* 提交按钮禁用样式 */
.submit-button:disabled {
  background-color: #f5a3b0;
  cursor: not-allowed;
}
</style>
