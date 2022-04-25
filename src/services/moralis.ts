import { toast } from '@/components/elements/toast'
import { MORALIS_SERVER_URL } from '@/config'
import Axios from 'axios'

export const moralisRestAPI = Axios.create({
  baseURL: MORALIS_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': process.env.NEXT_PUBLIC_MORALIS_API_KEY as string,
  },
})
moralisRestAPI.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    const message = error.response?.data?.message || error.message
    toast({
      title: message,
      status: 'error',
      position: 'top',
    })
    return Promise.reject(error)
  },
)
