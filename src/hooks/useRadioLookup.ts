import { useEffect, useMemo, useState } from "react"
import Fuse from "fuse.js"
import { getCountries, getTags } from "@/services/radioLookupService"
import type { LookupItem } from "@/services/radioLookupService"
import type { Mode } from "@/types/radio.types"

export function useRadioLookup(mode: Mode, query: string) {
  const [items, setItems] = useState<LookupItem[]>([])
  const [loading, setLoading] = useState(false)

  //*====== Fetch initial data ======
  useEffect(() => {
    setItems([])
    setLoading(true)

    const fetchData = async () => {
      try {
        let data: LookupItem[] = []

        switch (mode) {
          case "country":
            data = await getCountries()
            break
          case "tag":
            data = await getTags(100)
            break
          //* Future-proof: add more cases here
          default:
            data = []
            break
        }

        setItems(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [mode])

  //*====== Debounced API fetch for tag search filter ======
  useEffect(() => {
    if (mode !== "tag") return
    setLoading(true)
    const handler = setTimeout(() => {
      getTags(100, query)
        .then(setItems)
        .catch(console.error)
        .finally(() => setLoading(false))
    }, 400)
    return () => clearTimeout(handler)
  }, [mode, query])

  //*====== Fuse for fuzzy search ======
  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: ["name"],
        threshold: 0.3,
      }),
    [items]
  )

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items

    const results = fuse.search(query).map(r => r.item)

    const exactMatches = results
      .filter(item => item.name.toLowerCase() === query.toLowerCase())
      .sort((a, b) => b.stationcount - a.stationcount)

    const fuzzyMatches = results
      .filter(item => item.name.toLowerCase() !== query.toLowerCase())
      .sort((a, b) => b.stationcount - a.stationcount)

    const combined = [...exactMatches, ...fuzzyMatches]

    return mode === "tag" ? (loading ? combined : items) : combined
  }, [query, fuse, items, mode, loading])

  return { items: filteredItems, loading }
}