import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHistoryStore = defineStore('history', () => {
  const historyList = ref([])

  // 添加历史记录
  const addHistory = (input, output) => {
    const newRecord = {
      id: Date.now().toString(), // 使用时间戳作为唯一ID
      input,
      output,
      timestamp: new Date().toLocaleString()
    }
    historyList.value.unshift(newRecord) // 新记录添加到开头
  }

  // 删除历史记录
  const deleteHistory = (id) => {
    const index = historyList.value.findIndex(item => item.id === id)
    if (index !== -1) {
      historyList.value.splice(index, 1)
    }
  }

  // 清空所有历史记录
  const clearHistory = () => {
    historyList.value = []
  }

  return {
    historyList,
    addHistory,
    deleteHistory,
    clearHistory
  }
}, {
  persist: {
    key: 'summary-history'
  }
})
