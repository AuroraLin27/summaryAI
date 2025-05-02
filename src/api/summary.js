import axios from 'axios'

const API_KEY = 'dnipWjfR1yMEVHZJCnu3ypbn'
const SECRET_KEY = 'Obr1LB7CwgmD4iOc0YTjVQQbkIOjkXuL'
const API_URL = '/api/baidu/rpc/2.0/nlp/v1/news_summary'

// 获取访问令牌
const getAccessToken = async () => {
  try {
    const response = await axios.get(
      '/api/baidu/oauth/2.0/token?grant_type=client_credentials&client_id=' + API_KEY + '&client_secret=' + SECRET_KEY
    )
    return response.data.access_token
  } catch (error) {
    console.error('获取访问令牌失败:', error)
    throw error
  }
}

// 生成文本摘要
export const generateSummary = async (content, maxLength) => {
  try {
    const accessToken = await getAccessToken()
    const response = await axios.post(
      API_URL + '?access_token=' + accessToken + '&charset=UTF-8',
      {
        content,
        max_summary_len: maxLength
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    return response.data.summary
  } catch (error) {
    console.error('生成摘要失败:', error)
    throw error
  }
}
