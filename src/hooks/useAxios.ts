import { AxiosRequestConfig } from 'axios'
import { useEffect, useState } from 'react'
import api from '../lib/api'

/**
 * Fetch data from an API using Axios while handling the error, and loading states.
 */
export default function useAxios<T>(axiosParams: AxiosRequestConfig) {
  const [data, setData] = useState<T>()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async (params: AxiosRequestConfig) => {
    try {
      const response = await api.request(params)

      setData(response.data as T)
    } catch (error) {
      setError(error as string)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData(axiosParams)
  }, []) // execute once only

  return { data, error, isLoading }
}
