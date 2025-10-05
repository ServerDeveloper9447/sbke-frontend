import type { SearchResult } from "@/lib/mock-data"
import { SearchCard } from "./search-card"

export function ResultsList({ results }: { results: SearchResult[] }) {
  if (!results?.length) {
    return <div className="text-sm text-muted-foreground">{"No results yet. Try a search or select a tag."}</div>
  }

  return (
    <div className="grid gap-4">
      {results.map((item) => (
        <SearchCard key={item.id} item={item} />
      ))}
    </div>
  )
}
