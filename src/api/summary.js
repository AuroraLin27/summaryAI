import axios from 'axios'

// 配置API密钥和URL
// const API_KEY = 'dnipWjfR1yMEVHZJCnu3ypbn'
// const SECRET_KEY = 'Obr1LB7CwgmD4iOc0YTjVQQbkIOjkXuL'
// 改成了读取环境变量
const API_KEY = import.meta.env.VITE_API_KEY
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY
const API_URL = '/api/baidu/rpc/2.0/nlp/v1/news_summary'

// 1.获取访问令牌
const getAccessToken = async () => {
  try {
    // 调用API获取访问令牌
    const response = await axios.get(
      '/api/baidu/oauth/2.0/token?grant_type=client_credentials&client_id=' + API_KEY + '&client_secret=' + SECRET_KEY
    )
    return response.data.access_token
  } catch (error) {
    console.error('获取访问令牌失败:', error)
    throw error
  }
}

// 2.生成文本摘要
export const generateSummary = async (content, maxLength) => {
  try {
    // （1）获取访问令牌
    const accessToken = await getAccessToken()

    // （2）调用生成摘要的API
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

    // （3）返回生成的摘要
    return response.data.summary
  } catch (error) {
    console.error('生成摘要失败:', error)
    throw error
  }
}
