import { useState, useEffect } from 'react'
import axios, { AxiosRequestConfig } from 'axios'

const { VITE_API_BASE_URL } = import.meta.env
axios.defaults.baseURL = VITE_API_BASE_URL

/**
 * Fetch data from an API using Axios while handling the error, and loading states.
 */
export default function useAxios<T>(axiosParams: AxiosRequestConfig) {
  const [data, setData] = useState<T>()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async (params: AxiosRequestConfig) => {
    try {
      const response = await axios.request(params)

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
