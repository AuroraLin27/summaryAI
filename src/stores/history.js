import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义store
export const useHistoryStore = defineStore('history', () => {
  // 定义状态
  const historyList = ref([])  // 历史记录列表
  // 定义方法
  // 1.添加历史记录
  const addHistory = (input, output) => {
    const newRecord = {
      id: Date.now().toString(),  // 时间戳作为ID
      input,                      // 用户输入文本
      output,                     // 生成的摘要
      timestamp: new Date().toLocaleString()  // 记录创建时间
    }
    historyList.value.unshift(newRecord)  // 新记录添加到列表开头
  }

  // 2.删除历史记录
  const deleteHistory = (id) => {
    const index = historyList.value.findIndex(item => item.id === id)
    if (index !== -1) {
      historyList.value.splice(index, 1)
    }
  }

  // 3.清空历史记录
  const clearHistory = () => {
    historyList.value = []
  }

  // 返回状态和方法
  return {
    historyList,
    addHistory,
    deleteHistory,
    clearHistory
  }
}, {
  // 持久化配置
  persist: {
    key: 'summary-history'  // 保存到localStorage
  }
})
