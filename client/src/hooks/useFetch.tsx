"use client"
import api from "@/lib/api"
import { useState, useEffect } from "react"

export function useGet<T>(endpoint: string) {
  const [data, setData] = useState<T|null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); 
      try {
        // Replace with actual API call
        const response = await api.get(endpoint)

        setData(response.data)
      } catch (err) {
        console.error(err)
        setError("Failed to fetch data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [endpoint])

  return { data, loading, error }
}


