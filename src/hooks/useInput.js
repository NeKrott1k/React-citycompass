import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import ky from "ky"

export default function useInput(defaultValue = "") {
  const [value, setValue] = useState(defaultValue)

  const queryInfo = useQuery({
    queryKey: ["widget", value],
    queryFn: async () => {
      const response = await ky.get(
        "https://67319f907aaf2a9aff113edb.mockapi.io/attraction",
        {
          searchParams: { search: value },
        },
      )
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      return response.json()
    },
    enabled: Boolean(value),
  })

  return { value, setValue, queryInfo }
}
